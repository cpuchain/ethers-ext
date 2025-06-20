const path = require('path');
const { BannerPlugin } = require('webpack');

const config = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'ts',
                    target: 'ES2022',
                },
            },
        ],
    },
    entry: './src/index.ts',
    output: {
        filename: 'ethersOpt.umd.min.js',
        path: path.resolve(__dirname, './lib'),
        library: 'ethersOpt',
        libraryTarget: 'umd',
    },
    plugins: [
        new BannerPlugin({
            banner: `if (!globalThis.process?.browser) {
    globalThis.process = { browser: true, env: {}, };
}`,
            raw: true,
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            crypto: false,
            ethers: false,
        },
    },
};

module.exports = [
    config,
    {
        ...config,
        output: {
            filename: 'ethersOpt.umd.js',
            path: path.resolve(__dirname, './lib'),
            library: 'ethersOpt',
            libraryTarget: 'umd',
        },
        optimization: {
            minimize: false,
        },
    },
    {
        ...config,
        entry: './src/idb.ts',
        output: {
            filename: 'idb.umd.min.js',
            path: path.resolve(__dirname, './lib'),
            libraryTarget: 'umd',
        },
    },
    {
        ...config,
        entry: './src/idb.ts',
        output: {
            filename: 'idb.umd.js',
            path: path.resolve(__dirname, './lib'),
            libraryTarget: 'umd',
        },
        optimization: {
            minimize: false,
        },
    },
]