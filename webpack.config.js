const HtmlWebpackPlugin = require('html-webpack-plugin')
const globImporter = require('node-sass-glob-importer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (_, options) => {
    const isDev = options.mode === 'development'
    return {
        entry: './src/index.js',
        output: {
            filename: isDev ? 'bundle.js' : '[contenthash].js',
            path: __dirname + '/dist',
            clean: !isDev,
            assetModuleFilename: `assets/${isDev ? '[name]' : '[contenthash]'}[ext]`
        },
        devtool: isDev && 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.(sass|scss|css)$/i,
                    use: [
                        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sassOptions: {
                                    importer: globImporter()
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|eot|ttf|woff|woff2)$/i,
                    type: 'asset/resource'
                },
                {
                    test: /\.hbs$/,
                    use: [
                        {
                            loader: 'handlebars-loader',
                            options: {
                                partialDirs: __dirname + '/public/templates/partials',
                                inlineRequires: /(images\/)/,
                                exclude: /(node_modules)/
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: __dirname + '/public/templates/index.hbs',
                inject: true,
                meta: {
                    viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
                },
                filename: 'index.html',
                title: 'Crypton Academy',
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            }),
            new MiniCssExtractPlugin({filename: '[contenthash].css',})
        ],
        watchOptions: {
            ignored: ['/node_modules/', '/dist/']
        },
        target: 'web',
        devServer: {
            watchFiles: __dirname + '/public/templates',
            liveReload: true
        }
    }

}
