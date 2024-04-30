module.exports = {
    root: true,
    extends: ['next/core-web-vitals', 'eslint-config-prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        'react/react-in-jsx-scope': 'off',
        'react-hooks/exhaustive-deps': 'off',
    },
    plugins: ["@trivago/prettier-plugin-sort-imports"]
};
