module.exports = {
  env: {
    browser: true,
    es2021: true,
    'vitest-globals/env': true,
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@vitest/legacy-recommended',
    'plugin:vitest-globals/recommended',
    'plugin:@typescript-eslint/stylistic',

    // 'plugin:vitest/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  ignorePatterns: ['**/generatedTypes/*', '**/generated/*'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@vitest', 'prettier'],
  rules: {
    '@typescript-eslint/brace-style': [
      'error',
      '1tbs',
      { allowSingleLine: true },
    ],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/func-call-spacing': ['error'],
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
  },
};
