const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');


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
      }

    ]
  
  },
  resolve: {
   extensions: ['.js', '.jsx', '.json']
  },

  plugins: [
    // OccurenceOrderPlugin is needed for webpack 1.x only
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
    // new webpack.NoErrorsPlugin()
  ]
}