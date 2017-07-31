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
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
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
      //   test: /\.coffee?$/,
      //   exclude: /node_modules/,
      //   loader: 'coffee',

      // },

      // {
      //   test: /\.cjsx?$/,
      //   exclude: /node_modules/,
      //   loaders: ['coffee', "cjsx"],
      // },



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