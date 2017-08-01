
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");

const config = require('../../webpack.config.js')

// TODO: read me from webpack.config.js
// var compiler = webpack({
//     // configuration
//     output: { path: '../../dist' }
// });

const compiler = webpack(config)

module.exports = function () {
  return webpackDevMiddleware(compiler, {
      // options
  });
}



