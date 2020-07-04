const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const ImageminOptipng = require('imagemin-optipng');


const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    assets: 'assets'
};

const cssLoaders = extra => {
    const loaders = [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                url: false
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                config: { path: 'postcss.config.js' }
            }
        }
    ];

    if(extra) {
        loaders.push(extra);
    }

    return loaders;
}

module.exports = {
    externals: {
        path: PATHS
    },
    entry: {
        app: PATHS.src
    },
    output: {
        filename: `${PATHS.assets}/js/[name].[hash].js`,
        path: PATHS.dist
        // publicPath: '/' // рабочая директория для dev-server
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.(ttf|woff|woff2|eot|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'assets/fonts'
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/img'
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.scss$/,
                use: cssLoaders({
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                })
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}/css/[name].[contenthash].css`
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer()
                ]
            }
        }),
        new HTMLWebpackPlugin({
            template: `${PATHS.src}/index.html`,
            filename: './index.html'
        }),
        new CopyWebpackPlugin([
            {
                from: `${PATHS.src}/img`,
                to: `${PATHS.assets}/img`
            },
            {
                from: `${PATHS.src}/fonts`,
                to: `${PATHS.assets}/fonts`
            },
            {
                from: `${PATHS.src}/static`,
                to: ''
            }
        ]),
        new ImageminPlugin({
            test: /\.(jpe?g|png|gif|svg)$/i,
            plugins: [
                ImageminMozjpeg({
                    quality: 65,
                    progressive: true
                })
            ]
        })
    ]
}
