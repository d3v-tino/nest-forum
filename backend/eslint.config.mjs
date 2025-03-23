import globals from "globals";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {rules: {
    ...tseslint.configs.recommended[0].rules,
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    eqeqeq: ['error', 'always'],
  }},
  {languageOptions: { globals: globals.browser }},
  ...tseslint.configs.recommended,
];