<template>
  <div class="home">
    <Header></Header>
    <section>
      <router-view></router-view>
      <!-- <Work class="student"></Work> -->
    </section>
  </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Header from "@/components/Header.vue";
export default {
    name: "home",
    data() {
        return {
            title: "作业管理"
        };
    },
    created() {
        // this.init();
    },
    watch: {
        $route: "init"
    },
    methods: {
        init: function() {
            let url = this.url + "/login/userInfo";
            this.axios.get(url).then(response => {
                const user = JSON.stringify(response.data);
                sessionStorage.setItem("user", user);
            });
        }
    },
    components: {
        Header
    }
};
</script>
<style lang="scss" scoped>
.title {
    margin-left: 10%;
    margin-top: 4.6%;
    p {
        font-size: 20px;
        font-weight: bold;
    }
}
section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    .student {
        margin-top: 2.4%;
        width: 80%;
    }
}
</style>
