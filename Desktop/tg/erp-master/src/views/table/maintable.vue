<template>
    <div>
      <p class="title"><i class="el-icon-tickets"></i>会员资产<el-input
    placeholder="请输入姓名或手机号进行查找"
    prefix-icon="el-icon-search"
    v-model="input" style='float:right;width:30%;margin:.1rem 0 .8rem 0;'>
  </el-input><br/>    
  <!-- <el-button type="primary" style='margin:0 0 0 1rem;' @click="dialogVisible = true">新增</el-button>  -->
   <el-button type="primary" style='margin:0 0 0 1rem;' @click="derive">导出</el-button> 
   <!-- <a herf="http://47.103.129.40:8080/cxt//manager/users/excel">导出</a> -->
   <el-button type="primary" style='margin:0 0 0 1rem;' @click="getlist">刷新</el-button></p>
  
     
    
     <el-table
          v-loading="loading_status"
          border
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
           
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column
            type="selection"
            width="55">
          </el-table-column>
        <el-table-column
         
          prop="nick"
          label="姓名"  width="80">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="手机号"  width="120">
        </el-table-column>
         <el-table-column label="常孝通数量" width="100" >
      <template slot-scope="props">
        <div style="display:flex;width:100%;"
          v-for="(item,index) in props.row.stocks" 
          :key="index">

          <div style="flex:1;padding:0px 0;">{{ item.lock}}</div>
        </div>
        </template>
      </el-table-column>
       <el-table-column label="常孝解锁时间" width="100">
      <template slot-scope="props">
        <div style="display:flex;width:100%;"
          v-for="(item,index) in props.row.stocks" 
          :key="index">

          <div style="flex:1;padding:10px 0;">{{ (item.stime||'').slice(0,10)}}</div>
        </div>
        </template>
      </el-table-column>
       <el-table-column label="常孝解比例" width="100">
      <template slot-scope="props">
        <div style="display:flex;width:100%;"
          v-for="(item,index) in props.row.stocks" 
          :key="index">

          <div style="flex:1;padding:10px 0;">{{ item.rate}}</div>
        </div>
        </template>
      </el-table-column>
        <el-table-column label="一卡通卡号">
      <template slot-scope="props">
        <div style="display:flex;width:100%;"
          v-for="(item,index) in props.row.cards" 
          :key="index">

          <div style="flex:1;padding:10px 0;">{{ item.cardno}}
         
          </div>
        </div>
        </template>
      </el-table-column>
        <el-table-column label="一卡通余额" width="100">
      <template slot-scope="props">
        <div style="display:flex;width:100%;"
          v-for="(item,index) in props.row.cards" 
          :key="index">

          <div style="flex:1;padding:10px 0;">{{ item.money}}</div>
        </div>
        </template>
      </el-table-column>
        <el-table-column label="建卡时间" width="100" >
      <template slot-scope="props">
        <div style="display:flex;width:100%;"
          v-for="(item,index) in props.row.cards" 
          :key="index">

          <div style="flex:1;padding:10px 0;">{{ (item.ctime||'').slice(0,10)}}</div>
        </div>
        </template>
      </el-table-column>
        <el-table-column label="积分送比">
      <template slot-scope="props">
        <div style="display:flex;width:100%;"
          v-for="(item,index) in props.row.cards" 
          :key="index">

          <div style="flex:1;padding:10px 0;">{{ item.score}}</div>
        </div>
        </template>
      </el-table-column>
        <el-table-column label="一卡通购买详情">
      <template slot-scope="props">
        <div style="display:flex;width:100%;"
          v-for="(item,index) in props.row.cards" 
          :key="index">

          <div style="flex:1;padding:10px 0;" :name="item.id">
            <el-button @click="detail(item.cardno)" type="text" style='padding-left:50px; font-size:16px;'> 详情</el-button>
          </div>
        </div>
        </template>
      </el-table-column>
      
      
       
         
      </el-table>
       <el-dialog
  title="一卡通购买详情"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
 <!-- <el-form ref="form" :model="s" :rules='rules' label-width="100px">
  
  
  
 
 
  
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button  @click="dialogVisible = false">取消</el-button>
  </el-form-item>
</el-form> -->
 <el-table
          v-loading="loading_status"
          ref="multipleTable"
          :data="tableData1"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
          </el-table-column>
        
        <el-table-column
          prop="money"
          label="一卡通金额变动">
        </el-table-column>
       
        
        <el-table-column
          prop="ctime"
          label="购买日期">
        </el-table-column>
       
        
      </el-table>
  
</el-dialog>
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
      s:'',
      loading_status: false,
         dialogVisible: false,
      input:'',
      tableData: [{

      }],
      tableData1: [{

      }],
      tableData2: [{

      }],
         pagen:1,
          currentPage: 1, //初始页
      pagesize: 20, //    每页的数据
       multipleSelection: []
    }
  },
    created(){
    this.getlist()
  },
  methods: {
   detail(cardno){
     let params = new URLSearchParams();
            params.append('page', 1);
             params.append('size', 20);
              params.append('cardno', cardno);
      this.$ajax
        .post("/cxt/manager/card/detail",  params)
        .then(res => {
          //这是从本地请求的数据接口，
         
          if(res.data.state==='015'){
             _this.$router.push('/login');
          }else{
            console.log( res.data)
            
               
           this.tableData1=res.data.data.list
          
            console.log( this.tableData1)
           
          }
           
        });
      this.dialogVisible = true
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      },
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
     derive(){
      
           
         location.href = ' /cxt/manager/users/excel'
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
        .post("/cxt/manager/users/json",  params)
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
      getlist(){
      let params = new URLSearchParams();
            params.append('page', 1);
             params.append('size', 20);
   
      let _this = this;
       this.list=[]
         _this.loading_status = true;
      this.$ajax.get('/cxt/manager/users/json', params).then(res => {
          if(res.data.state==='015'){
           this.$router.push('/login');
          }else{
              this.pagen=res.data.data.total
             /*  let ksz=[]
              for(let i=0;i<res.data.data.list.length;i++){
               ksz.push(res.data.data.list.cards[i])
               this.tableData1=ksz
              }  */
              
          this.tableData=res.data.data.list;
          this.tableData[0].children = [{id:1,nick:'11112222'},{id:2,nick:'2222'}];
          
          }

     
         console.log( this.tableData)
        
           
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
 .el-table, .el-table__expanded-cell {
   height: 20;
}
</style>
