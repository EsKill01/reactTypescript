const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.tsx',
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
    module: {
        rules: [
        {
            test: /\.tsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, {loader: 'css-loader'}],
        },
        {
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: [{ loader: '@svgr/webpack', options: { svgoConfig: {
                    plugins:[ {
                       name: 'removeViewBox', active: false,
                    }]
                } } }],
       },
      ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin(),
    ],
}