const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const webpackCommon = require('./../../../.webpack/webpack.commonjs.js');
const pkg = require('./../package.json');

var vtkRules = require('../../../node_modules/vtk.js/Utilities/config/dependency.js').webpack.core.rules;
var cssRules = require('../../../node_modules/vtk.js/Utilities/config/dependency.js').webpack.css.rules;

const ROOT_DIR = path.join(__dirname, './..');
const SRC_DIR = path.join(__dirname, '../src');
const DIST_DIR = path.join(__dirname, '../dist');

module.exports = (env, argv) => {
  const commonConfig = webpackCommon(env, argv, { SRC_DIR, DIST_DIR });

  return merge(commonConfig, {
    devtool: 'source-map',
    stats: {
      colors: true,
      hash: true,
      timings: true,
      assets: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      children: false,
      warnings: true,
    },
    optimization: {
      minimize: true,
      sideEffects: true,
    },
    output: {
      path: ROOT_DIR,
      library: 'OHIFExtCornerstone',
      libraryTarget: 'umd',
      libraryExport: 'default',
      filename: pkg.main,
    },
  module: {
    rules: [
        { test: /\.html$/, loader: 'html-loader' },
    ].concat(vtkRules, cssRules),
  },
  resolve: {
    modules: ['node_modules'],
  },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  });
};