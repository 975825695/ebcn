<template>
    <div class="container">
        <div class="content-wrapper">
            <div class="login-panel">
                <div class="panel-left">
                    <!-- 背景图 -->
                    <p>有方App云</p>
                </div>
                <div class="panel-right">
                    <div class="panel-title">
                        <span class="title-text">登录</span>
                        <img src="@/assets/Embark-logo.png" class="ai-logo">
                    </div>
                    <div class="message-box">
                        <transition name="error-message" enter-active-class="animated shake" leave-active-class="animated fadeOut">
                            <div class="error-message" v-if="errorMessage.length > 0">
                                <p>{{errorMessage}}</p>
                                <!-- <p>{{contactMsg}}</p> -->
                            </div>
                        </transition>
                    </div>
                    <div class="form-item">
                        <!-- <div class="input-label">
                  <span>用户名&nbsp;UserName</span>
                </div> -->
                        <div class="input-item">
                            <input type="text" v-model="username" placeholder="用户名" autocomplete="new-password">
                        </div>
                    </div>
                    <div class="form-item">
                        <!-- <div class="input-label">
                  <span>密码&nbsp;Password</span>
                </div> -->
                        <div class="input-item">
                            <input type="password" v-model="password" placeholder="密码" autocomplete="new-password">
                        </div>
                    </div>
                    <div class="button-box" v-if="!logoutBool">
                        <input type="button" :class="['button', usernameError ? 'input-error' : '']" @click="login()" value="登录">
                    </div>
                    <div class="button-box" v-if="logoutBool">
                        <input type="button" :class="['button', usernameError ? 'input-error' : '']" @click="logout()" value="注销">
                    </div>
                </div>
            </div>
            <footer>
                <p>遇到登录问题？请联络 info@embarkchina.org</p>
            </footer>
            <!-- <div class="message-box">
        <transition name="error-message" enter-active-class="animated shake" leave-active-class="animated fadeOut">
          <div class="error-message" v-if="errorMessage.length > 0">
            <p>{{errorMessage}}</p>
            <p>{{contactMsg}}</p>
          </div>
        </transition>
      </div> -->
        </div>
    </div>
</template>
<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
const USERNAME_PATTERN = /^[\w_.@\d]{3,30}$/;
const PASSWORD_PATTERN = /^[\S]{4,16}$/;
export default {
    data() {
        return {
            username: "",
            password: "",
            errorMessage: "",
            contactMsg: "",
            usernameError: false,
            passwordError: false,
            timer: null,
            logoutBool: false
        };
    },
    created() {
        this.init();
        // let user = sessionStorage.getItem('user')
        // if(sessionStorage.getItem('user')){
        //     // window.location.href = 'project.html'
        //     // this.$router.push({path:'/'})
        //     window.location.href = this.url
        // }
    },
    watch: {
        watch: {
            errorMessage: function(newVal, oldVal) {
                var vueThis = this;
                if (newVal.length > 0) {
                    clearTimeout(vueThis.timer);
                    vueThis.timer = setTimeout(function() {
                        vueThis.errorMessage = "";
                        vueThis.contactMsg = "";
                    }, 4000);
                }
            }
        }
    },
    methods: {
        init: function() {
            if (sessionStorage.getItem("user")) {
                // window.location.href = 'project.html'
                this.$router.push("/");
            }
        },
        logout: function() {
            sessionStorage.removeItem("user");
            window.location.href = this.url + "/ode/_logout";
        },
        login: function() {
            this.usernameError = false;
            this.passwordError = false;
            var vueThis = this;
            if (!USERNAME_PATTERN.test(this.username)) {
                this.usernameError = true;
                this.errorMessage = "用户名或密码错误";
                this.contactMsg = "请联络  info@embarkchina.org";
                return;
            }
            if (!PASSWORD_PATTERN.test(this.password)) {
                this.passwordError = true;
                this.errorMessage = "用户名或密码错误";
                this.errorMessage = "请联络  info@embarkchina.org";
                return;
            }
            var param = this.convertObjToParams({
                username: this.username,
                password: this.password
            });
            // var param = {
            //   username: this.username,
            //   password: this.password
            // }
            this.axios.post("/login/userLogin", param).then(response => {
                if (response.data.success == true) {
                    //window.location.href = "/?locale=zh_CN";
                    let url = this.url + "/login/userInfo";
                    this.axios
                        .get(url)
                        .then(response => {
                            const user = JSON.stringify(response.data);
                            sessionStorage.setItem("user", user);
                            this.$router.push("/");
                            // window.location.href = "project.html";
                        })
                        .catch(err => {
                            console.log(err);
                        });
                } else {
                    if (response.data.errorType === 0) {
                        vueThis.usernameError = true;
                        vueThis.logoutBool = true;
                    } else if (response.data.errorType === 1) {
                        vueThis.passwordError = true;
                    }
                    vueThis.errorMessage = response.data.message;
                }
            });
        },
        convertObjToParams: function(obj) {
            var param = new URLSearchParams();
            for (var key in obj) {
                param.append(key, obj[key]);
            }
            return param;
        }
    }
};
</script>
<style lang="scss" scoped>
input::-webkit-input-placeholder {
    color: #a0a0a0;
}

