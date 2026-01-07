module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    env: { node: true, jest: true },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    ignorePatterns: ['dist', 'node_modules'],
    rules: {
      // смягчите/ужесточите по вкусу
    }
  };
  