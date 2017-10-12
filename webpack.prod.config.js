const Webpack = require('webpack')
const DotenvWebpack = require('dotenv-webpack')

const config = require('./webpack.config.js')

config.plugins = [
  new Webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),

  new Webpack.optimize.UglifyJsPlugin(),

  new DotenvWebpack({
    path: './.env.prod'
  }),
]

module.exports = config

