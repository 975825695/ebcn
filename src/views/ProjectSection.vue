<template>
  <div class="container" height="200">
    <div class="main">
      <el-breadcrumb class="bread" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>课程体系</el-breadcrumb-item>
      </el-breadcrumb>
      <el-table :data="userProjects" stripe style="width: 100%">
        <el-table-column fixed="left" prop="section" class="title" label="章节名称">
        </el-table-column>
        <!-- <el-table-column  prop="section" class="title" label="提交次数">
        </el-table-column>
        <el-table-column  prop="section" class="title" label="我的分数">
        </el-table-column> -->
        <el-table-column fixed="right" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">习题</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
    name: "home",
    data() {
        return {
            currentUser: "",
            userProjects: []
        };
    },
    methods: {
        handleClick: function(row) {
            // this.$router.push({name: '/projectdetail.html#'+row.projectId,});
            window.location.href = this.url + `/#${row.projectId}`;
        }
    },
    mounted() {
        let user = sessionStorage.getItem("user");
        this.currentUser = JSON.parse(user);
        let url = this.url + "/login/getProjectBySection";
        this.axios
            .get(url, { params: { name: this.currentUser.userid } })
            .then(res => {
                var num = [];
                var noNum = [];
                // 判断是否含有数字章节开头
                res.data.forEach(item => {
                    if (
                        item.section.substr(0, 1) == "1" ||
                        item.section.substr(0, 1) == "2" ||
                        item.section.substr(0, 1) == "3"
                    ) {
                        num.push(item);
                    } else {
                        noNum.push(item);
                    }
                });
                console.log(num.concat(noNum));
                this.userProjects = num.concat(noNum).sort((obj1, obj2) => {
                    let num1 = Number(
                        obj1.section.substr(0, 3).replace(".", "")
                    );
                    let num2 = Number(
                        obj2.section.substr(0, 3).replace(".", "")
                    );
                    return num1 - num2;
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
};
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    width: 80%;
    justify-content: center;
    align-items: center;
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
    color: #4e4e4e;
    text-align: center;
    letter-spacing: 0.2px;
    margin-bottom: 20px;
}

.project-title.project-title-home > div {
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
.el-table th {
    background-color: #f5f5f5;
    color: #b4bfc6;
    font-size: 14px;
}
.el-table {
    font-size: 14px;
}
.el-table_1_column_1 {
    padding-left: 20px !important;
}
.bread{
    margin-bottom: 20px;
    span{
        font-size: 20px;
    }
}
</style>