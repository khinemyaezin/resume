const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
    compress: true,
    port: 4173,
    hot: true,
    open: false
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'README.md'),
          to: 'content/resume.md'
        },
        {
          from: path.resolve(__dirname, 'content'),
          to: 'content',
          globOptions: {
            ignore: ['**/resume.md']
          }
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      minify: false
    })
  ]
};
