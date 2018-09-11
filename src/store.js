import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)


export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    getUserData(){
      var url = 'v2/login/userInfo'
      axios.get(url).then((res)=>{
        return res.data 
      })
    }
  }
})
