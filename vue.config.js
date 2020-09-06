const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

const name = 'Double博客管理系统';

const port = process.env.port || process.env.npm_config_port || 80; // 端口

module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: port,
        proxy: {
            [process.env.VUE_APP_BASE_API]: {
                target: `http://localhost:8888`,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        },
        disableHostCheck: true
    },
    configureWebpack: {
        name: name,
        resolve: {
            alias: {
                '@': resolve('src'),

            }
        }
    },
    chainWebpack(config) {
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end();
    }
}