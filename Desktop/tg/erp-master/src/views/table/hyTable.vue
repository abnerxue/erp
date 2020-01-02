<template>
    <div>
    
      <p class="title"><i class="el-icon-tickets"></i>用户信息列表   <el-button type="primary" @click='derive' style='margin:0 10px 0px 0;'>导出表格</el-button>
      <el-button type="primary" @click='getlist' style='float:right;margin-right:20%;'>查询</el-button>
     <el-date-picker
       style='float:right;margin:0 13px 10px 0;'
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  <br/> 
   <el-input v-model="search" placeholder="请输入手机号" style="width:300px;margin:15px 10px 10px 0;"></el-input> <el-button type="primary" style='' @click="search">搜索</el-button>   
  <!-- <el-button type="primary" style='margin:0 0 0 1rem;' @click="dialogVisible = true">新增</el-button> 
   <el-button type="primary" style='margin:0 0 0 1rem;' @click="getlist">刷新</el-button> -->
   </p>
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
         align="center"
       
          prop="uid"
          label="用户ID">
        </el-table-column>
        <el-table-column
         align="center"
          prop="mobile"
          label="手机号"
           width="130">
        </el-table-column>
        <el-table-column
         align="center"
          prop="levelname"
          label="性别"
          width="130">
        </el-table-column>
       
        
       <el-table-column
        align="center"
          prop="regTime"
          label="注册时间">
        </el-table-column>
        <el-table-column
         align="center"
          prop="lastIP"
          label="最后登录IP">
        </el-table-column>
        <el-table-column
         align="center"
          prop="loginTimes"
          label="登录次数">
        </el-table-column>
        <el-table-column
         align="center"
          prop="score"
          label="积分">
        </el-table-column>
        
      </el-table>
      <el-pagination
      background
      page-size='20'
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev, pager, next"
      :total='this.pagen'
    ></el-pagination>
    </div>
</template>

<script>
export default {
  name: 'maintable',
  data () {
    return {
      search:'',
              pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: '',
        value2: '',
 
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
       params.append('userName',localStorage.getItem('token'))
      this.$ajax
        .post('/club/user/info',  params)
        .then(res => {
          //这是从本地请求的数据接口，
          if(res.data[0]=='请重新登陆！'){
             _this.$router.push('/login');
          }
         this.pagen=res.data[0].total
               console.log(this.pagen)
             this.tableData=res.data[1]
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
       this.getlist()
       window.location = "/club/user/excel?userName="+localStorage.getItem('token')
      
        //   this.$ajax
        // .get('/club/user/excel?userName='+localStorage.getItem('token'), JSON.stringify(), {
        //   //就是这里，
        //   // headers: _this.Base.initAjaxHeader(1, data)
        // })
        // .then(res => {
        //   //  this.t=res.data.data.list

        //   console.log("导出");
        // });
    //  let _this=this
    //       let params = new URLSearchParams();
         
    //        params.append('userName',localStorage.getItem('token'))
    //          his.$ajax.get('/club/user/excel?userName='+localStorage.getItem('token')).then(res => {
    //       if(res.data[0]=='请重新登陆！'){
    //          _this.$router.push('/login');
    //       }
    //     //  this.t=res.data.data.list 
     
    //      console.log( '导出')
        
           
    //     });
     },
      search(){
        let _this=this
          let params = new URLSearchParams();
          params.append('page',1)
           params.append('mobile',this.search)
           params.append('userName',localStorage.getItem('token'))
            //  params.append('before', this.value1[0]);
            //  params.append('now',this.value1[1]);
     
   
       this.list=[]
         _this.loading_status = true;
      this.$ajax.post('/club/user/info', params).then(res => {
          if(res.data[0]=='请重新登陆！'){
             _this.$router.push('/login');
          }else{
             this.pagen=res.data[0].total
               console.log(this.pagen)
             this.tableData=res.data[1]
          }

     
         
        
           
        });
        setTimeout(()=>{
          _this.loading_status = false;
        },500)
    },
       getlist(){
        let _this=this
          let params = new URLSearchParams();
          params.append('page',1)
           params.append('userName',localStorage.getItem('token'))
            //  params.append('before', this.value1[0]);
            //  params.append('now',this.value1[1]);
     
   
       this.list=[]
         _this.loading_status = true;
      this.$ajax.post('/club/user/info', params).then(res => {
          if(res.data[0]=='请重新登陆！'){
             _this.$router.push('/login');
          }else{
             this.pagen=res.data[0].total
               console.log(this.pagen)
             this.tableData=res.data[1]
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
.title{font-size:18px;}
</style>
