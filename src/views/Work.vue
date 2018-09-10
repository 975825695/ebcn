<template>
  <div class="student">
      <el-table
    :data="tableData"
    stripe
    ali
    style="width: 100%">
    <el-table-column
      fixed
      type="index"
      label="章节"
      align="center"
      width="80">
    </el-table-column>
    <el-table-column
      prop="name"
      label="标题"
      align="center"
      width="250">
    </el-table-column>
    <el-table-column
      prop="province"
      label="作业状态"
      width="120">
       <template slot-scope="scope">
        <p class="status">
          <b class="submit" v-if="scope.row.province=='上海'"></b>
          <b class="submited" v-if="scope.row.province=='苏州'"></b>
          {{scope.row.province}}
        </p>
      </template>
    </el-table-column>
    <el-table-column
      prop="city"
      label="提交状况"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="平均分"
      align="center"
      width="300">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      align="center">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>

export default {
  name: 'home',
  data (){
    return{
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
        }]
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
</style>
