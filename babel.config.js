/* eslint-env node */
module.exports = {
    presets: [
        ["@babel/preset-env", { targets: { node: "current" } }],
        [
            "@babel/preset-react",
            {
                runtime: "automatic",
            },
        ],
        "@babel/preset-typescript",
    ],
    plugins: ["@babel/plugin-proposal-nullish-coalescing-operator"],
};
