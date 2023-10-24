<template>
    <div class="header">
        <a href="/" style="padding-left: 30px;">
            <img class="logo" src="@/assets/logo3.png">
            <span class="title">图书信息管理系统</span>
        </a>
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
             欢迎{{user.name}}登录系统<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-edit" @click.prevent="" command="a">修改密码</el-dropdown-item>
                <el-dropdown-item icon="el-icon-user" command="b">退出系統</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
         <!--修改密码页面-->
        <el-dialog title="修改密码"   :visible.sync="dialogPasswordVisible"  width="500px">
            <el-form status-icon :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="旧密码" prop="oldpassword">
                    <el-input  placeholder="请输入旧密码" type="password" v-model="ruleForm.oldpassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newpassword">
                    <el-input placeholder="请输入新密码" type="password" v-model="ruleForm.newpassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input placeholder="请输入确认密码" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
               
                <el-form-item>
                    <el-button v-bind:disabled="submitButton" type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
//import { logout } from '../../api/login';
import { mapActions } from "vuex";
import passChangeApi from '@/api/password.js'
export default {

    data(){
        return {
            //从本地浏览器存储中返回用户信息获取id。同时将下拉菜单改为，欢迎某某某
            //localStorage中存储的字符创形式需要转成对象格式
            user:JSON.parse(localStorage.getItem('xy-manager-user')),

          //当两次密码不一致时候不允许进行提交
          submitButton:false,
          //修改密码页面隐藏
          dialogPasswordVisible:false,
          //为了程序健壮性，最好给ruleForm指明具体的属性值。如果不指明属性值，有时候文本框会无法输入数据
          ruleForm: {
            oldpassword: '',
            newpassword:'',
            checkPass: '',
            
          },
          rules: {
              oldpassword: [
              {required:true,message: "旧密码不能为空,长不超过10个字符",validator: validateOldPass, trigger: 'blur' }
             
              ],
              newpassword: [
              {required:true,message: "新密码4到6位",min: 4, max: 6,  trigger: 'blur' }
              ],
              checkPass: [
              {required:true,  validator: validatePass2,min: 4, max: 6,  trigger: 'blur' }
              ],
       
            
          }
        };

      //验证密码
      var validateOldPass = (rule, value, callback) => {
        console.log("validateOld")
        this.$message('validateOld');
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
            passChangeApi.testPass(this.user.id,value).then(response=>{
                console.log(this.user.id,value)
                const resp=response.data
                if(resp.flag){
                    callback()
                    console.log("validateOld")
                }else{
                    callback(new Error(resp.message))
                }
            })
        }
      };
      //验证新密码跟确认密码是否一致
      var validatePass2 = (rule, value, callback) => {
        if (value !== this.ruleForm.newpassword) {
          callback(new Error('与输入新密码不一致!'));
          this.submitButton=true
        } else { 
            this.$message('确认密码校验')
          callback();
        }
      };       
    },
    methods:{
        ...mapActions(["Login", "Logout"]),
        //打开修改密码页面
        openDialog(){
            this.dialogPasswordVisible=true
            //输入密码信息后关闭页面，重新打开会有密码信息。所以打开页面前需要重置页面
            this.$nextTick(()=>{
                this.$refs['ruleForm'].resetFields();
            })
        },
       //修改、退出系统下拉菜单
        handleCommand(command) {
            switch(command){
                case 'a':
                    //this.$message('单击了修改密码按钮');
                    this.openDialog()                  
                    break;
                case 'b':
                    this.logoutSystem()
                    break;
                    default:
                    break;
            }
          },
          //退出系统、清空本地用户信息、进入登录页
        //   logoutSystem(){
        //           //通过浏览器获取登录时存储的token信息
        //           const token=localStorage.getItem("xy-manager-token");
        //             console.log('comman wei b')
        //             console.log('token='+token)
        //             //this.$message('click on item ' + command);
        //             logout(token).then(response=>{
        //                 const resp=response.data;
        //                 console.log('resp='+resp)
        //                 console.log('resp.flag='+resp.flag)
        //                 if(resp.flag){
        //                     //清除本地浏览器token和用户数据
        //                     localStorage.removeItem("xy-manager-token")
        //                     localStorage.removeItem("xy-manager-user")
        //                     //跳转到登录页
        //                     this.$router.push('/login')
        //                 }else{
        //                     this.$message({
        //                         messsage:resp.message,
        //                         type:'warning',
        //                         duration:1000 //设置停留时间为1秒
        //                     })
        //                 }
        //             })               
        //   },
        logoutSystem(){
            //通过浏览器获取登录时存储的token信息
                const token=localStorage.getItem("xy-manager-token");
                console.log('comman wei b')
                console.log('token='+token)
                this.Logout(token).then(response=>{
                    const resp=response.data
                    if(resp.flag){
                            //清除本地浏览器token和用户数据
                            localStorage.removeItem("xy-manager-token")
                            localStorage.removeItem("xy-manager-user")
                            //跳转到登录页
                            this.$router.push('/login')
                        }else{
                            this.$message({
                                messsage:resp.message,
                                type:'warning',
                                duration:1000 //设置停留时间为1秒
                            })
                        }
                })

        },
          //密码页面提交后台
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert(this.user.id+"|||||"+this.ruleForm.newpassword);
                passChangeApi.changePass(this.user.id,this.ruleForm.newpassword).then(response=>{
                    const resp=response.data
                    this.$message({
                        message:resp.message,
                        type:resp.flag?"success":"warning"
                    })
                    if(resp.flag){
                        
                        this.logoutSystem()
                        this.dialogPasswordVisible=false
                    }else{
                        this.$message(resp.desc)
                    }
                })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
          },
          //重置密码修改页面数据
          resetForm(formName) {
            this.$refs[formName].resetFields();
          }
    }
}
</script>

<style scoped>
.logo{
    /* 与padding属性冲突，所以针对<a>标签设置padding-left属性 */
    border-radius: 5px;
    vertical-align: middle;
    width: 25px;
}
.title{
    position: absolute;
    color: #fff;
    padding-left: 5px;
    font-size: 20px;
}

.el-dropdown-link {
    cursor: pointer;
    color: #fff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  /*下拉菜单，先测试后面这部分样式，使其靠右*/
  .el-dropdown{
    float: right;
    margin-right: 30px;
  }
</style>