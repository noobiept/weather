const HtmlWebpackPlugin = require("html-webpack-plugin");
// @ts-ignore
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = function(env, argv) {
    const mode = argv.mode;
    const plugins = [
        new HtmlWebpackPlugin({
            template: "./index.html",
            productionMode: mode === "production",
        }),
    ];

    if (mode === "production") {
        plugins.push(new CleanWebpackPlugin());
        plugins.push(
            new CopyWebpackPlugin([
                {
                    from: "./node_modules/react/umd/react.production.min.js",
                    to: "./libraries/react.production.min.js",
                },
                {
                    from:
                        "./node_modules/react-dom/umd/react-dom.production.min.js",
                    to: "./libraries/react-dom.production.min.js",
                },
                {
                    from: "./css/**/*",
                    to: "./",
                },
                {
                    from: "./package.json",
                    to: "./",
                },
            ])
        );
    }

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
                // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
                { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            ],
        },

        plugins: plugins,

        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            react: "React",
            "react-dom": "ReactDOM",
        },
    };
};
