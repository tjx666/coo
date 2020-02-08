const OFF = 0;
const ERROR = 2;

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: ['airbnb', 'airbnb/hooks', 'plugin:@typescript-eslint/recommended', 'prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'react'],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.ts', '.tsx', '.js', '.json'],
            },
            typescript: {
                directory: ['scripts/tsconfig.json', 'src/main/tsconfig.json', 'src/renderer/tsconfig.json'],
            },
        },
    },
    rules: {
        'import/extensions': OFF,

        'react/prop-types': OFF,

        'react/jsx-filename-extension': [ERROR, { extensions: ['.ts', '.tsx', '.json', '.js'] }],
        'react/jsx-first-prop-new-line': OFF,
        'react/jsx-indent-props': [ERROR, 4],
        'react/jsx-indent': [ERROR, 4],
        'react/jsx-max-props-per-line': OFF,
        'react/jsx-one-expression-per-line': OFF,
        'react/jsx-props-no-spreading': OFF,
        'react/jsx-wrap-multilines': OFF,

        '@typescript-eslint/explicit-function-return-type': OFF,
        '@typescript-eslint/no-explicit-any': OFF,
        '@typescript-eslint/no-non-null-assertion': OFF,
        '@typescript-eslint/no-useless-constructor': ERROR,

        'jsx-a11y/click-events-have-key-events': OFF,
        'jsx-a11y/label-has-associated-control': OFF,
        'jsx-a11y/no-static-element-interactions': OFF,

        'func-names': OFF,
        'lines-between-class-members': OFF,
        'no-console': OFF,
        'no-empty': OFF,
        'no-param-reassign': OFF,
        'no-underscore-dangle': OFF,
        'no-unused-expressions': OFF,
        'no-unused-vars': 'warn',
        'no-useless-constructor': OFF,
    },
    overrides: [
        {
            files: ['**/*.d.ts'],
            rules: {
                'max-classes-per-file': OFF,
                'import/no-duplicates': OFF,
            },
        },
        {
            files: ['scripts/**/*.{ts,js}'],
            rules: {
                'import/no-extraneous-dependencies': OFF,
            },
        },
        {
            files: ['scripts/**/*.js'],
            rules: {
                '@typescript-eslint/no-var-requires': OFF,
            },
        },
    ],
};
