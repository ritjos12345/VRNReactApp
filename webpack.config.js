var config = {
    mode: 'none',
    entry: './main.js',
    resolve: {
        extensions: ['.js', '.jsx',]
    },
    output: {
        path: '/',
        filename: 'index.js'
    },
    devServer: {
        historyApiFallback: true,//required when wanting to load application without any hashes like /detail/1
        contentBase: './',
        inline: true,
        host: '0.0.0.0',//required when running application with ip address
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                 test: /\.css$/,
                 loader: ['style-loader', 'css-loader']
            },
            {
                  test: /\.(svg|ttf|woff|woff2|eot)$/, 
                  loader: ['file-loader']
             }            
        ]
    }

}

module.exports = config;