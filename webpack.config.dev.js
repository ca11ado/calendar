'use strict'

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    hot: true,
    watchOptions: {
      poll: true
    }
  },
  resolve: {
    alias: {
      blocks: path.join(__dirname, 'src/components'),
      utils: path.join(__dirname, 'src/utils'),
      store: path.join(__dirname, 'src/store'),
    }
  },
  entry: [
    './src/app.js'
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css/,
        use: [
          //MiniCssExtractPlugin.loader,
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]'
              },
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
};
