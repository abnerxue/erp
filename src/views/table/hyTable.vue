<template>
    <div>
    
      <p class="title"><i class="el-icon-tickets"></i>会员信息录入 <el-input
    placeholder="请输入姓名或手机号进行查找"
    prefix-icon="el-icon-search"
    v-model="input" style='float:right;width:30%;margin-bottom:.8rem;'>
  </el-input><br/>    <el-button type="primary" style='margin:0 0 0 1rem;' @click="dialogVisible = true">新增</el-button>  <el-button type="primary" style='margin:0 0 0 1rem;' @click="getlist">刷新</el-button></p>
      <el-dialog
  title="新增会员信息"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
 <el-form ref="form" :model="form" 
        :rules='rules' label-width="100px">
     <el-form-item label="姓名" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="手机号" prop="tel">
    <el-input v-model="form.tel"></el-input>
  </el-form-item>
  <el-form-item label="上级手机号">
    <el-input v-model="form.tel1"></el-input>
  </el-form-item>
  <el-form-item label="推荐人手机号">
    <el-input v-model="form.tel2"></el-input>
  </el-form-item>
   <el-form-item label="级别">
    <el-select v-model="form.region" placeholder="请选择级别">
      <el-option label="康养顾问" value="shanghai"></el-option>
      <el-option label="业务经理" value="beijing"></el-option>
      <el-option label="区域经理" value="shanghai"></el-option>
      <el-option label="总经理" value="beijing"></el-option>
       <el-option label="员工" value="beijing"></el-option>
    </el-select>
  </el-form-item>

  
  
 
 
  
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button @click="dialogVisible = false">取消</el-button>
  </el-form-item>
</el-form>
 
</el-dialog>
      
      <el-table
          v-loading="loading_status"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
          </el-table-column>
        <el-table-column
          sortable
          prop="username"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="levelname"
          label="级别"
          width="130">
        </el-table-column>
        <el-table-column
          prop="ptel"
          label="上级手机号">
        </el-table-column>
        
       <el-table-column
          prop="rtel"
          label="推荐人手机号">
        </el-table-column>
        
      </el-table>
        <el-pagination
  background
  layout="prev, pager, next"
  :total="1">
</el-pagination>
    </div>
</template>

<script>
export default {
  name: 'maintable',
  data () {
    return {
         form: {
             region:'',
         tel: "",
       tel1: "",
       tel2:"",
         name: '',
       
          },
           rules: {
          name: [
            { required: true, trigger: 'blur' },
             {  }
          ],
          tel: [
            { type: 'number', required: true,  trigger: 'change' },
            {
           pattern:/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/, message: '请输入正确的手机号' 
        }
          ],
          tel1: [
            { type:'number', required: true,min: 10, max: 11, message: '请输入正确的手机号', trigger: 'change' },
             {
           pattern:/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/, message: '请输入正确的手机号' 
        }
          ],
          tel2: [
            { type: 'number', required: true,min: 10, max: 11, message: '请输入正确的手机号', trigger: 'change' },
             {
           pattern:/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/, message: '请输入正确的手机号' 
        }
          ],
          region: [
            { type: '', required: true, trigger: 'change' }
          ],
         
        },
        dialogVisible: false,
      input:'',
      pagen:1,
         currentPage: 1, //初始页
      pagesize: 20, //    每页的数据
      loading_status: false,
      tableData: [{

      }],
       multipleSelection: []
    }
  },
    created(){
    this.getlist()
  },
  methods: {
     onSubmit() {
         let _this=this
          let params = new URLSearchParams();
            params.append('nick', this.form.name);
             params.append('tel', this.form.tel);
              params.append('rtel', this.form.tel2);
             params.append('uptel', this.form.tel1);
              params.append('level', this.form.region);
     
             console.log(params)
      
     
      this.$ajax.post('/cxt/manager/user/info', params).then(res => {
          if(res.data.state==='015'){
             _this.$router.push('/login');
          }else if(res.data.state!=='000'){
                this.$message({
          showClose: true,
          message: res.data.msg,
          type: "error"
        });
              
          }else if(res.data.state==='000'){
             this.$message({
          showClose: true,
          message: res.data.msg,
          type: "success"
        });
          this.$router.push({path:'/hytable'})
           this.getlist()
          }

     
         
        
           
        });
            // _this.loading_status = true;
           
        this.dialogVisible = false
        console.log('submit!');
      },
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
      this.handleUserList()
    },
    handleUserList(currentPage) {
     let params = new URLSearchParams();
            params.append('page', this.currentPage);
             params.append('size', 20);
      this.$ajax
        .post("/cxt/manager/users/relation",  params)
        .then(res => {
          //这是从本地请求的数据接口，
         
         
          this.pagen=res.data.data.total
                console.log(this.pagen)
                
            this.tableData=res.data.data.list;
            console.log(this.tableData)
        });
    },
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //555
     derive(){
             this.$ajax.get('/cxt/manager/users/excel', JSON.stringify(), {//就是这里，
          // headers: _this.Base.initAjaxHeader(1, data)
        }).then(res => {
        //  this.t=res.data.data.list 
     
         console.log( '导出')
        
           
        });
     },
       getlist(){
        let _this=this
          let params = new URLSearchParams();
            params.append('page', 1);
             params.append('size', 20);
     
   
       this.list=[]
         _this.loading_status = true;
      this.$ajax.get('/cxt/manager/users/relation', params).then(res => {
          if(res.data.state==='015'){
             _this.$router.push('/login');
          }else{
                
               this.pagen=res.data.data.total
                console.log(this.pagen)
            this.tableData=res.data.data.list
            console.log(this.tableData)
          }

     
         
        
           
        });
        setTimeout(()=>{
          _this.loading_status = false;
        },500)
    },
      toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    handleEdit (index, row) {
      console.log(index, row)
      this.$message({
        showClose: true,
        message: index, row,
        type: 'success'
      })
    },
    handleDelete (index, row) {
      console.log(index, row)
      this.$message({
        showClose: true,
        message: index, row,
        type: 'success'
      })
    },
    formatter (row, column) {
      return row.address
    },
    filterTag (value, row) {
      return row.tag === value
    },
    filterHandler (value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
</script>

<style scoped>

</style>
