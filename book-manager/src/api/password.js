import myAxios from '@/utils/myaxios'  //@表示src目录位置

export default{

      testPass(id,oldPassword){
        return myAxios({
            url:'/api/password/test',
            method:'post',
            data:{
                id,
                oldPassword
            }
        })
    }, 
    changePass(id,newpassword){
        return myAxios({
            url:'/api/password/change/${id}/${newpassword}',
            method:'post',
            data:{
                id,
                newpassword
            }
        })
    } 
}