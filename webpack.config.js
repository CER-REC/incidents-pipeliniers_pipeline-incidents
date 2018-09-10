const Webpack = require('webpack')
const Path = require('path')
const DotenvWebpack = require('dotenv-webpack')

const BUILD_DIR = Path.resolve(__dirname, 'public/script')


module.exports = {
  entry: {
    bundle: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=/pipeline-incidents/script/__webpack_hmr',
      './app/app.jsx',
    ],
    // bundle: ['webpack-hot-middleware/client', './app/app.jsx'] // , 'webpack/hot/dev-server'
    // html: './app/app.html'
  },
  output: {
    path: BUILD_DIR,
    publicPath: '/pipeline-incidents/script/',
    filename: '[name].js',
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: ['react-hot-loader/babel'],
          }
        }
      },

      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
          options: {
            url: false
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }

    ]
  
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  // NB: Plugins object is *replaced* in production!
  // See webpack.prod.config.js
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new DotenvWebpack({
      path: './.env.dev'
    })
  ],
}
