<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  created(){
    let url = this.url +'/login/userInfo'
    this.axios.get(url)
      .then( (response)=> {
      const user = JSON.stringify(response.data)
      sessionStorage.setItem("user",user);
    })
  },
  methods:{

  }
}
</script>

<style>
*,html,body{
  margin: 0;
  padding: 0;
  
}
a{
  text-decoration: none;
  color: #000;
}
html{
  background-color: #F5F5F5;
}
</style>
