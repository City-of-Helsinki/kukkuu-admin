module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vitest-globals/env': true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@vitest/legacy-recommended',
    'plugin:vitest-globals/recommended',
    'plugin:@typescript-eslint/stylistic',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: ['**/generatedTypes/*'],
  plugins: ['import', 'react', 'react-hooks', '@vitest', 'prettier'],
  rules: {
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'func-call-spacing': ['error'],
    '@typescript-eslint/member-ordering': 'warn',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        disallowTypeAnnotations: false,
        fixStyle: 'separate-type-imports',
        prefer: 'type-imports',
      },
    ],
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'react/no-unused-prop-types': ['warn', { skipShapeProps: true }],
    'array-bracket-spacing': ['warn', 'never'],
    'no-prototype-builtins': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          ['internal', 'parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
      },
    ],
    'max-len': ['warn', { code: 120 }],
    'no-console': 'warn',
    'no-plusplus': 'error',
    'no-undef': 'warn',
    'object-curly-spacing': ['warn', 'always'],
    '@vitest/expect-expect': [
      'error',
      {
        assertFunctionNames: [
          'expect',
          'checkErrors', // some tests use only this function to check errors
          't.expect', // browser tests use this form
        ],
      },
    ],
  },
};
