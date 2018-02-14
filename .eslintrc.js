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
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'max-len': 0,
    'no-new': 0,
    'no-mixed-operators': 0,
    'no-param-reassign': 0,
  },
  globals: {},
};
