import axios from "axios";
//导入loading
import {Loading,Message} from 'element-ui'

//Loading.service({target:'.main',text:'玩命加载中',
// background:'rgb(0,0,0,0.5)'})
const loading ={
    loadingInstance:null,//创建实例对象
    open:function(){
        if(this.loadingInstance===null){

            this.loadingInstance=Loading.service({
                target:'.main',
                //设置loading时候背景颜色及内容
                text:'玩命加载中',
                background:'rgb(0,0,0,0.5)'//黑色半透明
            
            })
        }
    },
    close:function(){
        if(this.loadingInstance!=null){

            this.loadingInstance.close()
        }
    }
}
const myaxios=axios.create({
    baseURL:'/',//基础路径就是Axios对象发送请求时路径的前缀
    timeout:5000,//单位是毫秒
})
export default myaxios//导出自定义的Axios对象myaxios

// 封装请求的拦截器应用场景：
// 1.上传图片时候，先拦截下来压缩后再上传到后端。
// 2.发送前拦截器清空无用字段
// 3.固定请求头信息会用到
// 4.在向后端请求数据时候，先拦截显示正在加载的数据图标
axios.interceptors.request.use(function(config){
    //.main区域请求数据时loading
    loading.open();

    return config;//一定要返回，然后再发送到后端
},function(error){
    loading.close()
    return Promise.reject(error);//抛出错误信息
})


// 响应拦截器应用场景：
// 1.后端返回的数据不适合前段UI组件直接使用，拦截下来先处理；
// 2.后端返回一种怪异的数据格式不是json，需要先拦截处理成前端的格式
// 3.根据后端返回的status，提前封装判断是成功还是错误，如果是错误，将在前端给用户提示。
// 4.后端给出响应时，响应拦截关闭加载数据图标。
axios.interceptors.response.use(function(response){
    loading.close()
    const resp=response.data
    if(resp.code!=200){
        Message({
            message:resp.message||'系统异常',
            type:'warning',
            duration:5000,
            showClose:true //显示关闭按钮
        })
    }
    return response;
},function(error){
    loading.close()
    Message({
        message:error.message,
        type:'error',
        duration:5000
    })
    return Promise.reject(error);
})

