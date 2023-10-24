//导入Axios
import myAxios from '@/utils/myaxios'

export default{
    //查询出版社信息
    getAllPressInfo(){
        return myAxios({
            url:"/api/press/list",
            method:'get'
        })
    },

    //分页查询出版社信息
    seachPressList(page,size,searchWhere){
        return myAxios({
            url:"/api/press/list/search/${page}/${size}",
            method:'post',
            data:searchWhere,
        })
    }

}