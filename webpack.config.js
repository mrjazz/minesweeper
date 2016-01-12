var path = require('path'),
webpack = require('webpack');

module.exports = {
    debug: true,
    devtool: 'sourcemap',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [{
            test: /\.jsx$|\.js$/,            
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, './src')
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
