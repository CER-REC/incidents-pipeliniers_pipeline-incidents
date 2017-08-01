
const WebpackHotMiddleware = require("webpack-hot-middleware");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpack = require("webpack");
const Express = require('express')

const config = require('../../webpack.config.js')

// TODO: read me from webpack.config.js
// var compiler = webpack({
//     // configuration
//     output: { path: '../../dist' }
// });

const compiler = webpack(config)


module.exports = function () {
  const app = Express()
  app.use(webpackDevMiddleware(compiler, {
      // options
  }));

  app.use(WebpackHotMiddleware(compiler))
  
  return app
}



