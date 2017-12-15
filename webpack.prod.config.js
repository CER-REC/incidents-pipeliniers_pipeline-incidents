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

// Disable sourcemaps for production builds
config.devtool = false
// Remove react-hot-loader and webpack-hot-middleware
config.entry.bundle = './app/app.jsx'
config.output.publicPath = ''
config.module.rules[0].use.options.plugins = []

module.exports = config

