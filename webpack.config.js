var webpack = require('webpack')
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var merge = require('webpack-merge');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

var common = {
    context: APP_PATH,
    entry: {
        javascript: "./scripts/app.js"
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ["babel"]
            },
            {
                test: /\.html$/,
                loader: "file?name=[name].[ext]"
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'sass-loader')
            }
        ]
    },
    resolve: {
        extensions: ['','.js','.jsx']
    }
};

if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        devtool: 'eval-source-map',
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            port: 3000
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new OpenBrowserPlugin({ url: 'http://localhost:3000' })
        ]
    });
}

if(TARGET === 'build' || TARGET === 'stats' || TARGET === 'deploy') {
    module.exports = merge(common, {
        entry: {
            vendors: ['react']
        },
        plugins: [
            new webpack.DefinePlugin({
                // This affects react lib size
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            }),
            new ExtractTextPlugin("styles.[contenthash].css"),
            new HtmlWebpackPlugin({
                title: 'My App',
                inject: 'body',
                template: "./app/pages/index.html"
            })
        ]
    });
}