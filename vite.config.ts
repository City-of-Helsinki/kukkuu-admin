import path from 'path';

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from '@nabla/vite-plugin-eslint';

/**
 * Rolldown (Vite 8 dep pre-bundler) has a bug: when @mui/material and any
 * @mui/material/* subpath are both dep-optimization entries, Rolldown creates
 * shared chunks that CALL init_*() functions without defining or importing
 * them — causing ReferenceErrors in the browser.
 *
 * This plugin fixes that in two passes over the generateBundle output:
 *   Pass 1 — catalogue every init_* definition and export across all chunks
 *   Pass 2 — for each chunk with dangling init_* calls:
 *             a) if the function is already exported elsewhere → add import
 *             b) if the function is defined but unexported elsewhere →
 *                add an export to that chunk, then add the import here
 */
const fixRolldownDanglingInits = {
  name: 'fix-rolldown-dangling-inits',
  generateBundle(_opts: unknown, bundle: Record<string, any>) {
    type InitInfo = { file: string; exported: boolean; alias: string };
    // localName → { file, exported, alias }
    const initMap = new Map<string, InitInfo>();

    // ── Pass 1: catalogue ──────────────────────────────────────────────────
    for (const [fileName, chunk] of Object.entries(bundle)) {
      if (chunk.type !== 'chunk') continue;
      const code: string = chunk.code ?? '';

      // Collect all var init_XXX = __esmMin(...) definitions (unexported by default)
      for (const m of code.matchAll(/\bvar (init_\w+)\s*=\s*__esmMin/g)) {
        const name = m[1];
        if (!initMap.has(name)) {
          initMap.set(name, { file: fileName, exported: false, alias: name });
        }
      }

      // Mark exported ones and record their export alias
      for (const exportMatch of code.matchAll(/export\s*\{([^}]+)\}/g)) {
        for (const item of exportMatch[1].split(',').map((s) => s.trim())) {
          const m = item.match(/^(\w+)\s+as\s+(\w+)$/);
          if (m && m[1].startsWith('init_')) {
            const entry = initMap.get(m[1]);
            if (entry) {
              entry.exported = true;
              entry.alias = m[2];
            } else {
              initMap.set(m[1], {
                file: fileName,
                exported: true,
                alias: m[2],
              });
            }
          } else if (/^\w+$/.test(item) && item.startsWith('init_')) {
            const entry = initMap.get(item);
            if (entry) {
              entry.exported = true;
              entry.alias = item;
            } else {
              initMap.set(item, {
                file: fileName,
                exported: true,
                alias: item,
              });
            }
          }
        }
      }
    }

    // ── Pass 2: fix dangling calls ─────────────────────────────────────────
    for (const [, chunk] of Object.entries(bundle)) {
      if (chunk.type !== 'chunk') continue;
      const code: string = chunk.code ?? '';

      const importLines = code
        .split('\n')
        .filter((l: string) => l.trimStart().startsWith('import '));

      const calledInits = new Set(
        [...code.matchAll(/\b(init_\w+)\(\)/g)].map((m) => m[1])
      );

      const toAdd: string[] = [];

      for (const initName of calledInits) {
        const defined =
          code.includes(`var ${initName} =`) ||
          code.includes(`function ${initName}(`);
        const imported = importLines.some((l: string) => l.includes(initName));
        if (defined || imported) continue; // already ok

        const info = initMap.get(initName);
        if (!info) continue;

        // Ensure the function is exported from its source chunk
        if (!info.exported) {
          const srcChunk = bundle[info.file];
          if (srcChunk?.type === 'chunk') {
            srcChunk.code =
              (srcChunk.code as string) + `\nexport { ${initName} };\n`;
            srcChunk.map = null;
            info.exported = true;
            info.alias = initName; // use full name since we control the export
          }
        }

        if (info.exported) {
          const stmt = `import { ${info.alias} as ${initName} } from "./${info.file}";`;
          if (!toAdd.includes(stmt)) toAdd.push(stmt);
        }
      }

      if (toAdd.length > 0) {
        chunk.code = toAdd.join('\n') + '\n' + code;
        chunk.map = null;
      }
    }
  },
};

export default ({ mode }: any) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    envPrefix: 'VITE_',
    plugins: [react(), eslint()],
    server: {
      open: true, // automatically open the app in the browser
      port: parseInt(process.env.PORT ?? '3001'),
    },
    preview: {
      port: parseInt(process.env.PORT ?? '3001'),
    },
    resolve: {
      tsconfigPaths: true,
      alias: {
        // Rolldown (Vite 8) doesn't auto-synthesize CJS default exports;
        // redirect all @mui/icons-material sub-path imports to the ESM build.
        '@mui/icons-material': path.resolve(
          __dirname,
          'node_modules/@mui/icons-material/esm'
        ),
        screens: path.resolve(__dirname, './src/screens'),
      },
    },
    optimizeDeps: {
      include: [
        '@emotion/react',
        '@emotion/styled',
        '@emotion/cache',
        '@mui/material',
      ],
      rolldownOptions: {
        plugins: [fixRolldownDanglingInits],
      },
    },
    build: {
      outDir: 'build',
      sourcemap: true,
    },
  });
};
