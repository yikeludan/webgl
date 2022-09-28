var path = require('path')                                      //引入path
const HtmlPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {                                    //注意这里是exports不是export
    context: path.join(__dirname, 'src'),
    entry: ['./app.js'],                                 //入口文件
    output: {                                                       //输出文件
        path: path.resolve(__dirname,'dist'),                      //输出文件的目录
        filename: 'game.min.[hash:8].js'                                 //输出文件的名称
    },
    target: 'web',
    plugins: [
        //new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: 'img/',to:'img/'}
        ], {
            ignore: [],
            debug:'debug',
            copyUnmodified: true
        }),
        new ImageminPlugin({
            test: /\.(jpeg|png|gif|svg)$/i,
            disable: process.env.NODE_ENV !== 'production',
            pngquant: {
                verbose:true,
                quality: '80-90',
            }
        }),
        new HtmlPlugin({
            file:path.join(__dirname,'dist','index.html'),
            template:'./index.html'
        })
    ],
    module: {
        rules: [
            {
                include: /node_modules/,
                test: /\.mjs$/,
                type: 'javascript/auto'
            }
        ]
    }
}
