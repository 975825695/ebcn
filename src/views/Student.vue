<template>
    <div class="student">
        <div class="downLoad">
            <el-button type="plian" class="" @click="download_excel">表格下载</el-button>
            <el-select v-model="selValue" placeholder="按照课程或班级筛选">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                </el-option>
            </el-select>
        </div>
        <el-table :data="tableData" stripe fit style="width: 100%">

            <el-table-column fixed prop="studentID" label="ID" align="center">
            </el-table-column>
            <el-table-column label="姓名" prop="studentName" align="center">
            </el-table-column>
            <!-- <div class="tableOuter" v-for='(item,outer) in tableData' :key="outer"> -->
            <el-table-column v-for='(list,inner) in studentHeader' :label="list.title" :key="inner">
                <template slot-scope="scope">
                    <!-- <div v-for='(item,index) in scope.row.projectList[inner]' :key="index">
            <p>{{item.score}}</p>
          </div> -->
                    <p v-if="scope.row.projectList[inner].status===0" class="notScore">{{scope.row.projectList[inner].score}}</p>
                    <p v-if="scope.row.projectList[inner].status===1" class="score" @click="toDetail(scope.row.projectList[inner].projectId)">{{scope.row.projectList[inner].score}}</p>
                    <p v-if="scope.row.projectList[inner].status===2" class="scored" @click="toDetail(scope.row.projectList[inner].projectId)">{{scope.row.projectList[inner].score}}</p>
                    <p v-if="scope.row.projectList[inner].status === 4">{{scope.row.projectList[inner].score}}</p>
                </template>
            </el-table-column>
            <el-table-column align="center">
            </el-table-column>
            <!-- </div> -->
            <!-- 预留 -->
            <!-- <el-table-column
      fixed="right"
      label="操作"
      align="center">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column> -->

        </el-table>
        <div class="page-separate">
            <el-pagination class="pageination" background :current-page="currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :page-sizes="pageSizes" layout="total, sizes, prev, pager, next, jumper" :total="tempData.length">
            </el-pagination>
        </div>

    </div>
</template>

