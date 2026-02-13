const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

const libraryName = 'bbcode-to-react';

const env = process.env.NODE_ENV;
const plugins = [new CleanWebpackPlugin()];

const outputFile = env === 'production'
  ? libraryName.toLowerCase() + '.min.js'
  : libraryName.toLowerCase() + '.js';

module.exports = {
  devtool: 'source-map',
  entry: [path.join(__dirname, '/src/index.js')],
  output: {
    path: path.join(__dirname, '/dist'),
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
      'node_modules'
    ]
  },
  plugins: plugins
};
