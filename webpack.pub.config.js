const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//导入删除dist文件夹的插件
const cleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
//导入抽取css的插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
//导入压缩css的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'production',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html',
            minify:{
                collapseWhitespace: true,
                removeComments:true,
                removeAttributeQuotes: true
            }
        }),
        new cleanWebpackPlugin(),
        new ExtractTextPlugin("css/index.css"),
        new OptimizeCssAssetsPlugin()
    ],
    optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 3000,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
      },
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath: '../'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: '../'
                  })
            },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: "url-loader?limit=5000&name=images/[hash:8]-[name].[ext]"
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: "url-loader"
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
}