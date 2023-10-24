<template>
    <div>
        <el-form ref="searchForm" :inline="true" :model="serachWhere" style="margin-top: 20px;"  class="demo-form-inline">
            <el-form-item label="书名" size="mini" prop="bookName">
                <el-input v-model="serachWhere.bookName" placeholder="书名" style="width:150px" ></el-input>
            </el-form-item>
            <el-form-item label="出版社" size="mini"  prop="press" @click.right.prevent.native="dialogPressVisible=true">
                <el-input v-model="serachWhere.press"   placeholder="出版社" style="width:150px"></el-input>
            </el-form-item>
            <el-form-item label="图书类型" size="mini" prop="bookType">
                <el-select v-model="serachWhere.bookType" placeholder="图书类型" style="width:120px">
                    <el-option v-for="option in bookTypeOptions" :label="option.name" :value="option.type"
                    :key="option.type"></el-option>
                    
                </el-select>
            </el-form-item>
            <el-form-item label="出版日期" size="mini" prop="publicationdate">
                <el-date-picker v-model="serachWhere.publicationdate" type="daterange"  align="right" unlink-panels
                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                :picker-options="pickerOptions" size="mini" style="width: 220px;">
                </el-date-picker>
            </el-form-item>
            <el-form-item  size="mini">
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <!--resetFrom(ruleForm)中的ruleFrom指的是要重置的表单的ref属性，因此要为表单添加ref属性-->
                <!--同时需要在el-form-item标签中新增prop属性否则不生效-->
                <el-button @click="resetForm('searchForm')">重置</el-button>
                <el-button type="primary" @click="addHandle">新增</el-button>
            </el-form-item>
            
        </el-form>
    <el-table :data="bookinfo"  style="width: 100%"  max-height="480">
        <el-table-column  fixed prop="id" label="序号" width="60"> </el-table-column>
        <el-table-column fixed prop="bookISBN" label="书号" width="150"> </el-table-column>
        <el-table-column prop="bookName" label="书名" width="200"> </el-table-column>
        <el-table-column prop="author" label="作者" width="100"> </el-table-column>
        <el-table-column prop="press" label="出版社" width="150"> </el-table-column>
        <el-table-column prop="publicationdate" label="出版日期" width="150"> </el-table-column>
        <el-table-column prop="price" label="价格" width="100"> </el-table-column>
        <el-table-column prop="quantity" label="数量" width="100"> </el-table-column>
    <el-table-column prop="bookType" label="图书类型" width="100">
      <!--scope表示作用域插槽：data绑定的数据-->
      <template slot-scope="scope">
            <span>{{ scope.row.bookType|bookTypeFileter }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="150">
      <template slot-scope="scope">
        <el-button @click.native.prevent="handleEdit(scope.row.id)" type="primary" size="small">
          编辑
        </el-button>
        <el-button @click.native.prevent="handleDelete(scope.row.id)" type="danger" size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
    
  </el-table>
  <div class="block">
    <!-- <span class="demonstration">分页查询</span> -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100"
      layout="total, sizes, prev, pager, next, jumper" :total="400">
    </el-pagination>
  </div>

  <!--选择出版社组件-->
  <el-dialog title="选择出版社"  :visible.sync="dialogPressVisible"  width="500px">
    <press-info @sendPressData="getPressData"></press-info>
  </el-dialog>

  <!--新增修改图书信息-->
  <el-dialog title="添加图书信息"  :visible.sync="dialogFormVisible" width="500px">
    <el-form :model="form" :rules="rules" ref="addForm" label-width="100px" label-position="right" style="width: 400px;margin-top: -20px;">
      <el-form-item label="id" :label-width="formLabelWidth" size="mini" prop="id" v-show="false">
            <el-input v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>  
      <el-form-item label="书号" :label-width="formLabelWidth" size="mini" prop="bookISBN">
            <el-input v-model="form.bookISBN" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书名"  :label-width="formLabelWidth" size="mini" prop="bookName">
            <!--autocomplete含义为开启，如果第一次输过一些数据，当第二次再输入相同数据时，会提示之前输入过的数据列表可进行选择-->
            <el-input v-model="form.bookName" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth" size="mini" prop="author">
            <!--autocomplete含义为开启，如果第一次输过一些数据，当第二次再输入相同数据时，会提示之前输入过的数据列表可进行选择-->
            <el-input v-model="form.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth" size="mini" prop="press">
             <el-input v-model="form.press" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版日期" :label-width="formLabelWidth" size="mini" prop="publicationdate"> 
            <el-date-picker v-model="form.publicationdate" type="daterange"  align="right" unlink-panels
                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                :picker-options="pickerOptions" size="mini" style="width: 220px;">
                </el-date-picker>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth" size="mini" prop="price">
             <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" :label-width="formLabelWidth" size="mini" prop="quantity">
              <!--v-model.number将绑定值转化为number类型的修饰符，同事需要增加prop属性，然后再rules中增加对应的规则-->
             <el-input v-model.number="form.quantity" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图书类型" :label-width="formLabelWidth" size="mini" prop="bookType">
            <el-select v-model="form.bookType" placeholder="请选择图书类型">
                <el-option v-for="options in bookTypeOptions" :label="options.name" :value="options.type" :key="options.type"></el-option>
            </el-select>
        </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="resetForm('addForm')" size="mini">取 消</el-button>
    <el-button type="primary" @click="form.id===''?submitForm('addForm'):updateForm('addForm')" size="mini">确 定</el-button>
  </div>
</el-dialog>
</div>
</template>
<script>
import bookinfoApi from '@/api/bookinfo'
//导入出版社信息作为子组件
import PressInfo from '@/views/press/pressinfo.vue'

//如果定义在data中，则过滤器的代码就要使用this去获取bookTypeOptions对象，而在过滤器中不能引用当前实例this。即
//过滤器中带啊不能写成
//const booktypeobj=this.bookTypeOptions.find(obj=>obj.type=type)
//如果不定义一个全局图书类型的选项数组，可以通过发送Ajax请求，即通过API接口到后端去获取图书类型（前端传递类型编号到后端）
const bookTypeOptions=[
    {type:'1',name:'编程类'},
    {type:'2',name:'前端类'},
    {type:'3',name:'设计类'},
    {type:'4',name:'移动开发类'},
]
export default {
    components:{
      PressInfo
    },
    data(){
        return{
            bookinfo:[],
            total:0,
            currentPage:1,
            pageSize:10,
            serachWhere:{
                bookName:'',
                press:'',
                bookType:'',
                publicationdate:'',
            },//查询条件
            bookTypeOptions,
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4,
            formInline: {
                user: '',
                region: ''
            },
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
            dialogFormVisible: false,
            dialogPressVisible:false,
        form: {
            id:'',
            bookISBN:'',
            bookName:'',
            author:'',
            press:'',
            bookType:'',
            publicationdate:'',
            price:0,
            quantity:500,

        },
        formLabelWidth: '120px',
        rules: {
          // required表示必须输入，message表示检验失败的提示消息，trigger表示触发校验时机。
          //数字类型校验需要在v-model处加上.number
            bookISBN: [
            { required: true, message: '请输入书号', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
            bookName: [
            { required: true, message: '请输入书名', trigger: 'change' }
          ],
            author: [
            {  required: true, message: '请输入作者', trigger: 'change' }
          ],
          press: [
            {  required: true, message: '请输入出版社', trigger: 'change' }
          ],
          bookType: [
            {  required: true, message: '请选择图书类型', trigger: 'change' }
          ],
          publicationdate: [
            { required: true, message: '请选择发布日期范围', trigger: 'change' }
          ],
          price: [
            { required: true, message: '请填写价格', trigger: 'blur' }
          ],
          quantity:[
            { required: true, message: '请填写数量', trigger: 'blur',type:'number' }
          ],
        }
        }
    },
    created(){
        this.fetchData();
    },
    methods:{
        fetchData(){
            // bookinfoApi.getBookInfoList().then(response=>{
            //     const resp=response.data;
            //     if(resp.flag){
            //         this.bookinfo=resp.data //这里的this不能少，resp.data就是从后端获取到的图书信息数据
            //         console.log(resp)
            //     }
            // })
            bookinfoApi.search(this.currentPage,this.pageSize,this.serachWhere).then(response=>{
                const resp=response.data;
                this.bookinfo=resp.data.row
                this.total=resp.data.total
            })

        },
        handleEdit(id) {
            //1.根据id获取图书信息，如果返回成功，打开新增图书信息页面，将data值赋值给Dialog中的form
            if(id){
              bookinfoApi.getbookinfo(id).then(response=>{
                const resp=response.data
                if(resp.flag){
                  this.form=resp.data
                  this.$nextTick(()=>{
                    this.dialogFormVisible=true
                  })
                  
                  
                }else{
                  this.$message({
                        message:resp.message,
                        type:'warning'
                  })
                }
              })
            }
            //2.否则提示数据缺失

        },
        //删除数据，弹出弹框，确认删除后才调后台
        handleDelete(id) {
            console.log("删除"+id)
            this.$confirm('确认删除该条数据？','提示',{
              confirmButtonText:'确定',
              cancelButtonText:'取消',
              type:'warning'
            }).then(()=>{
              console.log('delete')
              bookinfoApi.deleteBookInfo(id).then(response=>{
                const resp=response.data
                if(resp.flag){
                  this.$message({
                    type:resp.flag?'success':'error',//动态显示提示类型
                    message:resp.message,
                  })
                  this.fetchData()
                }
              })
              
            }).catch(()=>{
              //不需要进行任何操作
              this.$message({
                type: 'info',
                message: '已取消删除'
          });
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
        onSubmit() {
            console.log(this.serachWhere);
            this.fetchData()
        },
       
        
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            bookinfoApi.addbookinfo(this.form).then(response=>{
                const resp=response.data
                if(resp.flag){
                    this.fetchData()
                    this.dialogFormVisible=false
                }else{
                    this.$message({
                        message:resp.message,
                        type:'warning'
                    })    
                }
            })
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      addHandle(){
        this.dialogFormVisible=true
        //如果新增关闭页面重新打开新增页面数据未重置，可能是对话框刚弹出来，表单可能还没有添加完毕，就重置了表单。
        //解决方案：需要等表单加载完毕之后再进行重置，可以使用vue内置的$nextTick(),该方法需要一个回调，而这个回调就是
        //   在表单加载完成之后才执行的。
        this.$nextTick(()=>{
            this.$refs['addForm'].resetFields();
        })
       
      },
      updateForm(formName){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            bookinfoApi.editbookinfo(this.form).then(response=>{
              const resp=response.data
              //1.如果修改成功，关闭Dialog页面，清空数据。
              //2.提示修改成功
              //3.刷新列表
              //4.否则提示修改失败
              if(resp.flag){
                this.$nextTick(()=>{
                  this.$refs['addForm'].resetFields();
                })
                //this.form.id=''
                this.fetchData()
                this.dialogFormVisible=false
                this.$message({
                  message:"修改成功",
                  type:'success'
                })
              }else{
                this.$message({
                  message:resp.message,
                  type:'warning'
                })
              }
            })
          }else{
          return false
        }
        })
      },
      //获取press子组件中传来的值
      getPressData(currentRow){
        if(currentRow!=null){
          this.serachWhere.press=currentRow.pressName
          this.serachWhere.id=currentRow.id
          this.dialogPressVisible=false
        }
        // this.$message({
        //         message:currentRow,
        //         type:'info'
        //     })
      }

    },
    filters:{
        bookTypeFileter(type){
            //数组对象有一个find方法，查找数组中的一个数据/对象
            //参数是一个回调，obj代表的是数组中要查找的对象。对象的type值等于传入过来的值，
            //就获取这个对象，比如传入的type为2，那自然就到bookTypeOptions数组中查找type=2的那个对象并返回。
            const booktypeobj=bookTypeOptions.find(obj=>obj.type===type)
            //booktypeobj对象存在就返回它的name值，即类型的中文名，否则返回null
            return booktypeobj?booktypeobj.name:null
        }
    }
}
</script>