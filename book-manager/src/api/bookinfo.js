//导入Axios
import myAxios from '@/utils/myaxios'

//这里导出为一个对象，在该对象里面定义函数，不管定义多少个函数，要使用的时候一般都会使用，无须按需导入，当然导出一个
//普通函数也可以
export  default{
    getBookInfoList(){
        //获取图书信息列表
        return myAxios({//注意，不要忘记return，要返回这个对象（是一个promise对象），
                        //因为后面要通过该返回promise的then方法获取数据
            url:'/api/bookinfo/list',
            method:'get'
        })
    },
    //分页查询
    search(page,size,searchWhere){
        return myAxios({
            url:'/api/bookinfo/search/${page}/${size}',
            method:'post',
            data:searchWhere//searchWhere没有传值就是空值，即无条件分页查询
        })
    },
    addbookinfo(bookform){
        return myAxios({
            url:'/api/bookinfo/add',
            method:'post',
            data:bookform
        })
    },
    //根据id获取图书信息
    getbookinfo(id){
        return myAxios({
            url:'/api/bookinfo/$(id)',
            method:'get'

        })
    },
    //根据id修改图书信息
    editbookinfo(bookObj){
        return myAxios({
            url:'/api/bookinfo/edit',
            method:'post',
            data:bookObj
        })
    },
    //根据id删除图书信息
    deleteBookInfo(id){
        return myAxios({
            url:'/api/bookinfo/delete/$(id)',
            method:'delete',
           
        })
    },
    //获取图书类型下是数量
    getBookType(){
        return myAxios({
            url:'/api/chartdata/booktype',
            method:'get'
        })
    },
    //获取图表2数据
    getEchartData(){
        return myAxios({
            url:'/api/echart/data',
            method:'get'
        })
    }
}