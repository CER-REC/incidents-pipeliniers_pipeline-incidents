
import WebpackHotMiddleware from 'webpack-hot-middleware'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import Webpack from 'webpack'
import Express from 'express'

import Config from '../../webpack.config.js'

const compiler = Webpack(Config)


export default function () {
  const app = Express()
  app.use('/script', WebpackDevMiddleware(compiler, {
    // options
  }))

  app.use('/script', WebpackHotMiddleware(compiler))

  return app
}
