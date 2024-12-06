import pluginJs from '@eslint/js';
import * as tsParser from '@typescript-eslint/parser';

import solid from 'eslint-plugin-solid/configs/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    ...solid,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: 'tsconfig.json',
      },
      globals: globals.browser,
    },
  },
  ...tseslint.configs.recommended,
  {
    ignores: ['**/node_modules/**/*', '**/dist/**/*', 'eslint.config.js'],
  },
  {
    rules: {
      quotes: ['error', 'single'],
      semi: 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];
