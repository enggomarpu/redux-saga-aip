const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, ''),
    entry: [
        path.resolve(__dirname, 'src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'index.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loaders: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['style-loader', 'css-loader', 'sass-loader']
                    
                })
            },{
                test: /\.scss$/,
                loader: 'style!css!sass'
              }
        ]
    },
    plugins: [
        new ExtractTextPlugin('index.css')
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        hot: true
     },
};

