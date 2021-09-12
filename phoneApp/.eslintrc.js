module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  plugins: ['detox'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: ['airbnb-typescript'],
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    {
      files: ['*.e2e.js'],
      env: {
        'detox/detox': true,
        jest: true,
        'jest/globals': true,
      },
    },
  ],
  parser: '@typescript-eslint/parser',
};
