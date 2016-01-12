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
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/only-dev-server',
        './src/app.js'
    ],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx$|\.js$/,
            loader: 'babel',
            query: {
                presets: ['react', 'es2015']
            },
            include: path.join(__dirname, './src')
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
