const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');


module.exports = {
  entry: {
    javascript: './app/app.jsx'
    // html: './app/app.html'
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
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
  }
}