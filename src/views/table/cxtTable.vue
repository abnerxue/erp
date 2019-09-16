<template>
    <div>
    
      <p class="title"><i class="el-icon-tickets"></i>常孝通会员信息 <el-input
    placeholder="请输入姓名或手机号进行查找"
    prefix-icon="el-icon-search"
    v-model="input" style='float:right;width:30%;margin-bottom:.8rem;'>
  </el-input><br/>    <el-button type="primary" style='margin:0 0 0 1rem;' @click="dialogVisible = true">新增</el-button> <el-button type="primary" style='margin:0 0 0 1rem;' @click="derive">导出</el-button> <el-button type="primary" style='margin:0 0 0 1rem;' @click="getlist">刷新</el-button></p>
      <el-dialog
  title="新增常孝通会员信息"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
 <el-form ref="form" :model="form" label-width="100px">
  <el-form-item label="手机号">
    <el-input v-model="form.tel"></el-input>
  </el-form-item>
  <el-form-item label="常孝通数量">
    <el-input v-model="form.cxtn" style="width: 60%;"></el-input>
  </el-form-item>
  <el-form-item label="解锁日期">
   <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
  </el-form-item>
  <el-form-item label="锁定期限">
    <el-input v-model="form.sdt" style="width: 60%;"></el-input>
  </el-form-item>
  <el-form-item label="释放比例">
    <el-input v-model="form.sdt" style="width: 60%;"></el-input>
  </el-form-item>

  
  
 
 
  
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
      
      <el-table
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
          prop="odd"
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="收货人">
        </el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          width="130">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="金额">
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
         tel: '',
        cxtn: '',
        data1:'',
          jsdate: '',
        sfrate: '',
          },
        dialogVisible: false,
      input:'',
      tableData: [{

      }],
       multipleSelection: []
    }
  },
    created(){
    this.getlist()
  },
  methods: {
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
      let data = {
        page:1,
        size:20
      };
   
      let _this = this;
       this.list=[]
         _this.loading_status = true;
      this.$ajax.get('/cxt/manager/users/json', JSON.stringify(), {//就是这里，
          // headers: _this.Base.initAjaxHeader(1, data)
        }).then(res => {
          if(res.data.state==='015'){
            // _this.$router.push('/login');
          }else{

            // this.tableData=res.data.data.list;
          }

     
         console.log( this.list)
        
           
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
