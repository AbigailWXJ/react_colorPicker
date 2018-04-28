const path = require('path');

module.exports = {
 
    /*入口*/
    entry: path.resolve(__dirname, 'app/index.js'),
    
    /*输出到dist文件夹，输出文件名字为bundle.js*/
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['es2015','react']
              }
            }
          },
          {
            test: /\.less$/,
            use: [
            {
                loader: "style-loader"
            },{
                loader: "css-loader",
            },{
                loader: "less-loader"
            }
            ]
        }
  ]
}

    // devServer: {
    //     contentBase: path.join(__dirname,'./dist'),
    //     port:8080,
    //     historyApiFallback: true,
    //     host: '0.0.0.0'
    // },
 //    resolve: {
 //        alias:{
 //            pages: path.join(__dirname,'src/pages'),
 //            component: path.join(__dirname,'src/component'),
 //            router: path.join(__dirname,'src/router'),
 //            actions: path.join(__dirname,'src/redux/actions'),
 //            reducers: path.join(__dirname,'src/redux/reducers')
 //        }
 //    },
 // //    module: {
 //     rules: [{
 //         test: /\.js$/,
 //         use: ['babel-loader?cacheDirectory=true'],
 //         include: path.join(__dirname, 'src')
 //     }]
 // },
};