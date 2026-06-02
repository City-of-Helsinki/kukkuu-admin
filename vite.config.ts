import path from 'path';

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from '@nabla/vite-plugin-eslint';

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
    build: {
      outDir: 'build',
      sourcemap: true,
    },
  });
};