<script>
export default {
    name: "home",
    data() {
        return {
            currentUserId: "",
            tableData: [],
            tempData: [],
            mockData: [],
            studentHeader: [
                { title: "1.1.App开发课程简介" },
                { title: "1.2.项目新建" },
                { title: "1.3.第一个APP" },
                { title: "1.4.画笔" },
                { title: "1.5.照相机和图像选择框" },
                { title: "Milestone1 拍照画图项目" },
                { title: "2.1.文件管理器1" },
                { title: "2.1.文件管理器2" },
                { title: "2.2.音乐播放器" },
                { title: "2.3.计步器" },
                { title: "2.4.谁来做家务" },
                { title: "2.5.指南针" },
                { title: "Milestone2 摇一摇切歌项目1" },
                { title: "Milestone2 摇一摇切歌项目2" },
                { title: "3.1.图灵机器人-第一部分" },
                { title: "3.2.图灵机器人-第二部分" },
                { title: "3.3.可训练的图像识别" },
                { title: "Milestone3 可训练的图像识别" }
            ],
            pageSize: 5,
            pageSizes: [5, 10, 15, 20, 25],
            currentPage: 1,
            //
            selValue: "",
            options2: [
                {
                    value: "选项1",
                    label: "课程"
                },
                {
                    value: "选项2",
                    label: "班级",
                    disabled: true
                }
            ]
        };
    },
    created() {
        this.init();
        // this.sortData();
    },
    methods: {
        init() {
            let user = sessionStorage.getItem("user");
            user = JSON.parse(user);
            console.log(user);
            let params = {
                teacher_name: user.userid
            };
            let url =
                this.url +
                `/teacher/getStudentsAndProjects?teacher_name=${user.userid}`;
            this.axios
                .get(url)
                .then(res => {
                    // this.student = res.data
                    let temp = res.data;
                    // let temp = this.mockData;
                    let len = 0;
                    temp.forEach(element => {
                        if (element.projectList.length > len) {
                            len = element.projectList.length;
                        }
                        element.projectList.sort((a, b) => a.pos - b.pos);
                    });
                    // this.tableData = temp;

                    temp.forEach(element => {
                        if (element.projectList.length < len) {
                            for (
                                let index = element.projectList.length;
                                index < len;
                                index++
                            ) {
                                element.projectList[index] = {};
                            }
                        }
                        for (
                            let index = 0;
                            index < element.projectList.length;
                            index++
                        ) {
                            if (element.projectList[index].status === 0) {
                                element.projectList[index].score = "未提交";
                            } else if (
                                element.projectList[index].status === 1
                            ) {
                                element.projectList[index].score = "未打分";
                            }
                            if (
                                element.projectList[index].status === undefined
                            ) {
                                element.projectList[index] = {
                                    score: "未选课",
                                    status: 4
                                };
                            }
                            element.projectList[
                                index
                            ].title = this.studentHeader[index].title;
                            // else if (element.projectList[index].status===2) {
                            //   element.projectList[index].score = '已打分'
                            // }
                            // element.projectList[index].score = element.projectList[index].score.toString()
                        }
                    });

                    this.studentHeader = this.studentHeader.splice(0, len);
                    // console.log(this.studentHeader);
                    this.tempData = temp;
                    var arr = [];
                    temp.forEach(element => {
                        arr.push(element);
                    });
                    this.tempData = arr;
                    this.tableData = temp.splice(
                        (this.currentPage - 1) * this.pageSize,
                        this.pageSize
                    );

                    // var arrr = []
                    // res.data.forEach(element => {
                    //   var li = {
                    //     studentID:element.studentID,
                    //     studentName:element.studentName
                    //   }
                    //   for (let index = 0; index < element.projectList.length; index++) {
                    //     let key = 'score'+index
                    //     li[key] = element.projectList[index].score
                    //   }
                    //   arrr.push(li)
                    // });
                    // console.log(arrr);
                    //   this.tableData = arrr
                    // this.tableData.projectList.sort((a,b)=>a.pos-b.pos);
                    // console.log(this.tableData);
                })

                .catch(err => {
                    console.log(err);
                });
        },
        download_excel() {
            //  window.location = "v2/teacher/getStudentInfoExcel"
            var url = this.url + "/teacher/getStudentInfoExcel";
            // console.log(url);
            window.location = url;
        },
        sortData() {
            console.log(this.tableData);
        },
        toDetail(id) {
            window.location.href = this.url + "/#" + id;
        },
        handleSizeChange(val) {
            this.pageSize = val;
            console.log(this.tempData);
            let temp = [];
            this.tempData.forEach(ele => {
                temp.push(ele);
            });
            this.tableData = temp.splice((this.currentPage - 1) * val, val);
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            let temp = [];
            this.tempData.forEach(ele => {
                temp.push(ele);
            });
            this.tableData = temp.splice(
                (this.currentPage - 1) * this.pageSize,
                this.pageSize
            );
        }
    }
};
</script>
<style lang="scss">
.student {
    width: 80%;
    .el-table th {
        background-color: #f5f5f5;
        color: #b4bfc6;
    }
    .tableOuter {
        white-space: nowrap;
    }
    .downLoad {
        display: flex;
        flex-direction: row-reverse;
        margin-top: -10px;
        margin-bottom: 10px;
    }
    .status {
        display: flex;
        align-items: center;
        letter-spacing: 0.5px;
        b {
            margin-right: 5px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }
    }
}
.submit {
    background-color: red;
}
.submited {
    background-color: #7fd81e;
}
.wait {
    background-color: #ffd048;
}
.finish {
    background-color: #e2e2e2;
}
.notScore {
    color: #b4bfc6;
}
.score {
    color: #2288ff;
    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
}

.scored {
    color: #4b5358;
    &:hover {
        cursor: pointer;
        text-decoration: underline;
    }
}
.page-separate {
    margin-top: 10px;
    position: relative;
    width: 80%;
    .pageination {
        width: 100%;
        position: absolute;
        display: flex;
        justify-content: space-between;
    }
}
</style>
