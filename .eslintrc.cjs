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
        include: ['src/**/*'],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@vitest', 'prettier'],
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
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/consistent-type-definitions': 'off',
    'react/no-unused-prop-types': ['warn', { skipShapeProps: true }],
    'array-bracket-spacing': ['warn', 'never'],
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
