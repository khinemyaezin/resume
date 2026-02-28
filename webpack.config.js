const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

class EmitResumeFromReadmePlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap('EmitResumeFromReadmePlugin', (compilation) => {
      const readmePath = path.resolve(compiler.context, 'README.md');
      compilation.fileDependencies.add(readmePath);

      compilation.hooks.processAssets.tap(
        {
          name: 'EmitResumeFromReadmePlugin',
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
        },
        () => {
          if (!fs.existsSync(readmePath)) {
            compilation.warnings.push(new Error('[EmitResumeFromReadmePlugin] README.md not found.'));
            return;
          }

          const markdown = fs.readFileSync(readmePath, 'utf8');
          compilation.emitAsset(
            'content/resume.md',
            new compiler.webpack.sources.RawSource(markdown)
          );
        }
      );
    });
  }
}

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
    new EmitResumeFromReadmePlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      minify: false
    })
  ]
};
