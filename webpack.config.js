const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: {
        index: './src/index.js',
        test: './src/index.js',
    },
    devtool: "eval",
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: '[name].js'
    },

    devServer: {
        contentBase: ['./dist', './src'],
        port: 3003,
        host: '0.0.0.0'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                },
                {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                }]
            }

        ]
    },
    resolve: {
        extensions: ['*', '.js', 'ts', 'tsx']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack Example',
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack Example',
            template: './src/index.html',
            filename: 'test.html',
            chunks: ['test']
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
};
