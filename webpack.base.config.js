'use strict';
const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const libraryName = 'bbcode-to-react';

module.exports = function (env) {
  let outputFile;
  const plugins = [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
  ];

  if (env === 'production') {
    outputFile = libraryName.toLowerCase() + '.min.js';
  } else {
    outputFile = libraryName.toLowerCase() + '.js';
  }

  const config = {
    devtool: 'source-map',
    entry: [__dirname + '/src/index.js'],
    output: {
      path: __dirname + '/dist',
      filename: outputFile,
      library: libraryName,
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    externals: [
      {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react'
        }
      },
      {
        'react-dom': {
          root: 'ReactDOM',
          commonjs2: 'react-dom',
          commonjs: 'react-dom',
          amd: 'react-dom'
        }
      }
    ],
    module: {
      rules: [
        {
          test: /\.(json)$/,
          use: [
            { loader: 'json-loader' },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
      ]
    },
    resolve: {
      alias: {
        'bbcode-to-react': 'src/index'
      },
      extensions: ['.js', '.json'],
      modules: [
        path.join(__dirname, 'src'),
        "node_modules"
      ]
    },
    plugins: plugins
  };

  return config;
};
