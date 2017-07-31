// const webpack = require('webpack');
const path = require('path');

// // do I really want this?
const BUILD_DIR = path.resolve(__dirname, 'dist');
// const APP_DIR = path.resolve(__dirname, 'src/client/app');

// const config = {
//   entry: APP_DIR + '/index.jsx',
//   output: {
//     path: BUILD_DIR,
//     filename: 'bundle.js'
//   }
// };

// module.exports = config;


const webpack = require('webpack');

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
  

    // loaders: [
    //   {
    //     test: /\.html$/,
    //     loader: "file?name=[name].[ext]",
    //   },

      // {
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   loaders: ['js', "jsx"],
      // },




    // ]
  },
  resolve: {
   extensions: ['.js', '.jsx', '.json']
  }
}