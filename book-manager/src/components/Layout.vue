<template>
    <div>
        <!-- 常用：通过-连接两个单词，且首字母小写 -->
        <app-header></app-header>
        <app-navbar></app-navbar>
        <app-main></app-main>
        <div class="bottom">系统侧部说明部分</div>
    
    </div>
</template>
<script>
//导入三个组件分别用了三种写法
import AppHeader from './AppHeader/index.vue';
import AppNavbar from './/AppNavbar/index.vue';
import AppMain from './AppMain';

export default{
    //注册：均采用了ECMAScript6简写语法
    components:{
        AppHeader,
        AppMain,
        AppNavbar
    }
}
</script>

<style scoped>
/*头部区域*/
.header{
    position: absolute;
    line-height: 50px;
    background-color: #A6D3F2;
    left: 0px;
    right: 0px;
    top: 0px;

}
/*左侧导航*/
.navbar{
    position:absolute;
    width:200px;
    background-color:#545c64;
    left: 0px;
    bottom: 30px;
    top:50px;
    overflow-y: auto;
}
/*主内容*/
.main{
    position: absolute;
    top: 50px;
    right: 0px;
    bottom: 30px;
    left: 200px;
    padding: 10px;
    overflow-y: auto;
}
div.el-submenu__title{
    width:200px;
}
/*系统底部*/
.bottom{
    position: absolute;
    background-color: #AFC3A8;
    bottom: 0px;
    left:0px;
    right: 0px;
    height: 30px;
}
</style>