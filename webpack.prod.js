const merge = require('webpack-merge');
const WebpackConfig = require('./webpack.config');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const webpackProdConfig = merge(WebpackConfig, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin()
    ]
});

module.exports = new Promise((resolve, reject) => {
    resolve(webpackProdConfig);
});