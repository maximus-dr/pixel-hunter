const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackConfig = require('./webpack.config');

const webpackDevConfig = merge(WebpackConfig, {
    mode: 'development',
    devtool: '#@cheap-module-eval-source-map',
    devServer: {
        contentBase: WebpackConfig.externals.path.dist,
        overlay: {
            port: 8081,
            warnings: true,
            errors: true
        }
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ]
});

module.exports = new Promise((resolve, reject) => {
    resolve(webpackDevConfig);
});