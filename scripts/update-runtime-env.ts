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

// SECURITY: env-config.js is served publicly at /env-config.js, so everything
// written here is world-readable. Mirror Vite's `envPrefix: 'VITE_'` behaviour
// and emit ONLY client-safe keys (VITE_-prefixed, plus NODE_ENV). This keeps
// secrets that may exist in the environment (e.g. BROWSER_TESTS_JWT_SIGN_SECRET)
// out of the browser bundle even if they leak into the build/runtime env.
const ALLOWED_KEYS = ['NODE_ENV'];
const ALLOWED_PREFIXES = ['VITE_'];
const publicEnv = Object.fromEntries(
  Object.entries(env).filter(
    ([key]) =>
      ALLOWED_KEYS.includes(key) ||
      ALLOWED_PREFIXES.some((prefix) => key.startsWith(prefix))
  )
);

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
      'globalThis.window._env_ = ' + util.inspect(publicEnv, false, 2, false),
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
