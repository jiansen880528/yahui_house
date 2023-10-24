import router from "./router";
import { getUserInfo } from "./api/login";


router.beforeEach((to,from,next)=>{
    //获取token
    const token = localStorage.getItem("xy-manager-token")
    //判断token是否为空，为空，要访问非登录页面，则不允许访问，让其访问登录页面
    if(!token){
        if(to.path!=='/login'){
            next({path:'/login'})
        }else{//访问的就是登陆页面/login
            next()//不需要传参数，默认就是默认路由
        }
    }else{//token不为空，如果请求路径为/login ，就让进入路由/login
        if(to.path!=='login'){
            const userinfo=localStorage.getItem("xy-manager-user")
            //如果访问的是非登录页面，获取本地浏览器中的userinfo信息

            //如果userinfo不为空，则跳转到目标路由

            //如果userinfo为空，则获取用户信息，保存到本地浏览器。，并让其进入目标路由
            if(!userinfo){
                next()
            }else{
                getUserInfo(token).then(response=>{
                    const respUser=response.data
                    if(respUser.flag){
                        localStorage.setItem("xy-manager-user",JSON.stringify(respUser.data))
                        next()
                    }else{
                        next({path:'/login'})
                    }
                })
            }
        }
    
    }
    
})