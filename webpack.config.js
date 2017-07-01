const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const sourcePath = path.join(__dirname, './app');
const buildDirectory = path.join(__dirname, './build');
const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;
const stats = {
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
  colors: {
    green: '\u001b[32m',
  },
};
const env = process.env.NODE_ENV;
const nodeEnv = env && env.prod ? 'production' : 'development';
const isProd = nodeEnv === 'production';
const htmlTemplate = isProd ? 'index.ejs' : 'index.ejs';

let cssLoader;

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    async: true,
    children: true,
    minChunks: 2,
  }),

  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
  }),

  new HtmlWebpackPlugin({
    template: htmlTemplate,
    inject: true,
    production: isProd,
    minify: isProd && {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),
];

if (isProd) {
  plugins.push(
    new UglifyJSPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
    })
  );

  cssLoader = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
      },
      {
        loader: 'sass-loader',
      },
    ],
  });
} else {
  plugins.push(
    // make hot reloading work
    new webpack.HotModuleReplacementPlugin()
  );

  cssLoader = [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'sass-loader',
    },
  ];
}

const entryPoint = isProd
  ? './index.js'
  : [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/only-dev-server',
    './index.js',
  ];

const config = {
  devtool: isProd ? 'source-map' : 'cheap-module-source-map',
  context: sourcePath,
  entry: {
    main: entryPoint,
  },
  output: {
    path: buildDirectory,
    publicPath: '/',
    filename: '[name]-[hash:8].js',
    chunkFilename: '[name]-[chunkhash:8].js',
  },
  module: {
    rules: [
      {
        test: /\.(html|svg|jpe?g|png|ttf|woff2?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'static/[name]-[hash:8].[ext]',
          },
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: cssLoader,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [path.resolve(__dirname, 'node_modules'), sourcePath],
  },

  plugins,

  stats: stats,

  devServer: {
    contentBase: './app',
    publicPath: '/',
    historyApiFallback: true,
    port: port,
    host: host,
    hot: !isProd,
    compress: isProd,
    stats: stats,
  },
};

module.exports = config;