input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #a0a0a0;
}

input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #a0a0a0;
}

input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #a0a0a0;
}

.container {
    width: 100%;
    /* height: 100%; */
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.content-wrapper {
    margin: 60px;
    width: 571px;
}
.login-panel {
    box-sizing: border-box;
    width: 100%;
    height: 394px;
    background-color: #ffffff;
    display: flex;
}
.login-panel .panel-left {
    width: 209px;
    height: 394px;
    border: 1px solid #ccc;
    background-image: url(../assets/loginBac-left.png);
    background-size: 100% 100%;
}
.login-panel .panel-left p {
    width: 91px;
    height: 108px;
    font-size: 30px;
    letter-spacing: 0.25px;
    line-height: 45px;
    margin-left: 41px;
    margin-top: 38px;
    color: #fff;
}
.login-panel .panel-right {
    width: 363px;
    height: 394px;
    border: 1px solid #ccc;
}

.panel-title {
    width: 100%;
    height: 48px;
    margin: 0;
    line-height: 48px;
    margin-top: 30px;
    margin-bottom: 39px;
}

.title-text {
    font-family: "SourceHanSansCN-Bold";
    color: #4e4e4e;
    font-size: 24px;
    letter-spacing: 0.2px;
    cursor: default;
    padding-left: 52px;
}

.ai-logo {
    width: 48px;
    height: 48px;
    float: right;
    margin-right: 52px;
}

.form-item,
.button-box,
.message-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
}

.form-item {
    width: 100%;
    height: 48px;
    margin-top: 18px;
}

.input-label {
    width: 271px;
    padding-left: 14px;
    margin: 14px;
    box-sizing: border-box;
}

.input-label > span {
    font-family: "SourceHanSansCN-Normal";
    font-size: 13px;
    color: #4e4e4e;
    letter-spacing: 0.11px;
    cursor: default;
}

.input-item {
    width: 271px;
    height: 48px;
}

.input-item > input {
    font-family: "SourceHanSansCN-Normal";
    outline: none;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 24px;
    background-color: #f5f8f9;
    padding: 24px;
    color: #a0a0a0;
    font-size: 14px;
    box-sizing: border-box;
}

.input-error {
    /* border: 1px solid #FF0000; */
    /* border-radius: 6px; */
    background-color: #f64b4b !important;
}

.button-box {
    margin-top: 52px;
    height: 46px;
}

.button {
    font-family: "SourceHanSansCN-Bold";
    color: #fff;
    font-size: 14px;
    letter-spacing: 0.13px;
}

.button {
    outline: none;
    width: 271px;
    height: 46px;
    background-color: #2288ff;
    border-radius: 100px;
    border: none;
    box-shadow: 0 2px 6px 0 rgba(74, 144, 226, 0.31);
    transition: background-color 0.5s;
}

.button:hover {
    background-color: #396fe2 !important;
}

.message-box {
    width: 100%;
    height: 14px;
}

.error-message {
    font-family: "SourceHanSansCN-Normal";
    font-size: 12px;
    width: 206px;
    height: 14px;
    color: #f64b4b;
    text-align: center;
    line-height: 14px;
    cursor: default;
}
footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 36px;
}
footer p {
    text-align: center;
    font-size: 12px;
    color: #b4bfc6;
}
</style>
