// @ts-check
import pluginJs from '@eslint/js';
import * as tsParser from '@typescript-eslint/parser';

import solid from 'eslint-plugin-solid/configs/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    ...solid,
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        // @ts-ignore
        projectService: 'app.tsconfig.json',
      },
      globals: globals.browser,
    },
  },
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
);
