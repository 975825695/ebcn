<template>
    <div class="container" height="200">
      <div class="main">

        <!-- <div v-show="!isProject" class="project-name" @click="changeProject">
          <div class="project-title project-title-home">
            课程体系
          </div>
          <div class="project-time">
            <p>最后修改:</p>
            <p>7月12日 &nbsp; 10:02</p>
          </div>
        </div> -->

        <!-- <div v-for="(item, index) in studentHeader">
          <a :href="'/projectdetail.html#' + changeId(item) ">
            <div class="project-name">
              <div class="project-title">
                {{ item }}
              </div>
            </div>
          </a>
        </div> -->
        <el-table
        :data="userProjects"
        stripe
        style="width: 100%">
        <el-table-column
          fixed="left"
          prop="section"
          class="title"
          label="章节名称"
          >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200" 
          align="center" 
          >
          <template slot-scope="scope" >
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </div>
</template>

<script>

export default {
  name: 'home',
  data (){
    return{
       currentUser: '',
      userProjects: [],
    }
  },
  methods:{
     handleClick:function(row){
      // this.$router.push({name: '/projectdetail.html#'+row.projectId,});
       window.location.href = `/#${row.projectId}`
     }
  },
   mounted() {
      let user = sessionStorage.getItem('user')
      this.currentUser = JSON.parse(user);
          let url = this.url +'/login/getProjectBySection'
          this.axios.get(url, {params:{name: this.currentUser.userid}})
          .then((res) => {
            var num = []
            var noNum = []
            // 判断是否含有数字章节开头
            res.data.forEach(item => {
              if(item.section.substr(0,1) == '1'||item.section.substr(0,1) == '2'||item.section.substr(0,1) == '3'){
                num.push(item)
              }else {
                noNum.push(item)
              }
            });
            console.log(num.concat(noNum));
            this.userProjects = num.concat(noNum)
            .sort((obj1, obj2) => {
                let num1 = Number(obj1.section.substr(0, 3).replace('.', ''))
                let num2 = Number(obj2.section.substr(0, 3).replace('.', ''))
                return num1 - num2
              })
            
          })
          .catch((err) => {
              console.log(err);
          })
      }
}
</script>
 <style scoped>
    .container {
      display: flex;
      width: 80%;
      justify-content: center;
      align-items: center;
      /* width: 1440px; */
    }

    .main {
      width: 1040px;
      margin: 70px auto 140px;
      overflow: hidden;
    }

    .project-name {
      float: left;
      width: 242px;
      height: 270px;
      margin: 8px 8px;
      background-color: #fff;
      box-sizing: border-box;
      padding: 30px;
      cursor: pointer;
    }

    .project-name:hover {
      box-shadow: 0 17px 10px -10px rgba(0, 0, 0, 0.13);
    }

    .project-name div:first-child {
      /* color: #aaa; */
    }

    .project-title {
      /* font-family: SourceHanSansCN-Bold; */
      font-weight: 500;
      font-size: 24px;
      line-height: 40px;
      color: #4E4E4E;
      text-align: center;
      letter-spacing: 0.2px;
      margin-bottom: 20px;
    }
   
    .project-title.project-title-home>div {
      line-height: 270px;
      color: #4e4e4e;
    }

    /* .project-time {
      font-family: SourceHanSansCN-Normal;
      font-size: 12px;
      line-height: 24px;
      color: #A0A0A0;
      letter-spacing: 0.1px;
    } */

    a {
      text-decoration: none;
      color: #000;
    }
    .el-table th{
      background-color: #F5F5F5;
      color: #B4BFC6 ;
      font-size: 14px;
    }
    .el-table{
      font-size: 14px;
    }
    .el-table_1_column_1 {
      padding-left: 20px !important;
    }

  </style>