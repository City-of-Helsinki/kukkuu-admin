import path from 'path';

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }: any) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    define: {
      'process.env': process.env,
    },
    plugins: [react(), viteTsconfigPaths()],
    server: {
      open: true, // automatically open the app in the browser
      port: parseInt(process.env.PORT ?? '3001'),
    },
    preview: {
      port: parseInt(process.env.PORT ?? '3001'),
    },
    resolve: {
      alias: {
        screens: path.resolve(__dirname, './src/screens'),
      },
    },
    build: {
      outDir: 'build',
    },
    // optimizeDeps: {
    //   force: true,
    //   esbuildOptions: {
    //     loader: {
    //       '.js': 'jsx',
    //     },
    //   },
    // },
  });
};
