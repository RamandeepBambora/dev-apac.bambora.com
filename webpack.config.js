const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const swaggerliciousLoader = require.resolve("./src/common/swaggerliciousLoader");

const isProduction = process.argv.indexOf("-p") !== -1;

module.exports = {

    entry: {
        app         : "./src/index.tsx"
    },

    output: {
        path        : __dirname + "/dist",
        filename    : "[name].[chunkhash].js",
        publicPath  : "/"
    },

    externals: {},

    resolve: {
        extensions  : [
            ".webpack.js",
            ".web.js",
            ".ts",
            ".js",
            ".tsx",
            ".jsx"
        ]
    },

    performance: {
        hints       : isProduction ? "warning" : false
    },

    devServer: {
        port        : 3030,
        historyApiFallback: {
            rewrites: [
                { from: /./, to: "/"}
            ]    
        },
    },

    module: {
        loaders: [
            {
                test    : /\.(html|svg)$/,
                loader  : "html-loader"
            },
            { 
                test    : /\.(ts|tsx)$/,
                exclude : /node_modules/,
                loader  : isProduction ?
                    ["strip-loader?strip[]=console.log", "ts-loader"] : ["ts-loader"],
            },
            {
                test    : /\.scss$/,
                loader  : ExtractTextPlugin.extract({
                    fallbackLoader: {
                        loader  : "style-loader",
                        query   : {
                            modules         : true,
                            importLoaders   : 2,
                            localIdentName  : "[name]__[local]___[hash:base64:5]"
                        }
                    },
                    loader: [
                        {
                            loader: "css-loader",
                            query: {
                                sourceMap       : true,
                                modules         : true,
                                importLoaders   : 2,
                                localIdentName  : "[name]__[local]___[hash:base64:5]"
                            }
                        },
                        { loader: "resolve-url-loader", query: { sourceMap: true } },
                        { loader: "sass-loader", query: { sourceMap: true }}
                    ]
                })
            },
            {
                test    : /\.css$/,
                loader  : ExtractTextPlugin.extract({
                    fallbackLoader  : "style-loader",
                    loader          : "css-loader"
                })
            },
            {
                test    : /\.(png|jpg)$/,
                loader  : isProduction ? "file-loader" : "url-loader"
            },
            {
                test    : /\.json$/,
                loader  : ["file-loader?name=api/[name]__[hash:base64:5].[ext]", swaggerliciousLoader]
            },
            {
                test    : /\.md$/,
                loader  : ["file-loader?name=guides/[name]__[hash:base64:5].html", "markdown-it-loader"]
            },
            isProduction ? {
                test    : /\.(woff|woff2|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader  : "file-loader?name=assets/fonts/[name].[ext]"
            } : {},
            !isProduction ? { test: /\.woff$/   , loader: "url-loader?limit=65000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]"            } : {},
            !isProduction ? { test: /\.woff2$/  , loader: "url-loader?limit=65000&mimetype=application/font-woff2&name=assets/fonts/[name].[ext]"           } : {},
            !isProduction ? { test: /\.[ot]tf$/ , loader: "url-loader?limit=65000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]"         } : {},
            !isProduction ? { test: /\.eot$/    , loader: "url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=assets/fonts/[name].[ext]"    } : {}
        ]

    },

    plugins: [
        new ExtractTextPlugin({
            filename    : "[name].[contenthash].css",
            disable     : !isProduction,
            allChunks   : true
        }),

        new webpack.SourceMapDevToolPlugin({
            filename    : null, // if no value is provided the sourcemap is inlined
            test        : /\.(ts|js|tsx|jsx)($|\?)/i // process .js(x) and .ts(x) files only
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name        : "vendor",
            filename    : "vendor.[hash].js",
            minChunks   : function (module) {
                return isExternal(module);
            }
        }),

        new HtmlWebpackPlugin({
            title           : "Bambora Documentation",
            filename        : "index.html",
            chunksSortMode  : "dependency",
            favicon         : "./src/vendor/favicon.ico",
            minify          : !isProduction ? false : {
                collapseWhitespace          : true,
                conservativeCollapse        : true,
                collapseInlineTagWhitespace : true
            }
        }),

        new webpack.NamedModulesPlugin(),

        new webpack.DefinePlugin({
            "process.env.NODE_ENV": isProduction ? "'production'" : "'development'"
        }),
        
        new webpack.LoaderOptionsPlugin({
            test: /\.md$/,
            options: {
                "markdown-it": {
                    html: true
                }
            }
        })
    ]
}

function isExternal(module) {
    const userRequest = module.userRequest;

    if (typeof userRequest !== "string") {
        return false;
    }

    return userRequest.indexOf("bower_components") >= 0 ||
           userRequest.indexOf("node_modules") >= 0 ||
           userRequest.indexOf("libraries") >= 0;
}