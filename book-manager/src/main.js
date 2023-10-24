import Vue from "vue";
import ElementUI from 'element-ui';//这里引入的是js文件，还需要单独引入css文件
import * as echarts from 'echarts';//这里引入echarts
import 'element-ui/lib/theme-chalk/index.css';//index.css这个文件已经在项目的相应目录下

import App from "./App.vue";
import router from "./router";
import axios from 'axios';
import './permission';
import store  from './store'

Vue.use(ElementUI);//指明要使用ELementUI组件
Vue.config.productionTip = false;//指当前处于开发阶段，无须显示生产模式提示的信息。
//通过Vue.prototype为Vue添加一个方法，方法名可自己命名
Vue.prototype.$http=axios;//$http名字是自己任意取得方法名（一般取名为$http,与vue-resource中发送请求名称保持一致）
                          //有了这句话之后，Vue里面就有了$http方法，它实际上就是Axios
Vue.prototype.$echarts=echarts;//$echarts名字是自己任意取得方法名，有了这句话之后，Vue里面就有了$echarts方法，它实际上就是echarts
new Vue({
  router,
  render: h => h(App),
  store
}).$mount("#app");
