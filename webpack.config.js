// const Webpack = require('webpack')
const Path = require('path')
const DotenvWebpack = require('dotenv-webpack')

const BUILD_DIR = Path.resolve(__dirname, 'public/script')


module.exports = {
  entry: {
    bundle: ['./app/app.jsx']
    // bundle: ['webpack-hot-middleware/client', './app/app.jsx'] // , 'webpack/hot/dev-server'
    // html: './app/app.html'
  },
  output: {
    path: BUILD_DIR,
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
            presets: ['env', 'react']
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
    // new Webpack.HotModuleReplacementPlugin(),
    // new Webpack.NoErrorsPlugin()
    new DotenvWebpack({
      path: './.env.dev'
    })
  ],
}
