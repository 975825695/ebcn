/*
 * @Author: jorce 
 * @Date: 2018-09-12 16:47:59 
 * @Last Modified by:   jorce 
 * @Last Modified time: 2018-09-12 16:47:59 
 */
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