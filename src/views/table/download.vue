<template>
    <div>
      <p class="title"><i class="el-icon-tickets"></i>
      app启动信息列表   <el-button type="primary" @click='derive' style='margin:0 10px 0px 0;'>导出表格</el-button>
       <el-button type="primary" @click='getlist' style='float:right;margin-right:20%;'>查询</el-button> <el-date-picker
       style='float:right;margin-bottom:10px;'
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker> 
   <br/>    
   
    <!-- <el-button type="primary" style='margin:0 0 0 1rem;' @click="dialogVisible = true">新增</el-button>  -->
     <!-- <el-button type="primary" style='margin:0 0 0 1rem;' @click="getlist">刷新</el-button> -->
     </p>
      <el-dialog
  title="app启动信息列表"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
 
 <el-form ref="form" :model="form" :rules='rules' label-width="140px">
  <el-form-item  label="渠道标识" prop="tel">
    <el-input v-model="form.tel"></el-input>
  </el-form-item>
  <el-form-item label="渠道广告位" prop="cardn">
    <el-input v-model="form.cardn" style="width: 60%;"></el-input>
  </el-form-item>
  <el-form-item label="手机唯一标识" prop="date1">
   <el-date-picker type="date" 
    placeholder="选择日期" 
   v-model="form.date1" 
   value-format="yyyy-MM-dd"
   style="width: 100%;"></el-date-picker>
  </el-form-item>
  <el-form-item label="可买常孝通日期" prop="date2">
   <el-date-picker type="date" 
   placeholder="选择日期" 
   v-model="form.date2" 
   value-format="yyyy-MM-dd"
   style="width: 100%;"></el-date-picker>
  </el-form-item>
  <el-form-item label="金额" prop="money">
    <el-input v-model="form.money" style="width: 60%;"></el-input>
    
  </el-form-item>
  <el-form-item label="有效期" prop="yxq">
    
    <el-date-picker type="date" 
   placeholder="选择日期" 
   v-model="form.yxq" 
   value-format="yyyy-MM-dd"
   style="width: 100%;"></el-date-picker>
  </el-form-item>
  <el-form-item label="积分额度">
   
    <el-select v-model="form.jfed" placeholder="输入积分额度">
      <el-option label="" value="2"></el-option>
      <el-option label="" value="3"></el-option>
       <el-option label="" value="4"></el-option>
    </el-select>
  </el-form-item>
  
  
 
 
  
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button @click="dialogVisible = false">取消</el-button>
  </el-form-item>
</el-form>
  
</el-dialog>
      
      
      
       <el-table
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
         
           align="center"
          width="110"
          prop="id"
          label="ID">
        </el-table-column>
        <el-table-column
         
         align="center"
          prop="channel"
          label="渠道">
        </el-table-column>
        <el-table-column
      
          prop="advLocation"
           align="center"
          label="广告位"
          >
        </el-table-column>
        <el-table-column
       
         align="center"
          prop="downTimes"
          label="下载次数">
        </el-table-column>
         <el-table-column
          prop="postTime"
       
           align="center"
          label="首次下载时间">
        </el-table-column>
        
         <!-- <el-table-column
          prop="score"
          label="积分额度">
        </el-table-column> -->
       <!--  <el-table-column
          prop="date"
          label="下单时间"
          sortable
          :filters="[{text: '2018-01-01', value: '2018-01-01'}, {text: '2018-01-02', value: '2018-01-02'}, {text: '2018-01-03', value: '2018-01-03'}, {text: '2018-01-04', value: '2018-01-04'}, {text: '2018-01-05', value: '2018-01-05'}]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="tag"
          label="订单分类"
          width="150"
          :filters="[{ text: '虚拟', value: '虚拟' }, { text: '实物', value: '实物' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '虚拟' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.tag}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">详情</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
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
         tel: '',
          cardn: '',
          date1: '',
          date2: '',
          money: '',
          
          yxq: '',
          jfed: ''
        },
         rules: {
          tel: [
            { required: true,min: 10, max: 11, message: '请输入正确的手机号', trigger: 'blur' },
             {
           pattern:/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/, message: '请输入正确的手机号' 
        }
           
          ],
          cardn: [
            { type: '', required: true, message: '', trigger: 'change' }
          ],
          date1: [
            {  type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            {  type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          money: [
            {   type:'' ,required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          yxq: [
            {   type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          jfed: [
            { required: true, message: '请选择等级', trigger: 'blur' }
          ]
        },
        pagen:1,
         currentPage: 1, //初始页
      pagesize: 20, //    每页的数据
       loading_status: false,
        dialogVisible: false,
      input:'',
      tableData: [{}],
       multipleSelection: []
    }
  },
    created(){
    this.getlist()
  },
  methods: {
   onSubmit(){},
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
        .post('/club/appdown/info',  params)
        .then(res => {
         if(res.data[0]=='请重新登陆！'){
             _this.$router.push('/login');
          }else{
            this.pagen=res.data[0].total
               console.log(this.pagen)
             this.tableData=res.data[1]
           
          }
        });
    },
    derive(){
        this.getlist()
       window.location = "/club/user/excel?userName="+localStorage.getItem('token')
        //  this.$ajax
        // .get("/cxt/manager/users/excel", JSON.stringify(), {
        //   //就是这里，
        //   // headers: _this.Base.initAjaxHeader(1, data)
        // })
        // .then(res => {
        //   //  this.t=res.data.data.list

        //   console.log("导出");
        // });
      //  let _this=this
      //     let params = new URLSearchParams();
         
      //      params.append('userName',localStorage.getItem('token'))
      //        this.$ajax.post('/club/user/excel', params).then(res => {
      //     if(res.data[0]=='请重新登陆！'){
      //        _this.$router.push('/login');
      //     }
      //   //  this.t=res.data.data.list 
     
      //    console.log( '导出')
        
           
      //   });
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
      this.$ajax.post('/club/appdown/info', params).then(res => {
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
            //   params.append('before', this.value1[0]);
            //  params.append('now',this.value1[1]);
     
   
       this.list=[]
         _this.loading_status = true;
      this.$ajax.post('/club/appdown/info', params).then(res => {
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
     
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
  
    //  derive(){
    //          this.$ajax.get('/cxt/manager/users/excel', JSON.stringify(), {//就是这里，
    //       // headers: _this.Base.initAjaxHeader(1, data)
    //     }).then(res => {
    //     //  this.t=res.data.data.list 
     
    //      console.log( '导出')
        
           
    //     });
    //  },
 
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
