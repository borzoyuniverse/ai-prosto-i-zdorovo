module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    env: { browser: true, node: true, jest: true },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended'
    ],
    settings: { react: { version: 'detect' } },
    ignorePatterns: ['dist', 'node_modules'],
    rules: {
      'react/react-in-jsx-scope': 'off', // с Vite/TS не нужен
      // добавь правила по вкусу
    }
  };
  