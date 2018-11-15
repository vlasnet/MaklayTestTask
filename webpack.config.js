var webpack = require('webpack');
var path = require('path');
var DIST_DIR = path.resolve(__dirname, 'dist');
var SRC_DIR = path.resolve(__dirname, 'src');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: ["babel-polyfill", "./src/index.js"],
    output: {
        path: DIST_DIR,
        filename: "main.js"
    },
    module: {
        rules: [
            //css
            {
                test: /\.css$|\.scss$/, //Используем регулярку (\.css$) чтобы указать какой тип файлов искать
                include: SRC_DIR,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'sass-loader'],
                    fallback: 'style-loader'
                })
            },
            //js
            {
                test: /\.js$/,
                include: SRC_DIR,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['env', { modules: false }]
                        ]
                    }
                }
            },
            //img
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                include: SRC_DIR,
                use: [{
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            limit: 10000
                        }
                    },
                    {
                        loader: 'img-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'maklaiTestTask',
            filename: 'index.html',
            template: 'src/index.html',
            favicon: 'src/favicon.png',
            inject: true
        }),
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('styles.css')
    ],
    devServer: {
        port: 9001,
        stats: 'errors-only',
        clientLogLevel: 'warning',
        compress: true,
        open: true
    }
};