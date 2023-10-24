<template>
    <div class="navbar">
        <el-row class="tac">
          <el-col :span="12">
            <!-- 对菜单开启路由模式，默认是没有开启状态，“：router="true"” -->
            <el-menu :router="true" default-active="2"
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                <el-menu-item index="/home">
                    <template slot="title">
                         <i class="el-icon-location"></i>
                         <span>首页</span>
                    </template>
                </el-menu-item>
                 <el-submenu index="2">
                    <template slot="title">
                         <i class="el-icon-location"></i>
                         <span>图书管理</span>
                    </template>
                <el-menu-item-group>
                    <el-menu-item index="/booktype">图书类别</el-menu-item>
                
                    <el-menu-item index="/bookinfo">图书信息</el-menu-item>
                </el-menu-item-group>
                    
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">
                         <i class="el-icon-location"></i>
                         <span>图书库存管理</span>
                    </template>
                <el-menu-item-group>
                    <el-menu-item index="/stocksearch">库存查询</el-menu-item>
                    <el-menu-item index="/instocksearch">入库查询</el-menu-item>
                    <el-menu-item index="/outstocksearch">出库查询</el-menu-item>
                </el-menu-item-group>
                    
                </el-submenu>
      <el-menu-item index="/user" >
        <i class="el-icon-s-check"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>

    </el-menu>
  </el-col>
</el-row>
</div>
</template>
<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style scoped>
    .el-menu{
        border-right: none;
    }
  
</style>

    
