import myaxios from '@/utils/myaxios'  //@表示src目录位置

//通过myaxios发送异步请求，返回值是一个promise格式的一部对象，后续就可以通过promise异步对象的then执行成功的回调，
//通过catch执行失败的回调。
//发送AJAX请求，传入用户名，密码，用于验证用户是否有资格
export function login(username,password){
    console.log(myaxios);
    return myaxios({
        url:'/api/user/login',
        method:'post',
        data:{
            username,
            password
        }
    
    })
}

export function getUserInfo(token){
    return myaxios({
        url:'/api/user/info/${token}',//这里需要拼接占位符，所以用''
        method:'get'
    })
}

export function logout(token){
    return myaxios({
        url:'/api/user/logout/${token}',
        method:'post',
        data:{
            token //完整写法为token:token
        }
    })
}
