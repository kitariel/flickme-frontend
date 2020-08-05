const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ["@babel/polyfill", './src/index.js'],
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                  loader: 'url-loader',
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        proxy: {
            "/api": {
                "target": "http://localhost:7575",
                "secure": false,
                "changeOrigin": true
            }
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './src/assets/images/favicon.png'
        })
    ]
}