module.exports = {
  // 1
  entry: './src/index.js',
  // 2
  output: {
    path: '/build',
    filename: 'bundle.js'
  },
  // 3
  devServer: {
    static: './dist'
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.wav$/,
        loader: 'file-loader',
      }
    ]
  },
};