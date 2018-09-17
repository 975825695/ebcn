/*
 * @Author: jorce 
 * @Date: 2018-09-12 16:47:36 
 * @Last Modified by: jorce
 * @Last Modified time: 2018-09-17 15:23:51
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import jorce from './plugins/jorce.js'
import axios from 'axios'
import {
  Loading,
  Message
} from 'element-ui'

Vue.config.productionTip = false
Vue.prototype.url = process.env.VUE_APP_URL;
Vue.prototype.jorce = jorce;
// 本地跨域
// Vue.prototype.url = 'v2'; 
// 正式包
// Vue.prototype.url = 'http://47.104.188.40:80';
// 测试环境
// Vue.prototype.url = 'http://localhost:8888';
let loadingInstance
// http请求拦截
axios.interceptors.request.use(config => {
  // if (config.method == 'post' && config.url != '/login') {
  //     config.data = {
  //         ...config.data,
  //         ...{ "user": "admin" }
  //     }
  // } else if (config.method == 'get') {
  //     if (/\?/.test(config.url)) {
  //         config.url += 'user=admin'
  //     } else {
  //         config.url += '?user=admin'
  //     }
  // }
  loadingInstance = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.1)'
  });
  console.log(config)
  return config;
});

axios.interceptors.response.use(response => {
  loadingInstance.close()
  if (response.data.success === false) {
    if (response.data.errorType !== 0 ) {
      Message({
        showClose: true,
        message: response.data.message,
        type: 'error'
      });
    }
    sessionStorage.removeItem('user')
    router.replace({
      path: '/embarkLogin',
    })
    return response
  } else {
    return response;
  }
}, error => {
  loadingInstance.close()
  Message.error({
    message: error
  })
  return Promise.reject(error)
});


Vue.prototype.axios = axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')