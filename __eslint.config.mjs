import eslintConfigPrettier from 'eslint-config-prettier';
import js from '@eslint/js';
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";

export default [
//  {
//    ignores: ['*.css', '*.css.map']
//  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"]
  },
  js.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
//  pluginJs.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  {
    settings: {
      react: {
        version: "detect"
      }
    }
  },
]
