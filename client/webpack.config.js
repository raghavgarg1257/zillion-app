var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
require('./config.js');

module.exports = {

    entry: [
        './src/index.js'
    ],

    output: {
        path: __dirname,
        publicPath: '/',
        filename: 'bundle.js'
    },

    module: {
        loaders: [{
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-1']
            }
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'API_URL': JSON.stringify(process.env.API_URL)
        })
        ,
        new BrowserSyncPlugin({
            'proxy' : 'localhost:8080',
            'port' : 4000,
            'ui' : {
                'port' : 4001
            }
        })
    ],

    resolve: {
        extensions: ['*', '.js', '.jsx', '.json']
    },

    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }

};
