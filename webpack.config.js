var path = require('path')
var webpack = require('webpack')

module.exports = {
    context: __dirname,
    
    entry: './assets/js/flight-app',
    
    output: {
        path: path.resolve('./assets/bundles'),
        filename: '[name].js',
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ],

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2016']
                }
            },
            {
                test: /\.css$/, loader: 'style-loader!css-loader'
            }
        ]
    },

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
    }
}
