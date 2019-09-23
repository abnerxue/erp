<template>
    <div>
      <p class="title"><i class="el-icon-tickets"></i>会员资产<el-input
    placeholder="请输入姓名或手机号进行查找"
    prefix-icon="el-icon-search"
    v-model="input" style='float:right;width:30%;margin:.1rem 0 .8rem 0;'>
  </el-input><br/>    
  <!-- <el-button type="primary" style='margin:0 0 0 1rem;' @click="dialogVisible = true">新增</el-button>  -->
   <el-button type="primary" style='margin:0 0 0 1rem;' @click="derive">导出</el-button> <el-button type="primary" style='margin:0 0 0 1rem;' @click="getlist">刷新</el-button></p>
      <el-dialog
  title="新增会员资产信息"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span></span>
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
      this.$ajax.get('/cxt/manager/logs', JSON.stringify(), {//就是这里，
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
