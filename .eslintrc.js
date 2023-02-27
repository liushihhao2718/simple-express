module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true
  },
  extends: ['eslint:recommended', "plugin:security/recommended"],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    complexity: ['error', 7],
    "consistent-return": 2,
    "indent": [1, 2],
    "no-else-return": 1,
    "semi": [1, "always"],
    "space-unary-ops": 2,
    "max-len": ["error", { "comments": 80 }]
  },
};
