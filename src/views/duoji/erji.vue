<template>
  <div>
      <p class="title"><i class="el-icon-tickets"></i>常孝通会员信息 <el-input
    placeholder="请输入姓名或手机号进行查找"
    prefix-icon="el-icon-search"
    v-model="input21" style='float:right;width:30%;margin-bottom:.8rem;'>
  </el-input><br/>   <el-button type="primary" style='margin:0 0 0 1rem;' @click="derive">导出</el-button> <el-button type="primary" style='margin:0 0 0 1rem;' @click="getlist">刷新</el-button></p>
      <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          v-loading="loading_status"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
          </el-table-column>
        <el-table-column
          sortable
          prop="odd"
          width="155"
          label="登录用户名">
        </el-table-column>
        <el-table-column
          prop="date"
          label="操作时间"
          width="155"
          sortable
          :filters="[{text: '2018-01-01', value: '2018-01-01'}, {text: '2018-01-02', value: '2018-01-02'}, {text: '2018-01-03', value: '2018-01-03'}, {text: '2018-01-04', value: '2018-01-04'}, {text: '2018-01-05', value: '2018-01-05'}]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          width="155"
          label="操作ip">
        </el-table-column>
     
        <el-table-column
          prop="amount"
          label="日志详情">
        </el-table-column>
        
       
      </el-table>
     <el-pagination
  background
  layout="prev, pager, next"
  :total="tableData.length">
</el-pagination>
  </div>
</template>

<script>
export default {
  name: 'erji',
  data(){
      return {
        input21:'',
          tableData: [{
        odd: '201801012345601',
        name: '王小虎',
        status: '已付款',
        amount: '580元',
        date: '2018-01-01',
        tag: '虚拟'
      }, {
        odd: '201801012345602',
        name: '王小虎',
        status: '已付款',
        amount: '130元',
        date: '2018-01-02',
        tag: '实物'
      }, {
        odd: '201801012345603',
        name: '王小虎',
        status: '已付款',
        amount: '680元',
        date: '2018-01-03',
        tag: '虚拟'
      }, {
        odd: '201801012345604',
        name: '王小虎',
        status: '已付款',
        amount: '190元',
        date: '2018-01-03',
        tag: '虚拟'
      }, {
        odd: '201801012345605',
        name: '王小虎',
        status: '已付款',
        amount: '170元',
        date: '2018-01-04',
        tag: '实物'
      }, {
        odd: '201801012345606',
        name: '王小虎',
        status: '已付款',
        amount: '670元',
        date: '2018-01-04',
        tag: '虚拟'
      }, {
        odd: '201801012345607',
        name: '王小虎',
        status: '已付款',
        amount: '1780元',
        date: '2018-01-04',
        tag: '实物'
      }, {
        odd: '201801012345608',
        name: '王小虎',
        status: '已付款',
        amount: '3180元',
        date: '2018-01-04',
        tag: '虚拟'
      }, {
        odd: '201801012345609',
        name: '王小虎',
        status: '已付款',
        amount: '780元',
        date: '2018-01-05',
        tag: '实物'
      }, {
        odd: '201801012345610',
        name: '王小虎',
        status: '已付款',
        amount: '2130元',
        date: '2018-01-05',
        tag: '虚拟'
      }],
      loading_status:false,
       multipleSelection: []
      }
  },
  created(){
    this.getlist()
  },
   methods: {
     derive(){
             this.$ajax.get('/manager/users/excel', JSON.stringify(), {//就是这里，
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

            this.tableData=res.data.data.list;
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
