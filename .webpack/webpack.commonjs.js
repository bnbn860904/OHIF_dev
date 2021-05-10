const merge = require('webpack-merge');
const webpackBase = require('./webpack.base.js');
const cssToJavaScriptRule = require('./rules/cssToJavaScript.js');
const stylusToJavaScriptRule = require('./rules/stylusToJavaScript.js');

var vtkRules = require('./rules/dependency.js').webpack.core.rules;
var cssRules = require('./rules/dependency.js').webpack.css.rules;

/**
 * WebPack configuration for CommonJS Bundles. Extends rules of BaseConfig by making
 * sure we're bundling styles and other files that would normally be split in a
 * PWA.
 */
module.exports = (env, argv, { SRC_DIR, DIST_DIR }) => {
  const baseConfig = webpackBase(env, argv, { SRC_DIR, DIST_DIR });

  return merge(baseConfig, {
    module: {
      rules: [cssToJavaScriptRule, stylusToJavaScriptRule],
	  [
        { test: /\.vti$/, loader: 'html-loader' },
    ].concat(vtkRules, cssRules),
    },
  module: {
    rules: [
        { test: /\.vti$/, loader: 'html-loader' },
    ].concat(vtkRules, cssRules),
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath,
    ],
  },
  });
};
