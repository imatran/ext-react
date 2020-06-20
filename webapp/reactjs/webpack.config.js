const Path = require('path');
const PortFinder = require('portfinder');
const ClosurePlugin = require('closure-webpack-plugin');

module.exports = async function (env) {
    const get = (it, val) => {
        return env === undefined || env[it] === undefined ? val : env[it];
    };

    const rules = [
        {
            test: /.(js)$/,
            exclude: /node_modules/,
            use: [
                {
                    loader: Path.resolve(__dirname, './class-loader.js'),
                    options: {
                        namespace: 'React',
                        output: {
                            name: 'ExtRequires',
                            path: Path.resolve(__dirname, '../extjs/app/')
                        }
                    }
                },
                {
                    loader: 'babel-loader',
                    options: {
                        "presets": [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                        "plugins": [
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            ]
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        },
        {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: 'resources/fonts',
                    }
                }
            ]
        }
    ];

    const entry = {
        main: [
            "@babel/polyfill",
            Path.resolve(__dirname, './main.js')
        ]
    };

    const output = {
        path: Path.resolve(__dirname, '../extjs/resources'),
        filename: 'js/bundle.js'
    };

    const resolve = {
        alias: {
            src: Path.resolve(__dirname, './src'),
            lib: Path.resolve(__dirname, './lib'),
            css: Path.resolve(__dirname, './css')
        }
    };

    const plugins = {
        development: [],
        production: [
            new ClosurePlugin({mode: 'STANDARD'})
        ]
    };

    const devtool = {
        development: 'inline-source-map',
        production: 'source-map'
    };

    const environment = get('environment', 'development');

    PortFinder.basePort = (env && env.port) || 3000;
    return PortFinder.getPortPromise().then(port => {
        return {
            mode: environment,
            devtool: devtool[environment],
            entry: entry,
            output: output,
            plugins: plugins[environment],
            module: { rules: rules },
            resolve: resolve,
            performance: { hints: false },
            stats: 'none',
            optimization: { noEmitOnErrors: true },
            node: false,
            devServer: {
                contentBase: Path.join(__dirname, '../extjs'),
                port: port,
                writeToDisk: true
            }
        };
    });
};
