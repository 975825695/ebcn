module.exports = {
    //...
    baseUrl: './',
    devServer: {
        proxy: {
            '/v2': {
                target: 'http://localhost:8888/',
                changeOrigin: true,
                pathRewrite: {
                    '^/v2': ''
                }
            }
        }
      }
    //...
}