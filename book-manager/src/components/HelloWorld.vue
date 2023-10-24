<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>{{list}}</h3>
    <ul>
      <li v-for="(value,index) in list" :key="index">{{value.bookname}}</li>
    </ul>
    
   
  </div>
</template>

<script>
import testApi from '@/api/test.js'
export default {
  data(){
    return{
      list:[]
    }
    
  },
  //钩子函数，组件创建完毕时执行
  created(){
    this.fetchData();
  },
  methods:{
    fetchData(){
      testApi.getList().then(resp=>{
        console.log(resp.data);
        this.list=resp.data
      }).catch(err=>{
        console.log("请求失败")
      })      
      }
    },
  
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
