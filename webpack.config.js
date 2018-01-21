
const webpack = require('webpack');

module.exports = {

  module: {
    rules: [{
        test: /\.js$/,
        exclude: [/node_modules/]
      },
      {
        test: /\.html$/,
        exclude: [/node_modules/],
        use:  ['underscore-template-loader']
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.png$/,
        exclude: [/node_modules/],
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.jpg$/,
        exclude: [/node_modules/],
        loader: 'file-loader'
      },
      {
        test: /\.gif$/,
        exclude: [/node_modules/],
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.json$/,
        exclude: [/node_modules/],
        loader: 'json-loader'
    }]
  },
  output: {
    filename: 'app.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'underscore',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  resolve: {
    modules: [
      __dirname + '/node_modules'
    ]
  }

};
