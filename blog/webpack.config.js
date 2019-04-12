var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        index: path.join(__dirname, './src/index'),
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].min.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },
    devServer: {
      port: 8081,
      proxy: {
        '/api': 'http://localhost:7777'
      }
    },
    plugins: [
        // TODO: 删除无关内容
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, './index.html'),
            chunks: ['index']
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
        // 这里我们给常用的文件夹设置别名，就可以直接引用了
        alias: {
            'container': path.resolve(__dirname, './src/container'),
            'components': path.resolve(__dirname, './src/components'),
            'action': path.resolve(__dirname, './src/redux/action'),
            'reducer': path.resolve(__dirname, './src/redux/reducer'),
            'router': path.resolve(__dirname, './src/router'),
        },
    },
    // externals: {
    //     "react": 'React',
    //     'react-dom': 'ReactDOM'
    // }
}
