/* eslint-disable no-console */
import * as path from 'path';
import fs from 'fs';
import util from 'util';
import { fileURLToPath } from 'url';

import dotenv from 'dotenv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const USE_TEST_ENV = process.env.NODE_ENV === 'test';
const defaultNodeEnv = USE_TEST_ENV ? 'test' : 'development';

const env = {
  NODE_ENV: process.env.NODE_ENV || defaultNodeEnv,
};

dotenv.config({
  processEnv: env,
  // Loaded in order; later files override earlier ones (matches Vite's
  // .env precedence where *.local overrides the base file).
  ...(USE_TEST_ENV
    ? { path: ['.env', '.env.test', '.env.test.local'] }
    : { path: ['.env', '.env.local'] }),
  override: true,
});

// Prevent collision if app is running while tests are started
const configFile = USE_TEST_ENV ? 'test-env-config.js' : 'env-config.js';

const configurationFile: string = path.join(
  __dirname,
  '../public/' + configFile
);

const start = async () => {
  try {
    fs.writeFile(
      configurationFile,
      'globalThis.window._env_ = ' + util.inspect(env, false, 2, false),
      function (err) {
        if (err) {
          console.error(err instanceof Error ? err.message : String(err));
          process.exit(1);
        }
        console.log('File created!');
      }
    );
  } catch (err) {
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
};

start();
