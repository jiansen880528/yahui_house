<template>
    <div class="main">
        <h1>欢迎进入图书信息管理系统</h1>
        <div>
        <!--查询图表条件-->
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="图书名称" prop="bookName" size="mini">
                <el-input v-model="formInline.bookName" placeholder="图书名称"></el-input>
            </el-form-item>
            <el-form-item label="图书类型" prop="bookType" size="mini">
                 <el-select v-model="formInline.bookType" placeholder="图书类型">
                    <el-option v-for="options in this.bookTypeOptions" :value="options.type" :label="options.name" :key="options.type"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item  size="mini">
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
    </div>
        <!--显示图表-->
        <div >
            <el-row class="el-row-chart">
                <el-col class="el-col-chart">
                    <div ref="chartDiv1" class="chart1"></div>
                </el-col>
                <el-col class="el-col-chart">
                    <div ref="chartDiv2" class="chart2"></div>
                </el-col>
            </el-row>
            <el-row class="el-row-chart">
                <el-col class="el-col-chart">
                    <div  ref="chartDiv3" class="chart3"></div>
                </el-col>
                <el-col class="el-col-chart">
                    <div ref="chartDiv4" class="chart4"></div>
                </el-col>
            </el-row>
        
        </div>
    </div>
</template>
<script>
import * as echarts from "echarts"
import bookinfoApi from '@/api/bookinfo'

