<!--网站近7天的访问量、球状图-------------------------------------------------------->

<template>
  <div :class="className" :style="{height:height,width:width}" ref="myEchart"></div>
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
      default: '350px'
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
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart)
      // 把配置和数据放这里
      this.chart.setOption({        
        color: ["#19d4ae", "#5ab1ef", "#fa6e86","#ffb980","#c4b4e4","#d87a80","#0067a6"],
        title : {
            text: '网站访问量',
            subtext: '显示近7天数据',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['4/8','4/9','4/10','4/11','4/12','4/13','4/14']
        },
        series : [
            {
                name: '网站访问量',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'4/8'},
                    {value:310, name:'4/9'},
                    {value:234, name:'4/10'},
                    {value:135, name:'4/11'},
                    {value:1548, name:'4/12'},
                    {value:334, name:'4/13'},
                    {value:1035, name:'4/14'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
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