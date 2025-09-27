// @ts-check
// eslint.config.js

import stylistic from "@stylistic/eslint-plugin"
import eslint from "@eslint/js"
import { defineConfig } from "eslint/config"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      "@stylistic": stylistic,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_(.+)",
        },
      ],
      indent: ["error", 2],
      quotes: ["warn", "double"],
      semi: ["warn", "never"],
      "comma-dangle": ["warn", "only-multiline"],
      "comma-spacing": ["error", { before: false, after: true }],
      "eol-last": ["error", "always"],
      "func-call-spacing": ["error", "never"],
      "require-await": "warn",
    },
  },
  {
    files: ["**/*.js", "**/*.ts"],
  },
])
