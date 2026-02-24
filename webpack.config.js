const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/index.ts',
  devtool: 'source-map',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
      }
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'content'),
      publicPath: '/content'
    },
    compress: true,
    port: 4173,
    hot: true,
    open: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
      minify: false
    })
  ]
};
