<template>
    <div class="student">
        <div class="newSection">
            <el-button @click="showNewSection()">新建章节</el-button>
        </div>
        <el-table :data="tableData" stripe ali style="width: 100%">
            <el-table-column fixed prop="projectSection" label="章节名称" align="center" width="80">
            </el-table-column>
            <el-table-column prop="address" label="平均分" align="center" width="200">
            </el-table-column>
            <el-table-column prop="name" label="发布状态" align="center" width="200">
            </el-table-column>
            <el-table-column prop="date" label="截止日期" align="center" width="200">
                <template slot-scope="scope">
                    <p class="updateDate" @click="showSetDate(scope.$index)">{{scope.row.date}}</p>
                    <el-button v-show="!scope.row.date" @click="showSetDate(scope.$index)">设置截止时间</el-button>
                    <p></p>
                </template>
            </el-table-column>
            <el-table-column align="center">
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="150">
                <template slot-scope="scope">
                    <el-button @click="commentDetail()" type="text" size="small">发布</el-button>
                    <el-button @click="commentDetail(scope.$index,scope.row)" type="text" size="small">评分规则</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <el-button type="text" @click="importExcel()">导入表格</el-button>
    <excel-drag ref="excel" :show.sync="dialogVisible"></excel-drag> -->
        <!-- 评分规则弹出框 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
            <div class="tagList">
                <div class="tags" v-for="(list,index) in form.projectDetail" :key="index" @click="del(index)">
                    <p @click.stop="update(index)">
                        {{list}}
                    </p>
                </div>
            </div>
            <div class="addOrEdit">
                <el-input placeholder="请添加或修改评分细则" v-model="newVal">
                    <template slot="append">
                        <span class="add" @click="newRuleOrUpdate()">{{addOrEdit}}</span>
                    </template>
                </el-input>
            </div>

            <!-- <p class="newRule" @click="newRule()">继续添加新规则</p> -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 新建弹出框 -->
        <el-dialog title="新建章节" :visible.sync="newSectionVisible">
            <div class="addOrEdit">
                <el-input placeholder="请输入章节名称" v-model="newSectionList.address">
                    <template slot="prepend">
                        <span class="add">章节名称</span>
                    </template>
                </el-input>
            </div>
            <!-- <p class="newRule" @click="newRule()">继续添加新规则</p> -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="newSectionVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitSection()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="设置截止日期" :visible.sync="newDateVisible">
            <div class="block newDate">
                <span class="demonstration">请选择日期</span>
                <el-date-picker v-model="newDateStr" type="date" placeholder="选择日期" value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>
            <!-- <p class="newRule" @click="newRule()">继续添加新规则</p> -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="newDateVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitDate()">确 定</el-button>
            </div>
        </el-dialog>
    <!-- 分页 -->
         <div class="page-separate">
            <el-pagination class="pageination" background :current-page="currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-size="pageSize" :page-sizes="pageSizes" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import excelDrag from "../components/dialog/ExcelDrag";
