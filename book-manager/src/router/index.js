import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login/index.vue";
import Layout from "@/components/Layout.vue";
import Home from "@/views/home/index.vue";

import Bookinfo from "@/views/book/bookinfo.vue";
import Booktype from "@/views/book/booktype.vue";

import StockSearch from "@/views/stock/stocksearch.vue";
import InstockSearch from "@/views/stock/instocksearch.vue";
import OutstockSearch from "@/views/stock/outstocksearch.vue";

import User from "@/views/user/user.vue";

Vue.use(VueRouter);

const routes = [
  {//登录路由
    path: "/login",
    name: "login",
    component: Login
  },
  {
    //主页路由
    path:"/",
    name:"layout",
    component:Layout,
    children:[//设置为layout的子路由
        {
          path:"/home",
          component:Home,
          meta:{
            title:'首页'
          }
        },
        {
          path:"/bookinfo",
          component:Bookinfo,
          meta:{
            title:'图书信息'
          }
        },{
          path:"/booktype",
          component:Booktype,
          meta:{
            title:'图书类型'
          }
        },{
          path:"/stocksearch",
          component:StockSearch,
          meta:{
            title:'库存查询'
          }
        },{
          path:"/instocksearch",
          component:InstockSearch,
          meta:{
            title:'入库查询'
          }
        },{
          path:"/outstocksearch",
          component:OutstockSearch,
          meta:{
            title:'出库查询'
          }
        },{
          path:"/user",
          component:User,
          meta:{
            title:'用户信息'
          }
        },

    ]
  }
  
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
