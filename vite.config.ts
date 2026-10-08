import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from '@nabla/vite-plugin-eslint';
import { thirdPartyLicenses } from '@city-of-helsinki/license-notices';

import { thirdPartyLicensesConfig } from './scripts/thirdPartyLicenses.config.ts';

export const devCsp = (): Plugin => ({
  name: 'dev-csp',
  apply: 'serve',
  transformIndexHtml(html) {
    return html
      .replace(/(img-src\s+[^;]+)/, (match) =>
        match.includes('localhost:*')
          ? match
          : `${match} localhost:* 127.0.0.1:*`
      )
      .replace(/(media-src\s+[^;]+)/, (match) =>
        match.includes('localhost:*')
          ? match
          : `${match} localhost:* 127.0.0.1:*`
      );
  },
});

export default ({ mode }: any) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    envPrefix: 'VITE_',
    plugins: [
      react(),
      mode !== 'test' && eslint(),
      devCsp(),
      thirdPartyLicenses(thirdPartyLicensesConfig),
    ],
    server: {
      open: true, // automatically open the app in the browser
      port: parseInt(process.env.PORT ?? '3001'),
    },
    preview: {
      port: parseInt(process.env.PORT ?? '3001'),
    },
    resolve: {
      tsconfigPaths: true,
    },
    build: {
      outDir: 'build',
      sourcemap: true,
    },
  });
};
