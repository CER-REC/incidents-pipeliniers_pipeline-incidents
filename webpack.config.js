const Webpack = require('webpack')
const Path = require('path')

const BUILD_DIR = Path.resolve(__dirname, 'public')


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
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }

    ]
  
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  plugins: [
    new Webpack.HotModuleReplacementPlugin()
    // new Webpack.NoErrorsPlugin()
  ],
}