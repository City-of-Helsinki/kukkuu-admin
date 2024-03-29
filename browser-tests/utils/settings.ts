import * as dotenv from 'dotenv';

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const get = require('lodash/get');

dotenv.config();

function getOrError(variableName: string) {
  const variable = get(process.env, variableName);

  if (!variable) {
    throw new Error(`No ${variableName} specified.`);
  }

  return variable;
}

const getApiBaseUrl = () => {
  const url = process.env['BROWSER_TESTS_API_URL'] ?? '';

  // API url might ppoint to graphql, remvoe
  var re = /\/graphql$/;
  return url.replace(re, '');
};

export const testUsername = (): string => getOrError('BROWSER_TESTS_UID');

export const testUserPassword = (): string => getOrError('BROWSER_TESTS_PWD');

export const testUnauthorizedUsername = (): string =>
  getOrError('BROWSER_TESTS_UNAUTHORIZED_UID');

export const testUnauthorizedUserPassword = (): string =>
  getOrError('BROWSER_TESTS_UNAUTHORIZED_PWD');

export const envUrl = (): string => getOrError('BROWSER_TESTS_ENV_URL');

// optional variable for API to ensure tunnistamo user accesses
export const apiUrl = (): string => getApiBaseUrl();
