module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        }
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": ["error", 2],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "semi": ["error", "never"],
        "eqeqeq": ["error", "always"],
        "no-empty-function": ["warn"],
        "no-eval": ["error"],
        "no-with": ["error"],
        "no-shadow": ["warn"],
        "max-len": ["warn", 80],
        "no-var": ["warn"],
        "prefer-const": ["warn"],
        "prefer-template": ["warn"],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
    }
}