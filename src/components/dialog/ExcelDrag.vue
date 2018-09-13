<template>
    <div>
        <el-dialog title="导入excel" :visible.sync="dialogFormVisible" :show="show" @close="$emit('update:show',false)">
        <el-upload
            class="upload-demo"
            drag
            :on-success="success"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
        </el-dialog>
    </div>
</template>



<script>
  export default {
    data() {
      return {
        dialogFormVisible: this.show,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px'
      };
    },
    props:{
        show:{
            type:Boolean,
            default:false
        }
    },
    watch:{
        show(){
            this.dialogFormVisible = this.show
        }
    },
    methods:{
        success:function(response, file, fileList){
            console.log(response,file,file)
        }
    }
  };
</script>