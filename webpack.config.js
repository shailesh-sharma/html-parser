/*globals require, __dirname*/
const path = require('path');
const appDir = path.resolve(__dirname);
const distDir = path.resolve(__dirname, 'dist/');

module.exports = {
    context: appDir,
    mode: "development",
    entry: {
        editor: './index.js',
       
    },
    output: {
        path: distDir,
        filename: '[name].js',
        libraryTarget: "umd"
    },
    resolve: {
        modules: [
            'node_modules'
        ],
        alias: {
            stylesheets: path.resolve(__dirname, 'www/latest/stylesheets/')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env', '@babel/preset-react'
                            ],
                            plugins: [
                                '@babel/plugin-transform-react-jsx',
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-proposal-object-rest-spread',
                                '@babel/plugin-syntax-dynamic-import'
                            ]
                        }
                    }
                ]
            }
        ]
    }
}