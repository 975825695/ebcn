<template>
    <div class="home">
        <Header></Header>
        <div class="title">
            <p>{{title}}</p>
        </div>
        <section>
            <router-view></router-view>
            <!-- <Work class="student"></Work> -->
        </section>
        <Foot></Foot>
    </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Header from "@/components/Header.vue";
import Foot from "@/components/Foot.vue";

export default {
    name: "home",
    data() {
        return {
            title: "作业管理"
        };
    },
    created() {
        this.init();
    },
    watch: {
        $route: "init"
    },
    methods: {
        init: function() {
            if (this.$route.path === "/teacher/student") {
                this.title = "学生管理";
            } else if (this.$route.path === "/teacher/work") {
                this.title = "作业管理";
            }
        }
    },
    components: {
        Header,
        Foot
    }
};
</script>
<style lang="scss" scoped>
.title {
    margin-left: 10%;
    margin-top: 2.6%;
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
        // margin-top: 2.4%;
        width: 80%;
    }
}
</style>
