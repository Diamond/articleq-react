var path = require('path');

module.exports = {
  entry: {
    app: './app/app.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: './[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  }
  // },
  // devServer: {
  //   // webpack-dev-server options
  //
  //   contentBase: "./build",
  //   // or: contentBase: "http://localhost/",
  //
  //   hot: true,
  //   // Enable special support for Hot Module Replacement
  //   // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
  //   // Use "webpack/hot/dev-server" as additional module in your entry point
  //   // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.
  //
  //   // Set this as true if you want to access dev server from arbitrary url.
  //   // This is handy if you are using a html5 router.
  //   historyApiFallback: true,
  //
  //   // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
  //   // Use "*" to proxy all paths to the specified server.
  //   // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
  //   // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
  //   proxy: {
  //   },
  //
  //   // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
  //   staticOptions: {
  //   },
  //
  //   // webpack-dev-middleware options
  //   quiet: false,
  //   noInfo: false,
  //   lazy: true,
  //   filename: "app.js",
  //   watchOptions: {
  //     aggregateTimeout: 300,
  //     poll: 1000
  //   },
  //   headers: { },
  //   stats: { colors: true }
  // }
};
