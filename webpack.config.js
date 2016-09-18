var path = require('path');
var webpack = require('webpack');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
// var htmlWebpackPlugin =  require('html-webpack-plugin');

module.exports = {
    entry:
        [
            'webpack/hot/dev-server',
            'webpack-dev-server/client?http://localhost:8080',
            path.resolve(__dirname, "./app/src/redux-react.hhSelect/index.js")
            // "./app/src/redux/index.js"
        ],
    cache:true,
    output: {
        path: BUILD_PATH,
        filename: "bundle.js",
        publicPath: '/static/'
    },
    module: {
        loaders: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: "babel-loader",
              query:
                {
                  presets:['react','es2015']
                }
            },
            // {
            //     test: /\.scss$/,
            //     loaders: ['style', 'css', 'sass'],
            //     include: APP_PATH
            // },
            {
                test: /\.(png|jpg)$/,
                loader: 'url?limit=40000'
            }
        ]
    },
    resolve:{
        extensions:['','.js','.json']
    },
    // devServer: {
    //     hot: true,
    //     inline: true
    // },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ]
};