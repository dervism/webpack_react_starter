const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const common = {
    entry: {
        vendors: ['react']
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.(png|gif|jpg|svg)$/,
                loaders: ['url-loader?limit=25000&name=resources/images/[name].[hash:10].[ext]']
            },
            {
                test: /\.(woff|woof2|ttf|otf|eot)$/,
                loaders: ['file-loader?name=resources/fonts/[name].[hash:10].[ext]']
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("css-loader")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules', 'sass-loader')
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new ExtractTextPlugin("styles.[contenthash].css"),
        new HtmlWebpackPlugin({
            title: 'My App',
            inject: 'body',
            template: "./app/pages/index.html"
        }),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require("./package.json").version),
        }),
        new webpack.NoErrorsPlugin(),
    ],
    resolve: {
        extensions: ['','.js','.jsx'],
        alias: {
            appconfig: path.join(__dirname, 'configuration', process.env.CONFIG || 'default')
        }
    }
};

if(TARGET === 'dev' || TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        entry: {
            app: [
                'react-hot-loader/patch',
                'webpack-dev-server/client?http://0.0.0.0:3000',
                'webpack/hot/only-dev-server',
                "./app"
            ]
        },
        devtool: 'inline-source-map',
        devServer: {
            historyApiFallback: true,
            inline: true,
            progress: true,
            port: 3000,
            contentBase: BUILD_PATH,
            publicPath: '/'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new OpenBrowserPlugin({ url: 'http://localhost:3000' })
        ]
    });
}

if(TARGET === 'build' || TARGET === 'stats' || TARGET === 'deploy') {
    module.exports = merge(common, {
        entry: {
            app: [
                "./app"
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    });
}
