const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (_, options) => {
    const isDev = options.mode === 'development'
    return {
        entry: './src/index.js',
        output: {
            filename: isDev ? 'bundle.js' : 'bundle.[contenthash].js',
            path: __dirname + '/dist',
            clean: true,
            assetModuleFilename: `assets/${isDev ? '[name]' : '[contenthash]'}[ext]`
        },
        devtool: isDev && 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.(sass|scss|css)$/i,
                    use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|eot|ttf|woff)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.html$/,
                    use: ['html-loader']
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: __dirname + '/src/templates/index.html',
                inject: 'body',
                filename: 'index.html',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            }),
            new MiniCssExtractPlugin({
                filename: 'bundle.[id].[hash].css',
            })
        ],
        watchOptions: {
            ignored: ['/node_modules/', '/dist/']
        }
    }

}
