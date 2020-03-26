const OFF = 0;
const ERROR = 2;

module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'airbnb',
        'airbnb/hooks',
        'plugin:import/typescript',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:unicorn/recommended',
        'plugin:promise/recommended',
        'prettier',
        'prettier/react',
        'prettier/@typescript-eslint',
    ],
    plugins: ['@typescript-eslint', 'react', 'unicorn', 'promise'],
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
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.ts', '.tsx', '.js', '.json'],
            },
            typescript: {
                directory: [
                    'scripts/tsconfig.json',
                    'src/main/tsconfig.json',
                    'src/renderer/tsconfig.json',
                ],
            },
        },
    },
    rules: {
        'import/extensions': OFF,

        'jsx-a11y/click-events-have-key-events': OFF,
        'jsx-a11y/label-has-associated-control': OFF,
        'jsx-a11y/no-static-element-interactions': OFF,

        'unicorn/consistent-function-scoping': OFF,
        'unicorn/filename-case': [
            'error',
            {
                cases: {
                    camelCase: true,
                    pascalCase: true,
                },
            },
        ],
        'unicorn/no-abusive-eslint-disable': OFF,
        'unicorn/no-process-exit': OFF,
        'unicorn/prevent-abbreviations': OFF,

        '@typescript-eslint/ban-types': OFF,
        '@typescript-eslint/explicit-function-return-type': OFF,
        '@typescript-eslint/no-explicit-any': OFF,
        '@typescript-eslint/no-non-null-assertion': OFF,
        '@typescript-eslint/no-useless-constructor': ERROR,
        '@typescript-eslint/no-var-requires': OFF,

        'react/jsx-filename-extension': [ERROR, { extensions: ['.ts', '.tsx', '.js', '.json'] }],
        'react/jsx-first-prop-new-line': OFF,
        'react/jsx-indent-props': [ERROR, 4],
        'react/jsx-indent': [ERROR, 4],
        'react/jsx-max-props-per-line': OFF,
        'react/jsx-one-expression-per-line': OFF,
        'react/jsx-props-no-spreading': OFF,
        'react/jsx-wrap-multilines': OFF,
        'react/prop-types': OFF,

        'func-names': OFF,
        'lines-between-class-members': OFF,
        'max-classes-per-file': OFF,
        'no-bitwise': OFF,
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
            files: ['src/renderer/reducers/*', 'src/renderer/store.ts'],
            rules: {
                'import/no-cycle': OFF,
            },
        },
        {
            files: ['**/*.d.ts'],
            rules: {
                'import/no-duplicates': OFF,
                'spaced-comment': OFF,
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
