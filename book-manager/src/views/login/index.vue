<template>
    <div id="login-container">
        <el-form :rules="rules" ref="formRef" :model="form" label-width="65px" class="login-form">
            <h2 class="login-title">小豆丁图书信息管理系统</h2>

            <el-form-item label="用户名" prop="username">
                <el-input placeholder="请输入用户名"  v-model="form.username" :disabled="false"  ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
                <!-- 使用show-password属性即可得到一个可切换显示隐藏的密码框-->
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm()">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {login,getUserInfo} from "@/api/login"
export default {
  data() {
    return {
        form:{  
            username:'',
            password:'',
        },
        rules:{
            username:[
                {required:true,message:'请输入用户名',trigger:'blur'},
            ],
            password:[
                {required:true,message:'请输入密码',trigger:'blur'},
                {min:6,max:32,message:'密码长度在6到32个字符',
                trigger:['blur','change']}
                // blur失去焦点
                // 比如输入框里。校验文本框是否为空

                // change数据改变
                // 比如下图这些。需要手动选择的东西，用change
            ]
        }
    }
  },
  methods:{
    submitForm(formName){
        this.$refs.formRef.validate(valid=>{
            if(valid){
                //valid为true时表示所有表单校验通过
                //alert("submit")
                login(this.form.username,this.form.password).then(response=>{//response为后端返回信息
                    const resp=response.data;
                    if(resp.flag){
                        console.log(resp,resp.flag,resp.data.token);
                        //验证成功，不过由于服务器端只会返回true，但是也要做判断，因为实际开发中可能返回false
                        //验证成功会返回一个token，通过token去获取用户信息
                        getUserInfo(resp.data.token).then(response=>{
                            const respUser=response.data;
                            if(respUser.flag){//用户信息获取成功
                                //利用浏览器的本地存储保存token及用户信息
                                localStorage.setItem(
                                    "xy-manager-user",JSON.stringify(respUser.data)
                                );
                                //respUser.data不转json格式不方便后面读取，因为是一个Object对象
                                //所以外面包了一层格式转换函数
                                localStorage.setItem("xy-manager-token",resp.data.token);
                                //前往首页，首页组件后面再做，现在为空
                                this.$router.push('/home')
                            }else{
                                this.$message({
                                    message:respUser.message,
                                    type:"warning"
                                });
                            }
                        })
                    }else{
                        //认证不通过，弹出提示信息，这步要看效果就要改下接口（flag:false，message:验证失败）
                        this.$message({
                            message:resp.message,
                            type:"warning"
                        });
                    }
                })
            }else{
                console.log("error submit!")
                return false;
            }
        });
    }
  }
}
</script>
<style scoped>
    .login-form {
        width:350px;
        background-color:#fff;
        padding:15px;
        border-radius:20px;
        height:250px;
        left:50%;
        top:50%;
        margin-left:-175px;
        margin-top:-125px;
        position:absolute;
    }
    #login-container{
        position:absolute;
        width:100%;
        height:100%;
        background-image:url('../../assets/logo2.png');

    }
    .login.title{
        color:#606266;
        text-align:center;
    }
</style>