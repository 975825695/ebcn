<template>
    <div class="container" height="200">
      <div class="main">
       
          <div class="project-name" v-for="(list,index) in projectList" :key="index">
            <div class="project-action">
              <p @click.stop="reOrAdd(1,index)">重命名</p>
              <p @click.stop="del(index)">删除</p>
            </div>
            <router-link :to="{path:list.action}">
            <div class="project-title project-title-home">
              {{list.title}}
            </div>
            </router-link>
          </div>
        <div>
            <!-- target="_blank" -->
              <div class="project-new" @click="reOrAdd(2)">
                <div class="project-img">
                  <img src="@/assets/add.png" alt="">
                </div>
                <div class="project-new-title">
                  新建项目
                </div>
              </div>
        </div>
      </div>
      <el-dialog :title="dialogTitle" :visible.sync="renameVisible">
        <el-form :model="form">
          <el-form-item label="章节名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="reOrAddConfirm()">确 定</el-button>
        </div>
      </el-dialog>
    </div>

</template>

<script>

export default {
  name: 'home',
  data (){
    return{
      isProject: false,
      currentUser: '',
      projectName:'课程体系',
      projectList:[{
          title:'课程体系',
          action:'section'
        },
        {
          title:'测试课程',
          action:'section'
        }
      ],
      form:{
        name:''
      },
      formLabelWidth:'100px',
      renameVisible:false,
      index:null,
      type:null,
      dialogTitle:''
    }
  },
  methods:{
    reOrAdd:function(type,index){
      this.type = type
      if(type == 1) {
         this.index = index
         this.dialogTitle = '重命名'
      }else if(type == 2) {
         this.dialogTitle = '新建'
      }
     
      this.renameVisible = true;
    },
    reOrAddConfirm:function(){
      if (this.type ==1 ) {
         this.projectList[this.index].title = this.form.name
      }else if(this.type ==2){
        this.projectList.push({
          title:this.form.name
        })
      }
      this.form.name = ''
      this.renameVisible = false
    },
    del:function(index){
      this.projectList.splice(index,1)
    }
  }
}
</script>
<style lang="scss" scoped>
    .container {
      display: flex;
      width: 80%;
      /* width: 1440px; */
      align-items: center;
      justify-content: center;
      .project-action{
        width: 100%;
        display: flex;
        margin-bottom: 20px;
        margin-top: 10px;
        font-size: 14px;
        color: #ccc;
        p:hover{
          color:#2288FF; 
        }
        p:nth-of-type(1){
          margin-left: 120px;
        }
        p:nth-of-type(2){
          margin-left: 10px;
        }
      }
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
      // padding: 20px;
      cursor: pointer;
    }

    .project-name:hover {
      box-shadow: 0 17px 10px -10px rgba(0, 0, 0, 0.13);
    }

    .project-title {
      /* font-family: SourceHanSansCN-Bold; */
      font-weight: 600;
      font-size: 24px;
      line-height: 40px;
      color: #4E4E4E;
      text-align: center;
      letter-spacing: 0.2px;
      margin-bottom: 20px;
    }

    .project-title.project-title-home > div {
      line-height: 270px;
      color: #4e4e4e;
    }
    .project-new {
      float: left;
      width: 242px;
      height: 270px;
      margin: 8px 8px;
      box-sizing: border-box;
      padding: 30px;
      cursor: pointer;
      border: 3px dotted #E4E9EC;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .project-new .project-img{
      width: 36px;
      height: 36px;
    }
    .project-new .project-img img{
      width: 36px;
      height: 36px;
    }
    .project-new-title {
      font-family: SourceHanSansCN-Bold;
      font-weight: 500;
      font-size: 18px;
      line-height: 27px;
      color: #B4BFC6;
      text-align: center;
      letter-spacing: 0.2px;
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
  </style>
</style>
