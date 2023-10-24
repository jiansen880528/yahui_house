<template>
    <div>
        <!--条件查询，：inline:"true"表示行内显示/一行显示；:model绑定查询条件（在data中要有）-->
        <el-form ref="searchForm" :inline="true" :model="serachWhere" style="margin-top: 20px;"  class="demo-form-inline">
            <el-form-item label="出版社" size="mini"  prop="press">
                <el-input v-model="serachWhere.pressName" placeholder="出版社" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item  size="mini">
                <el-button type="primary" @click="fetchData()">查询</el-button>
            </el-form-item>
        </el-form>
        <!--Table 组件提供了单选的支持，只需要配置highlight-current-row属性即可实现单选。
            之后由current-change事件来管理选中时触发的事件，它会传入currentRow，oldCurrentRow。如果需要显示索引，
            可以增加一列el-table-column，设置type属性为index即可显示从 1 开始的索引号。-->
        <el-table :data="presslist" highlight-current-row  @current-change="handleCurrentChange" max-height="400" border style="width: 100%">
            <!-- <el-table-column type="index" width="50"> </el-table-column> -->
            <el-table-column  prop="id" label="序号"  width="60"> </el-table-column>
            <el-table-column prop="pressName" label="出版社名称"  width="120"> </el-table-column>
            <el-table-column prop="pressAddress" label="出版社地址"> </el-table-column>
            <el-table-column  prop="code" label="邮编"  width="80"> </el-table-column>
            <el-table-column prop="chargePerson" label="作者"  width="80"> </el-table-column>
            <el-table-column prop="phone" label="手机号"> </el-table-column>

  </el-table>
  <div class="block">
    <!-- <span class="demonstration">分页查询</span> -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
      layout=" prev, pager, next" :total="total">
    </el-pagination>
  </div>
  
</div>
</template>
<script>
import pressinfoApi from '@/api/press.js'

export default {
    data(){
        return{
            presslist:[],
            total:0,
            currentPage:1,
            pageSize:10,
            currentRow:null,
            serachWhere:{
                pressName:""
            },//查询条件
        
        }
    },
    created(){
        this.fetchData();
    },
    methods:{
        fetchData(){
          
            pressinfoApi.seachPressList(this.currentPage,this.pageSize,this.serachWhere).then(response=>{
                const resp=response.data;
                this.presslist=resp.data.rows
                this.total=resp.data.total
            })
        },
          
        handleSizeChange(size) {
           this.pageSize=size;
           this.fetchData()
        },
        handleCurrentChange(currentPage) {
            this.currentPage=currentPage;
            this.fetchData()
        },
        //选中后向父组件传值
        handleCurrentChange(val){
            this.currentRow = val;
            this.$emit('sendPressData',val)
            // this.$message({
            //     message:val,
            //     type:'info'
            // })
        }
    },
}
</script>
<style scoped>
.dialog-footer{
    margin-top:-50px;
    padding-bottom: 0px;
}
</style>