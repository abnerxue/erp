<template>
    <div>
      <p class="title"><i class="el-icon-tickets"></i>一卡通会员信息<el-input
    placeholder="请输入姓名或手机号进行查找"
    prefix-icon="el-icon-search"
    v-model="input" style='float:right;width:30%;margin-bottom:.8rem;'>
  </el-input> <br/>    <el-button type="primary" style='margin:0 0 0 1rem;' @click="dialogVisible = true">新增</el-button> <el-button type="primary" style='margin:0 0 0 1rem;' @click="derive">导出</el-button> <el-button type="primary" style='margin:0 0 0 1rem;' @click="getlist">刷新</el-button></p>
      <el-dialog
  title="新增一卡通会员信息"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
 
 <el-form ref="form" :model="form" label-width="120px">
  <el-form-item label="手机号">
    <el-input v-model="form.tel"></el-input>
  </el-form-item>
  <el-form-item label="一卡通号">
    <el-input v-model="form.cardn" style="width: 60%;"></el-input>
  </el-form-item>
  <el-form-item label="购卡日期">
   <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
  </el-form-item>
  <el-form-item label="可买常孝通日期">
   <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
  </el-form-item>
  <el-form-item label="金额">
    <el-input v-model="form.money" style="width: 60%;"></el-input>
  </el-form-item>
  <el-form-item label="有效期">
    <el-input v-model="form.yxq" style="width: 60%;"></el-input>
  </el-form-item>
  <el-form-item label="积分额度">
    <el-input v-model="form.jfed" style="width: 60%;"></el-input>
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
        <el-table-column
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
        </el-table-column>
      </el-table>
        <el-pagination
  background
  layout="prev, pager, next"
  :total="1000">
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
          cardn: '',
          date1: '',
          date2: '',
          money: '',
          
          yxq: '',
          jfed: ''
        },
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
     onSubmit() {
        console.log('submit!');
      },
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
