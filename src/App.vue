<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
// import { mapState,mapActions } from "vuex";
export default {
    name: "app",
    components: {},
    computed: {
        // ...mapState(['indexContentTitle'])
    },
    created() {
        // console.log(this.indexContentTitle)
        let url = this.url + "/login/userInfo";
        this.axios.get(url).then(response => {
            if (response.data.success === false) {
                return;
            } else {
                const user = JSON.stringify(response.data);
                sessionStorage.setItem("user", user);
            }
        });
    },
    methods: {
        // ...mapActions(['delUserLike']),
    }
};
</script>

<style>
*,
html,
body {
    margin: 0;
    padding: 0;
}
a {
    text-decoration: none;
    color: #000;
}
html {
    background-color: #f5f5f5;
}
</style>