export default{
    
    data(){
        return {
            //图表位置
            chartDiv:null,
            //图表数据
            bookTypeData:{
                bookType:[],
                bookSum:[],
            },
            //图表2数据
            bookTypeData2:[],
            //查询条件
            formInline:{
                bookName:'111',
                bookType:'编程类',
            },
             bookTypeOptions:[
                {type:'1',name:'编程类'},
                {type:'2',name:'前端类'},
                {type:'3',name:'设计类'},
                {type:'4',name:'移动开发类'},
]
        }
    },
    created(){
    },
    mounted(){
      bookinfoApi.getBookType().then(response=>{
          const resp=response.data;
          if(resp.flag){  
              this.bookTypeData.bookType=resp.data.bookType;
              this.bookTypeData.bookSum=resp.data.quantitySum;
              //console.log("bookType"+this.bookTypeData.bookType);
              //console.log("bookSum"+this.bookTypeData.bookSum);
              this.$nextTick(()=>{
                console.log("mounted===========================");
                console.log("bookTypeData:booktype="+this.bookTypeData.bookType);
                console.log("bookTypeData:bookSum="+this.bookTypeData.bookSum);
                this.drawLineZ();
      
              })
            }else{
              this.$message({
                message:resp.message,
                type:'warning'
              })
            }
          })
          bookinfoApi.getEchartData().then(response=>{
            const resp=response.data  
            if(resp.flag){
              this.bookTypeData2=resp.data//JSON.stringify(resp.data)
              //console.log(JSON.stringify(resp.data))
              this.$nextTick(()=>{
                console.log("bookTypeData2"+JSON.stringify(this.bookTypeData2));
                console.log("mounted===========================");
                console.log("bookTypeData:booktype="+this.bookTypeData.bookType);
                console.log("bookTypeData:bookSum="+this.bookTypeData.bookSum);
                this.drawLinePie();
      
              })
              
        }else{
          this.$message({
            message:resp.message,
            type:'warning'
          })
        }
      })
      
    },
    computed:{
        option1(){
            const option1= {
                color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
                title: {
                  text: '图书信息'
                },
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'cross',
                    label: {
                      backgroundColor: '#6a7985'
                    }
                  }
                },
                legend: {
                  data:this.bookTypeData.bookType// ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
                },
                toolbox: {
                  feature: {
                    //saveAsImage: {}
                  }
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  }
                ],
                yAxis: [
                  {
                    type: 'value'
                  }
                ],
                series: [
                  {
                    name: this.bookTypeData.bookType[0],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                      width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                      opacity: 0.8,
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgb(128, 255, 165)'
                        },
                        {
                          offset: 1,
                          color: 'rgb(1, 191, 236)'
                        }
                      ])
                    },
                    emphasis: {
                      focus: 'series'
                    },
                    data: this.bookTypeData.bookSum
                  },
                  {
                    name:this.bookTypeData.bookType[1],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                      width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                      opacity: 0.8,
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgb(0, 221, 255)'
                        },
                        {
                          offset: 1,
                          color: 'rgb(77, 119, 255)'
                        }
                      ])
                    },
                    emphasis: {
                      focus: 'series'
                    },
                    data:this.bookTypeData.bookSum
                  },
                  {
                    name: this.bookTypeData.bookType[2],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                      width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                      opacity: 0.8,
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgb(55, 162, 255)'
                        },
                        {
                          offset: 1,
                          color: 'rgb(116, 21, 219)'
                        }
                      ])
                    },
                    emphasis: {
                      focus: 'series'
                    },
                    data: this.bookTypeData.bookSum
                  },
                  {
                    name: this.bookTypeData.bookType[3],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                      width: 0
                    },
                    showSymbol: false,
                    areaStyle: {
                      opacity: 0.8,
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgb(255, 0, 135)'
                        },
                        {
                          offset: 1,
                          color: 'rgb(135, 0, 157)'
                        }
                      ])
                    },
                    emphasis: {
                      focus: 'series'
                    },
                    data: this.bookTypeData.bookSum
                  },
                  {
                    name: this.bookTypeData.bookType[4],
                    type: 'line',
                    stack: 'Total',
                    smooth: true,
                    lineStyle: {
                      width: 0
                    },
                    showSymbol: false,
                    label: {
                      show: true,
                      position: 'top'
                    },
                    areaStyle: {
                      opacity: 0.8,
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: 'rgb(255, 191, 0)'
                        },
                        {
                          offset: 1,
                          color: 'rgb(224, 62, 76)'
                        }
                      ])
                    },
                    emphasis: {
                      focus: 'series'
                    },
                    data: this.bookTypeData.bookSum
                  }
                ]
              };
                        
            return option1;
        },
        option2(){
            const option2 = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                    name: '图表分析',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                    },
                    labelLine: {
                      show: false
                    },
                    data: this.bookTypeData2
                    
                    }
                ]
            };
            return option2;
        },
        option3(){
            const option3 = {
            title: [
              {
                text: '图书类型信息'
              }
            ],
            polar: {
              radius: [30, '80%']
            },
            radiusAxis: {
              max: 4
            },
            angleAxis: {
              type: 'category',
              data: this.bookTypeData.bookType,//['a', 'b', 'c', 'd'],
              startAngle: 75
            },
            tooltip: {},
            series: {
              type: 'bar',
              data: [2, 1.2, 2.4, 3.6],//this.bookTypeData.bookSum,
              coordinateSystem: 'polar',
              label: {
                show: true,
                position: 'middle',
                formatter: '{b}: {c}'
              }
            },
            animation: false
          };
        return option3
        },

        option4(){
            const option4={
                xAxis: {
                    type: 'category',
                    data: this.bookTypeData.bookType 
                    //             ["设计类","前端类","编程类","移动开发类","后端类"]
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                    data:  this.bookTypeData.bookSum,//[120, 200, 150, 80, 70, 110, 130],//
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)'
                        }
                    }
                ]
            };
            return option4
        },
        //echar图表标题
        title1(){
            console.log(this.formInline)
            return this.formInline.bookType+'统计图'
        }
       
    },
    watch:{
        option1(newVal,oldVal){
            if(newVal!==oldVal){
              // this.chart=echarts.init(this.$refs['chartDiv1'])
              this.chartDemo.setOption(newVal);
            }
        }
    }
    ,
    methods:{
        drawLineZ(){
            //基于准备好的Dom,初始化echarts
            this.chartDemo=echarts.init(this.$refs['chartDiv1'])
            //alert("进入drawLine")
            this.chartDemo.setOption(this.option1,true)//为true就可以删除Echarts画布历史数据重新渲染，虽为可选项，但是
                //要加上，后面再次回到首页就会重新绘制，默认为false。就会与前面的options合并。
            
            

            this.chartDemo3=echarts.init(this.$refs['chartDiv3'])
            //alert("进入drawLine")
            this.chartDemo3.setOption(this.option3,true)

            this.chartDemo4=echarts.init(this.$refs['chartDiv4'])
            //alert("进入drawLine")
            this.chartDemo4.setOption(this.option4,true)
        },
        drawLinePie(){
          this.chartDemo2=echarts.init(this.$refs['chartDiv2'])
            //alert("进入drawLine")
            this.chartDemo2.setOption(this.option2,true)
        },
        //查询列表
        onSubmit(){

        }
    }
}
</script>

<style>
h1{
    text-align: center;
}
.chart1,.chart2,.chart3,.chart4{
    width: 100%;
    height: 100%;
}
.el-row-chart{
    width: 100%;
    height: auto;
    display: flex;
}
.el-col-chart{
    height: 300px;
    margin-top: 10px;
    
    margin-right:10px ;
    flex: 1;
   
}

</style>