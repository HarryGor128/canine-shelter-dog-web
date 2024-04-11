module.exports = {
    root: true,
    extends: 'next/core-web-vitals',
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
};
