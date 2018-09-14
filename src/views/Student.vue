<template>
  <div class="student">
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
    <div class="downLoad">
      <el-button type="plian" class="" @click="download_excel">表格下载</el-button>
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
            mockData: [
                {
                    studentID: "embark003",
                    studentName: "王欣",
                    projectList: [
                        {
                            projectId: 4538783999459328,
                            projectName: "IAD_1_150_Camera",
                            projectSection: "",
                            pos: 4,
                            score: -1,
                            status: 0
                        },
                        {
                            projectId: 4996180836614144,
                            projectName: "IAD_1_110",
                            projectSection: "",
                            pos: 0,
                            score: -1,
                            status: 0
                        },
                        {
                            projectId: 5101733952880640,
                            projectName: "IAD_1_210_documents",
                            projectSection: "",
                            pos: 6,
                            score: -1,
                            status: 0
                        },
                        {
                            projectId: 5559130790035456,
                            projectName: "IAD_1_130_FirstApp",
                            projectSection: "",
                            pos: 2,
                            score: -1,
                            status: 0
                        },
                        {
                            projectId: 5664683906301952,
                            projectName: "IAD_1_Milestone1",
                            projectSection: "",
                            pos: 5,
                            score: -1,
                            status: 0
                        },
                        {
                            projectId: 6122080743456768,
                            projectName: "IAD_1_120",
                            projectSection: "",
                            pos: 1,
                            score: -1,
                            status: 0
                        }
                    ]
                },
                {
                    studentID: "embark002",
                    studentName: "马晓东",
                    projectList: [
                        {
                            projectId: 4573968371548160,
                            projectName: "IAD_1_210_documents",
                            projectSection: "",
                            pos: 6,
                            score: -1,
                            status: 0
                        },
                        {
                            projectId: 4925812092436480,
                            projectName: "IAD_1_130_FirstApp",
                            projectSection: "",
                            pos: 2,
                            score: -1,
                            status: 0
                        },
                        {
                            projectId: 5207287069147136,
                            projectName: "IAD_1_110",
                            projectSection: "",
                            pos: 0,
                            score: -1,
                            status: 0
                        },
                        {
                            projectId: 5488762045857792,
                            projectName: "IAD_1_150_Camera",
                            projectSection: "",
                            pos: 4,
                            score: -1,
                            status: 0
                        },
                        {
                            projectId: 5699868278390784,
                            projectName: "IAD_1_210_notepad",
                            projectSection: "",
                            pos: 7,
                            score: -1,
                            status: 0
                        },
                        {
                            projectId: 6051711999279104,
                            projectName: "IAD_1_140_Drawing",
                            projectSection: "",
                            pos: 3,
                            score: -1,
                            status: 0
                        },
                        {
                            projectId: 6333186975989760,
                            projectName: "IAD_1_120",
                            projectSection: "",
                            pos: 1,
                            score: -1,
                            status: 0
                        },
                        {
                            projectId: 6614661952700416,
                            projectName: "IAD_1_Milestone1",
                            projectSection: "",
                            pos: 5,
                            score: -1,
                            status: 0
                        }
                    ]
                },
                {
                    studentID: "embark001",
                    studentName: "方小达",
                    projectList: [
                        {
                            projectId: 4644337115725824,
                            projectName: "IAD_1_210_notepad",
                            projectSection: "",
                            pos: 7,
                            score: -1,
                            status: 0
                        },
                        {
                            projectId: 4785074604081152,
                            projectName: "IAD_1_140_Drawing",
                            projectSection: "",
                            pos: 3,
                            score: -1,
                            status: 0
                        },
                        {
                            projectId: 5066549580791808,
                            projectName: "IAD_1_120",
                            projectSection: "",
                            pos: 1,
                            score: -1,
                            status: 0
                        },
                        {
                            projectId: 5348024557502464,
                            projectName: "IAD_1_Milestone1",
                            projectSection: "",
                            pos: 5,
                            score: -1,
                            status: 0
                        },
                        {
                            projectId: 5629499534213120,
                            projectName: "IAD_1_110",
                            projectSection: "",
                            pos: 0,
                            score: -1,
                            status: 0
                        },
                        {
                            projectId: 5910974510923776,
                            projectName: "IAD_1_150_Camera",
                            projectSection: "",
                            pos: 4,
                            score: -1,
                            status: 0
                        },
                        {
                            projectId: 6192449487634432,
                            projectName: "IAD_1_130_FirstApp",
                            projectSection: "",
                            pos: 2,
                            score: -1,
                            status: 0
                        },
                        {
                            projectId: 6473924464345088,
                            projectName: "IAD_1_210_documents",
                            projectSection: "",
                            pos: 6,
                            score: -1,
                            status: 0
                        }
                    ]
                }
            ],
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
                    this.tableData = temp;

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
        margin-top: 20px;
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
</style>
