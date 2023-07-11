/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = function (env, argv) {
    const mode = argv.mode;
    const plugins = [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
        new CleanWebpackPlugin(),
    ];

    return {
        entry: "./source/index.tsx",
        output: {
            filename: "bundle.js",
            path: __dirname + "/release",
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: mode === "development" ? "source-map" : false,

        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: [".ts", ".tsx", ".js", ".json"],
        },

        devServer: {
            port: 8000,
        },

        module: {
            rules: [
                { test: /\.tsx?$/, loader: "ts-loader" },
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            ],
        },

        plugins: plugins,
    };
};
