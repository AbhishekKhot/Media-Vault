export default {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["prettier", "eslint:recommended"],
  plugins: ["prettier"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    semi: ["error", "always"],
    "prettier/prettier": "error",
  },
};
