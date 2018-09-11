 <template>
      <div class="header">
        <div class="logo">
          <p @click="goback()">有方APP云</p>
        </div>
        <nav>
          <div>
            <p>
              <router-link :to="{path:'/project'}">项目</router-link>
               <img  src="@/assets/drop.png" alt="">
            </p>
          </div>
           <div>
            <p>
              <router-link :to="{path:'/teacher/work'}">作业管理</router-link>
            </p>
          </div>
           <div>
            <p>
              <router-link :to="{path:'/teacher/student'}">学生管理</router-link>
            </p>
          </div>
          <div>
            <p>
              <router-link :to="{path:'/embarkLogin'}">登陆</router-link>
            </p>
          </div>
        </nav>
        <div class="user">
          <span>
             <b >{{user.username}}</b>
             <img src="@/assets/drop.png" alt="">
             <span @click="logout()">注销</span>
          </span>
        </div>
      </div>
  </template>

  <script>
    export default {
      data() {
        return {
          navList:[
            {name:'项目',arr:[{name:'1'}]},
            {name:'学生管理',arr:[]},
            {name:'作业管理',arr:[]},
          ],
          user:{}
        }
      },
      created(){
        this.init()
      },
      methods:{
        init:function(){
          let user = sessionStorage.getItem('user')
          this.user = JSON.parse(user);
        },
        goback:function(){
          this.$router.push({path:'/'})
        },
        logout:function(){
          sessionStorage.removeItem('user');
          window.location=this.url+'/ode/_logout'
        }
      }
    }
  </script>
  <style lang="scss" scoped>
      .header{
        width: 100%;
        height: 60px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .logo{
          margin-left: 1.5%;
          width: 150px;
          cursor: pointer;
          p{
           
            font-size: 21px;
            font-family: SourceHanSansCN-Bold;
            color: #2288FF ;
            font-weight: bold;
          }
        }
        nav{
          width: 80%;
          display: flex;
          margin-left: 4%;
          height: 60px;
          div{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100px;
            height: 60px;
            p{
              height: 60px;
              line-height: 60px;
              display: flex;
              align-items: center;
              font-size: 14px;
              font-family: SourceHanSansCN-Bold;
              color: #4E4E4E ;
              font-weight: bold;
            }
          }
        }
        .user{

          span{
          position: relative;
           width: 100px;
           display: inline-block;
           height: 60px;
           line-height: 60px;
           display: flex;
           align-items: center;
           justify-content: center;
          
          &:hover {
            color: #2288FF;
            span{
              display: block;
              &:hover{
                color:#2288ff;
              }
            }
            }
           b{
             cursor: pointer;
             
           }
           span{
             position: absolute;
             color:#000;
             width: 100px;
             height: 50px;
             line-height: 50px;
             display: none;
             background-color: #fff;
             box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.17);
             border: 1px solid #ccc;
             border-radius: 4px;
             text-align: center;
             top: 60px;
             right: 0;
             cursor: pointer;
           }
          }
        }
      }
  </style>
  