export default {
    name: "home",
    data() {
        return {
            tableData: [
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    province: "上海",
                    city: "普陀区",
                    address: "上海市普陀区金沙江路 1518 弄",
                    zip: 200333
                },
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    province: "上海",
                    city: "普陀区",
                    address: "上海市普陀区金沙江路 1518 弄",
                    zip: 200333
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    province: "上海",
                    city: "普陀区",
                    address: "上海市普陀区金沙江路 1518 弄",
                    zip: 200333
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    province: "上海",
                    city: "普陀区",
                    address: "上海市普陀区金沙江路 1518 弄",
                    zip: 200333
                },
                {
                    date: "",
                    name: "王小虎",
                    province: "上海",
                    city: "普陀区",
                    address: "上海市普陀区金沙江路 1518 弄",
                    zip: 200333
                }
            ],
            excelTitle: [
                "配件申请单号",
                "服务单",
                "申请类型",
                "需求日期",
                "收货人",
                "收货人电话",
                "审核状态"
            ],
            newVal: "",
            addOrEdit: "添加",
            formLabelWidth: "100px",
            index: null,
            type: null,
            updateIndex: null,
            dialogTitle: "请规定评分细则",
            dialogVisible: false,
            newSectionVisible: false,
            newDateVisible: false,
            newDateStr: "",
            newSectionList: {},
            sectionId:'',
            form: {
                sectionId: "",
                // teacherId: "",
                projectDetail: ["111", "2222"]
            },
            user:{},
             pageSize: 5,
            pageSizes: [5, 10, 15, 20, 25],
            currentPage: 1,
        };
    },
    created() {
        this.init();
    },
    methods: {
        importExcel() {
            this.dialogVisible = true;
        },
        init: function() {
            this.loadData();
        },
        loadData() {
            let user = sessionStorage.getItem("user");
            this.user = JSON.parse(user);
            let courseName = 'AI初探'
            let url  = this.url + `/teacher/getAllProjectSectionByCourseName?courseName=${courseName}`
            this.axios.get(url).then(res=>{
                console.log(res.data)
                this.tableData = res.data.projectSectionList
            })
        },
        exportExcel() {
            this.jorce.exportExcel(
                "配件申请单",
                this.tableData,
                this.excelTitle
            );
        },
        submit() {
            let url = this.url + "/teacher/addScoreDetail";

            this.form.sectionId = this.sectionId
            // let params = this.jorce.convertObjToParams(this.form);
            let params = this.form;
            this.axios
                .post(url, params)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
            this.dialogVisible = false;
        },
        commentDetail(index,obj) {
            this.dialogVisible = true;
            let params = {
                // teacherId: this.user.userid,
                sectionId: "1001IAD1110"
            };
            let teacherId = '25'
            let sectionId = obj.sectionId
            this.sectionId = sectionId
            let url = this.url + `/teacher/getScoreDetail?sectionId=${sectionId}`
            // let url = this.url + `/teacher/getScoreDetail?teacherId=${teacherId}&sectionId=${sectionId}`
            this.axios.get(url).then(res => {
                this.form = res.data
            });
        },
        newRuleOrUpdate() {
            if (!this.newVal) {
                this.$message({
                    type: "error",
                    message: "请输入细则"
                });
                return;
            }
            if (this.addOrEdit === "修改") {
                this.form.projectDetail[this.updateIndex] = this.newVal;
                this.addOrEdit = "添加";
                this.$message({
                    type: "success",
                    message: "修改成功"
                });
            } else if (this.addOrEdit === "添加") {
                this.form.projectDetail.push(this.newVal);
                this.$message({
                    type: "success",
                    message: "添加成功"
                });
            }
            this.newVal = "";
        },
        del(index) {
            this.$confirm("确定删除此条吗?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.form.projectDetail.splice(index, 1);
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        update(index) {
            this.newVal = this.form.projectDetail[index];
            this.updateIndex = index;
            this.addOrEdit = "修改";
        },
        showNewSection() {
            this.newSectionVisible = true;
        },
        submitSection() {
            this.tableData.push(this.newSectionList);
            this.newSectionVisible = false;
            this.init();
        },
        showSetDate(index) {
            this.updateIndex = index;
            this.newDateVisible = true;
        },
        submitDate() {
            this.tableData[this.updateIndex].date = this.newDateStr;

            this.newDateVisible = false;
            this.init();
        },
        handleSizeChange(val) {
            // this.pageSize = val;
            // console.log(this.tempData);
            // let temp = [];
            // this.tempData.forEach(ele => {
            //     temp.push(ele);
            // });
            // this.tableData = temp.splice((this.currentPage - 1) * val, val);
            // console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            // this.currentPage = val;
            // let temp = [];
            // this.tempData.forEach(ele => {
            //     temp.push(ele);
            // });
            // this.tableData = temp.splice(
            //     (this.currentPage - 1) * this.pageSize,
            //     this.pageSize
            // );
        }
    },
    components: {
        excelDrag
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
.newRule {
    color: #ccc;
    text-align: right;
    &:hover {
        color: #7fd81e;
        cursor: pointer;
    }
}
.add {
    cursor: pointer;
}
.tagList {
    width: 80%;
    display: flex;
    margin: 0 auto;
    flex-wrap: wrap;
    .tags {
        border: 1px solid #ccc;
        margin-bottom: 10px;
        margin-right: 20px;
        p {
            // width: 60px;
            display: inline-block;
            padding: 15px 20px;
            text-align: center;
            // height: 40px;
            // line-height: 40px;
            &:hover {
                text-decoration: underline;
                cursor: pointer;
                color: #000;
            }
        }
        &:after {
            content: "\2716";
            position: relative;
            right: 5px;
            top: -15px;
            opacity: 0.4;
            font-size: 10px;
            cursor: pointer;
        }
        &:hover {
            color: red;
            p {
                color: #000;
            }
        }
    }
    margin-bottom: 80px;
}
.addOrEdit {
    width: 80%;
    margin: 0 auto;
}
.newSection {
    display: flex;
    flex-direction: row-reverse;
}
.newDate {
    display: flex;
    justify-content: center;

    span {
        margin-right: 20px;
        line-height: 40px;
        display: inline-block;
        text-align: center;
    }
}
.updateDate {
    &:hover {
        cursor: pointer;
        color: red;
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
