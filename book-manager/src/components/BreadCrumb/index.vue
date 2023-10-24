<template>
    <el-breadcrumb v-show="this.$route.path!='/home'" separator-class="el-icon-arrow-right">
    <span class="line">|</span>
    <el-breadcrumb-item :to="{ path:this.$route.path  }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-show="this.$route.path=='/bookinfo'||this.$route.path=='/booktype'">图书管理</el-breadcrumb-item>
    <el-breadcrumb-item v-show="this.$route.path=='/stocksearch'||this.$route.path=='/instocksearch'||this.$route.path=='/outstocksearch'">
        图书库存管理</el-breadcrumb-item>
    <el-breadcrumb-item :to="{ path:this.$route.path}">{{this.$route.meta.title}}</el-breadcrumb-item>
</el-breadcrumb>
</template>
<style>
.el-breadcrumb{
    height: 10px;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0, 0.1);
}
.line{
    position: absolute;
    left: 8px;
    color: white;
    border-left: 3px solid red;
}
</style>