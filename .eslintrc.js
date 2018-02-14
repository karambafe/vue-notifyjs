module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
  },
  extends: 'airbnb-base',
  plugins: [
    'html',
  ],
  rules: {
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    'max-len': ['error', { 'code': 120 }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-new': 0,
    'no-mixed-operators': 0,
    'no-param-reassign': 0,
  },
  globals: {},
};
