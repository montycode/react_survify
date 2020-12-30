var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
            },
            {
                test: /\.css$/,
                use: [
                "style-loader",
                { loader: "css-loader", options: { importLoaders: 1 } },
                "postcss-loader",
                ],
            },
            {
                test: /\.(png|gif|jpg)$/,
                use: [
                {
                    loader: 'file-loader',
                    options: { name: 'assets/[hash].[ext]' },
                },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/'
                    }
                  }
                ]
              }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        }
    },
    entry: {
      index: path.resolve(__dirname, 'src/index.jsx'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.bundle.js',
      publicPath: '/'
    },
    plugins: [new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: './public/favicon.ico'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:1337'
        })
    }
}