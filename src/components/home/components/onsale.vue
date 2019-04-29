<!--商品按分类的销量-------------------------------------------------------------->

<template>
  <div @click="onsale()" :class="className" :style="{height:height,width:width}" ref="myEchart"></div>
</template>
<script>
import echarts from 'echarts'
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '284px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    onsale(){
      this.$router.push({path:'../../statistics/statistic_product'});
    },
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart)
      // 把配置和数据放这里
      this.chart.setOption({  
        //roseType: 'angle',设置成南丁格尔图      
        color: ["#19d4ae", "#5ab1ef", "#fa6e86","#ffb980","#c4b4e4","#d87a80","#0067a6"],
        title : {
            text: '商品分类销量',
            subtext: '按分类显示',
            x:'center'
        },
        //提示框
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['外套','帽子','围巾','袜子','裤子']
        },
        series : [
            {
                //这里面可以设置自己的颜色
                name: '商品分类销量',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'外套'},
                    {value:310, name:'帽子'},
                    {value:234, name:'围巾'},
                    {value:135, name:'袜子'},
                    {value:154, name:'裤子'}
                ],

                itemStyle: {
                    // 鼠标 hover 时候的高亮样式
                    emphasis: {
                        // 阴影的大小
                        shadowBlur: 10,
                        // 阴影水平方向上的偏移
                        shadowOffsetX: 0,
                        // 阴影颜色
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ],
      })
    }
  }
}
</script>