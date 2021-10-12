module.exports = {
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  plugins: ['react', 'import'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
  rules: {
    'no-debugger': 2,
    'no-console': [
      2,
      {
        allow: ['info', 'error'],
      },
    ],
    'no-const-assign': 2,
    'prefer-const': 2,
    semi: 2,
    'import/no-unresolved': 2,
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'import/no-mutable-exports': 2,
    'import/no-named-as-default': 2,
    'import/first': 2,
    'import/no-duplicates': 2,
    'import/newline-after-import': 2,
    'import/no-named-default': 2,
    'no-unused-vars': 2,
    'import/no-anonymous-default-export': 2,
    'no-prototype-builtins': 2,
    'import/order': [
      2,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order:
            'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */,
        },
        pathGroupsExcludedImportTypes: ['builtin'],
      },
    ],
  },
};
