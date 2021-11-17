const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env')
})


module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebpackPlugin({
           template: './src/index.html',
           inject: 'body',
           favicon: "./src/favicon.png"
        }),
        new webpack.DefinePlugin({
          "process.env": JSON.stringify(dotenv.parsed)
        })
    ],
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.ts', '.tsx', '.js', '.css']
    },
    module: {
        rules: [
            {
              test: /\.ts(x?)$/,
              exclude: /node_modules/,
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.json'
              }
            },
            {
              enforce: 'pre',
              test: /\.js$/,
              loader: 'source-map-loader'
            },
            {
              test: /\.css$/i,
              use: ['style-loader', 'css-loader'],
            },
            {
              test: /\.(png|svg)$/i,
              type: 'asset/resource'
            }
          ]
    }
}