
const WebpackHotMiddleware = require('webpack-hot-middleware')
const WebpackDevMiddleware = require('webpack-dev-middleware')
const Webpack = require('webpack')
const Express = require('express')

const Config = require('../../webpack.config.js')

const compiler = Webpack(Config)


module.exports = function () {
  const app = Express()
  app.use(WebpackDevMiddleware(compiler, {
    // options
  }))

  app.use(WebpackHotMiddleware(compiler))
  
  return app
}



