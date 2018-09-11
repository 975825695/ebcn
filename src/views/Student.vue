<template>
  <div class="student">
    <el-table
    :data="tableData"
    stripe
    fit
    style="width: 100%">
    <el-table-column
      fixed
      prop="studentID"
      label="ID"
      align="center"
      >
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="studentName"
        align="center"
        >
      </el-table-column>
    <!-- <div class="tableOuter" v-for='(item,outer) in tableData' :key="outer"> -->
      <el-table-column v-for='(list,inner) in studentHeader' :label="list.title"  :key="inner">
        <template slot-scope="scope">
          <!-- <p>{{scope.row.projectList[inner].score}}</p> -->
          <!-- <div v-for='(item,index) in scope.row.projectList[inner]' :key="index">
            <p>{{item.score}}</p>
          </div> -->
          <p v-if="scope.row.projectList[inner].status===0" class="notScore">{{scope.row.projectList[inner].score}}</p>
          <p v-if="scope.row.projectList[inner].status===1" class="score" @click="toDetail(scope.row.projectList[inner].projectId)">{{scope.row.projectList[inner].score}}</p>
          <p v-if="scope.row.projectList[inner].status===2" class="scored" @click="toDetail(scope.row.projectList[inner].projectId)">{{scope.row.projectList[inner].score}}</p>
        </template>
      </el-table-column>
    <!-- </div> -->
    <el-table-column
      fixed="right"
      label="操作"
      align="center">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
   <div class="downLoad">
       <el-button type="plian" class="" @click="download_excel">表格下载</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data (){
    return{
      currentUserId :'',
      tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
      }],
      studentHeader: [
        {title:'1.1.App开发课程简介'},
        {title:'1.2.项目新建'},
        {title:'1.3.第一个APP'},
        {title:'1.4.画笔'},
        {title:'1.5.照相机和图像选择框'},
        {title:'2.1.文件管理器'},
        {title:'2.2.音乐播放器'},
        {title:'2.3.计步器'},
        {title:'2.4.谁来做家务'},
        {title:'2.5.指南针'},
        {title:'3.1.图灵机器人-第一部分'},
        {title:'3.2.图灵机器人-第二部分'},
        {title:'3.3.可训练的图像识别'},
      ],
    }
  },
  created (){
    this.init();
    // this.sortData();
  },
  methods:{
    init(){
      let user = sessionStorage.getItem('user')
      user = JSON.parse(user);
      console.log(user);
          let params = {
            teacher_name: user.userid
          }
          let url = this.url + `/teacher/getStudentsAndProjects?teacher_name=${user.userid}`
          // let url = `v2/teacher/getStudentsAndProjects?teacher_name=${user.userid}`
          // let url = `http://localhost:8888/teacher/getStudentsAndProjects?teacher_name=${user.userid}`
          this.axios.get(url)
            .then((res) => {
              // this.student = res.data
              let temp = res.data;
              temp.forEach(element => {
                element.projectList.sort((a,b)=>a.pos-b.pos);
              });
              // this.tableData = temp;
              temp.forEach(element => {
                for (let index = 0; index < element.projectList.length; index++) {
                  element.projectList[index].title =  this.studentHeader[index].title
                  if (element.projectList[index].status===0) {
                    element.projectList[index].score = '未提交'
                  }else if (element.projectList[index].status===1) {
                    element.projectList[index].score = '未打分'
                  }
                  // else if (element.projectList[index].status===2) {
                  //   element.projectList[index].score = '已打分'
                  // }
                  // element.projectList[index].score = element.projectList[index].score.toString()
                }
              });
              this.studentHeader = this.studentHeader.splice(0,temp[0].projectList.length);
              // console.log(this.studentHeader);
              this.tableData = temp;
              // this.tableData.projectList.sort((a,b)=>a.pos-b.pos);
              // console.log(this.tableData);
            })
            .catch((err) => {
              console.log(err);
            })
    },
    download_excel(){
      //  window.location = "v2/teacher/getStudentInfoExcel"
      var url = this.url+"/teacher/getStudentInfoExcel"
      // console.log(url);
       window.location = url
    },
    sortData(){
      console.log(this.tableData);
    },
    toDetail(id){
      window.location.href = 'http://localhost:8888/#'+id
    }
  }
}
</script>
<style lang="scss">
  .student{
    width: 80%;
    .el-table th{
    background-color: #f5f5f5;
    color: #B4BFC6 ;
  }
  .tableOuter{
    white-space:nowrap;  
  }
  .downLoad{
    display: flex;
    flex-direction: row-reverse;
    margin-top: 20px;
  }
    .status{
      display: flex;
      align-items: center;
      letter-spacing: .5px;
      b{
        margin-right: 5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
    }
  }
  .submit{
    background-color: red;
  }
  .submited{
    background-color: #7FD81E;
  }
  .wait{
    background-color: #FFD048;
  }
  .finish{
    background-color: #E2E2E2;
  }
  .notScore{
    color:#B4BFC6;
  }
  .score{
    color:#2288FF;
    &:hover{
       cursor: pointer;
    text-decoration: underline;
    }
  }
  
  .scored{
    color:#4B5358;
    &:hover{
       cursor: pointer;
    text-decoration: underline;
    }
  }
</style>
