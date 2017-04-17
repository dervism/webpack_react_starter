const webpack = require('webpack');
const path = require('path');
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
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{
                   loader: 'babel-loader'
                }]
            },
            {
                test: /\.(png|gif|jpg|svg)$/,
                use: [{
                   loader: 'url-loader',
                   options: {
                     limit: '25000',
                     name: 'resources/images/[name].[hash:10].[ext]'
                   }
                }]
            },
            {
                test: /\.(woff|woof2|ttf|otf|eot)$/,
                use: [{
                   loader: 'file-loader',
                   options: {
                     name: 'resources/fonts/[name].[hash:10].[ext]'
                   }
                }]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: "style-loader",
                  use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'}),
        new ExtractTextPlugin("styles.[contenthash].css"),
        new HtmlWebpackPlugin({
            title: 'My App',
            inject: 'body',
            template: "./app/pages/index.html"
        }),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(require("./package.json").version),
        }),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    resolve: {
        extensions: ['.js','.jsx'],
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
            hot: true,
            port: 3000,
            contentBase: BUILD_PATH,
            publicPath: '/'
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
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
