const Webpack = require('webpack')

const config = require('./webpack.config.js')

const prodPlugin = new Webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

const uglifyPlugin = new Webpack.optimize.UglifyJsPlugin()

config.plugins.push(prodPlugin)
config.plugins.push(uglifyPlugin)

module.exports = config

