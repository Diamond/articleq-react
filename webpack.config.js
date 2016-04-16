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
};
