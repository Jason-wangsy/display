const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html'
        })
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            { test: /\.scss$/, use: ['style-loader', 'css-loader?modules&localIdentName=[name]_[local]-[hash:5]', 'sass-loader'] },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: "url-loader?limit=5000"
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: "url-loader"
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
}