const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const dotenv = require('dotenv')
// this will update the process.env with environment variables in .env file
dotenv.config();

const production = process.env.NODE_ENV === 'production';

module.exports = {
    entry: { myAppName: path.resolve(__dirname, "./src/index.js") },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
              test: /\.(js|jsx)$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-react", "@babel/preset-env"],
                }
              },
            },
             // CSS rules
            {
              test: /\.css$/,
              exclude: /node_modules/,
              use: [
                "style-loader",
                {
                  loader: "css-loader",
                  options: {
                    importLoaders: 1,
                    modules: true,
                  },
                },
              ],
              include: /\.module\.css$/,
            },
           
            {
                test: /\.html$/,
                use: ["html-loader"],
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/i,
                use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                    },
                },
                ],
            },
        ],
      },
    
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "Piku",
            favicon: "./public/favicon.png",
            template: "./src/index.html",
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(process.env)
         })
    ],
    devServer: {
        port: 3001,
        hot: true,
        historyApiFallback: true,
        //publicPath: ".src/assets/", // here's the change
        //contentBase: path.join(__dirname, 'public')
    },
    mode: production ? 'production' : 'development'
};