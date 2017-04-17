module.exports = {
  entry: __dirname + "/src/main.js",
  output: { path: __dirname + "/static/js", filename: 'main.js' },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}