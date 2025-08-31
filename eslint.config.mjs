// eslint.config.mjs
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import nPlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';
import securityPlugin from 'eslint-plugin-security';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'build/**',
      'coverage/**',
      'tmp/**',
      '.out/**',
      '*.min.js',
      '.husky/**',
      '.prettierrc.json',
    ],
  },
  {
    files: ['**/*.{ts,tsx,js,cjs,mjs}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: process.cwd(),
      },
      globals: {
        ...globals.es2022,
        ...globals.node,
      },
    },
    settings: {
      'import/resolver': { typescript: { project: ['./tsconfig.json'] } },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      n: nPlugin,
      promise: promisePlugin,
      security: securityPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: true,
          trailingComma: 'all',
          singleQuote: true,
          printWidth: 120,
          tabWidth: 2,
          bracketSpacing: true,
          arrowParens: 'avoid',
          endOfLine: 'auto',
        },
      ],

      // Import
      'import/newline-after-import': 'warn',
      'import/no-unresolved': 'error',

      // Node
      'n/no-missing-import': 'off',
      'n/no-unsupported-features/es-syntax': 'off',

      // Promise
      'promise/catch-or-return': 'error',
      'promise/always-return': 'off',

      // Security
      'security/detect-object-injection': 'off',

      // TypeScript
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      eqeqeq: ['error', 'smart'],
      curly: ['error', 'all'],
      'no-constant-binary-expression': 'error',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

      'max-len': 'off',
      quotes: 'off',
      semi: 'off',
      'comma-dangle': 'off',
      'arrow-parens': 'off',
      'object-curly-spacing': 'off',
      indent: 'off',
      'space-before-function-paren': 'off',
      'operator-linebreak': 'off',
      'no-mixed-spaces-and-tabs': 'off',
      'no-trailing-spaces': 'off',
    },
  },
  {
    files: ['**/*.config.*', '**/.*rc.*', '**/scripts/**/*.*'],
    languageOptions: { parserOptions: { project: null } },
  },
  {
    files: ['**/*.test.*', '**/*.spec.*'],
    languageOptions: { parserOptions: { project: null } },
    rules: { 'no-console': 'off' },
  },
];
