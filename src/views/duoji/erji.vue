<template>
  <div>
    <p class="title">
      <i class="el-icon-tickets"></i>常孝通会员信息
      <el-input
        placeholder="请输入姓名或手机号进行查找"
        prefix-icon="el-icon-search"
        v-model="input21"
        style="float:right;width:30%;margin-bottom:.8rem;"
      ></el-input>
      <br />
      <el-button type="primary" style="margin:0 0 0 1rem;" @click="derive">导出</el-button>
      <el-button type="primary" style="margin:0 0 0 1rem;" @click="getlist">刷新</el-button>
    </p>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      v-loading="loading_status"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column sortable prop="id" width="155" label="登录用户名"></el-table-column>
     
      <!-- <el-table-column
        prop="date"
        label="操作时间"
        width="155"
        sortable
        :filters="[{text: '2018-01-01', value: '2018-01-01'}, {text: '2018-01-02', value: '2018-01-02'}, {text: '2018-01-03', value: '2018-01-03'}, {text: '2018-01-04', value: '2018-01-04'}, {text: '2018-01-05', value: '2018-01-05'}]"
        :filter-method="filterHandler"
      ></el-table-column> -->
      <el-table-column
        prop="ctime"
        label="操作时间"
        width="255"
        sortable
        
      ></el-table-column>
      <el-table-column prop="ip" width="155" label="操作ip"></el-table-column>

      <el-table-column prop="des" label="日志详情"></el-table-column>
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
  name: "erji",
  data() {
    return {
      pagen:1,
      input21: "",
      tableData: [],
      currentPage: 1, //初始页
      pagesize: 20, //    每页的数据
      loading_status: false,
      multipleSelection: []
    };
  },
  created() {
    this.getlist();
  },
  methods: {
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
        .post("/cxt/manager/logs",  params)
        .then(res => {
          //这是从本地请求的数据接口，
         this.pagen=res.data.data.total
          this.tableData = res.data.data.list;
        });
    },
    derive() {
      this.$ajax
        .get("/cxt/manager/users/excel", JSON.stringify(), {
          //就是这里，
          // headers: _this.Base.initAjaxHeader(1, data)
        })
        .then(res => {
          //  this.t=res.data.data.list

          console.log("导出");
        });
    },
      getlist(){
        let _this=this
          let params = new URLSearchParams();
            params.append('page', 1);
             params.append('size', 20);
     
   
       this.list=[]
         _this.loading_status = true;
      this.$ajax.get('/cxt/manager/logs', params).then(res => {
          if(res.data.state==='015'){
             _this.$router.push('/login');
          }else{
                
                this.pagen=res.data.data.total
                console.log(this.pagen)
            this.tableData=res.data.data.list;
            console.log(this.tableData)
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
    handleEdit(index, row) {
      console.log(index, row);
      this.$message({
        showClose: true,
        message: index,
        row,
        type: "success"
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$message({
        showClose: true,
        message: index,
        row,
        type: "success"
      });
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    }
  }
};
</script>

<style scoped>
</style>
