/* eslint-env node */
/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");

module.exports = function (env, argv) {
    const mode = argv.mode;
    const plugins = [
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
        new CleanWebpackPlugin(),
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /a\.js|node_modules/,
            // include specific files based on a RegExp
            include: /source/,
            // add errors to webpack instead of warnings
            failOnError: true,
            // allow import cycles that include an asynchronous import,
            // e.g. via import(/* webpackMode: "weak" */ './file.js')
            allowAsyncCycles: false,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
        }),
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

        plugins,
    };
};
