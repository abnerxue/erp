<template>
    <div>
    
      <p class="title"><i class="el-icon-tickets"></i>常孝通会员信息 <el-input
    placeholder="请输入姓名或手机号进行查找"
    prefix-icon="el-icon-search"
    v-model="input" style='float:right;width:30%;margin-bottom:.8rem;'>
  </el-input><br/>    <el-button type="primary" style='margin:0 0 0 1rem;' @click="dialogVisible = true">新增</el-button>  <el-button type="primary" style='margin:0 0 0 1rem;' @click="getlist">刷新</el-button></p>
      <el-dialog
  title="新增常孝通会员信息"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
 <el-form ref="form" :model="form" :rules='rules' label-width="100px">
  <el-form-item label="手机号" prop="tel">
    <el-input v-model="form.tel" ></el-input>
  </el-form-item>
  <el-form-item label="常孝通数量" prop="cxtn">
    <el-input v-model="form.cxtn" style="width: 60%;"></el-input>
  </el-form-item>
   <el-form-item label="购买日期" prop="date">
   <el-date-picker type="date" 
   placeholder="选择日期" 
   v-model="form.date"
   value-format="yyyy-MM-dd"
  
    ></el-date-picker>
  </el-form-item>
  <el-form-item label="解锁日期" prop="date1">
   <el-date-picker
    type="date"
    placeholder="选择日期" 
    v-model="form.date1"
    value-format="yyyy-MM-dd" 
   
    ></el-date-picker>
  </el-form-item>
 <!--  <el-form-item label="锁定期限">
    <el-input v-model="form.sdt" style="width: 60%;"></el-input>
  </el-form-item> -->
  <el-form-item label="释放比例" prop="sfrate">
    <el-input v-model="form.sfrate" style="width: 60%;"></el-input>
  </el-form-item>

  
  
 
 
  
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button  @click="dialogVisible = false">取消</el-button>
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
            width="50">
          </el-table-column>
        <el-table-column
          sortable
          prop="tel"
          label="手机号"
          width="290">
        </el-table-column>
        <el-table-column
          prop="lock"
          label="常孝通数量" width="290">
        </el-table-column>
        <el-table-column
          prop="stime"
          label="解锁日期"
          width="300">
        </el-table-column>
        
        <el-table-column
          prop="rate"
          label="释放比例" width="270">
        </el-table-column>
       
        
      </el-table>
    <el-pagination
      background
      page-size="20"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
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
      
           rules: {
          name: [
            { required: true, min: 1, max: 20, message: '请输入正确的姓名', trigger: 'blur'},
          
          ],
          tel: [
            { required: true,  min: 10, max: 11,message: '请输入正确的电话号码', trigger: 'change' },
             {
           pattern:/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/, message: '请输入正确的手机号' 
        }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          sfrate: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          cxtn: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
         form: {
           date:'',
         tel: '',
        cxtn: '',
        date1:'',
          sdt:'',
        sfrate: '',
          },
          pagen:1,
          currentPage: 1, //初始页
      pagesize: 20, //    每页的数据
      loading_status: false,
        dialogVisible: false,
      input:'',
      tableData: [],
       multipleSelection: []
    }
  },
    created(){
    this.getlist()
  },
  methods: {
     
      onSubmit() {
        let _this=this
        let a=new Date(this.form.date).getTime()
        console.log(a)
         let b=new Date(this.form.date1).getTime()
            console.log(b)
       if(a>b){
             this.$message({
          showClose: true,
          message: '解锁日期不能小于购买日期',
          type: "error"
        });
        return
       }
          let params = new URLSearchParams();
            params.append('rate', this.form.sfrate);
             params.append('lock', this.form.cxtn);
              params.append('tel', this.form.tel);
             params.append('ctime', this.form.date);
              params.append('stime', this.form.date1);
     
             console.log(params)
       this.list=[]
        //  _this.loading_status = true;
      this.$ajax.post('/cxt/manager/cxt/in', params).then(res => {
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
        this.getlist()
          this.$router.push({path:'/cxttable'})
          }

     
         
        
           
        });
        this.dialogVisible = false
        let k=this.form.date
        console.log(this.k)
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
      this.handleUserList(this.currentPage)
    },
    handleUserList(currentPage) {
     let params = new URLSearchParams();
            params.append('page', this.currentPage);
             params.append('size', 20);
      this.$ajax
        .post("/cxt/manager/cxt/out",  params)
        .then(res => {
          //这是从本地请求的数据接口，
         
          if(res.data.state==='015'){
             _this.$router.push('/login');
          }else{
            this.pagen=res.data.data.total
             console.log(res.data)
           this.tableData=res.data.data.list
          
            console.log( this.tableData)
           
          }
           
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
      this.$ajax.get('/cxt/manager/cxt/out', params).then(res => {
          if(res.data.state==='015'){
             _this.$router.push('/login');
          }else{
            this.pagen=res.data.data.total
             console.log(res.data)
           this.tableData=res.data.data.list
          
            console.log( this.tableData)
           
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
