import prettier from 'eslint-plugin-prettier';
import eslintPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/**/*.{js,ts,jsx,tsx}'],
    ignores: ['node_modules/*', 'package.json', 'package-lock.json', 'dist', 'eslint.config.js'],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': eslintPlugin,
      prettier,
      import: importPlugin
    },
    rules: {
      'prettier/prettier': 'error',
      eqeqeq: ['warn', 'always'],
      semi: ['warn', 'always'],
      'no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true
        }
      ],
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'import/order': [
        'error',
        {
          'groups': [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          'alphabetize': { 'order': 'asc', 'caseInsensitive': true }
        }
      ],
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error'
    }
  }
];
