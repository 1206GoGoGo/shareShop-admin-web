<!--普通用户、会员、seller近7天的注册量--------------------------------------------->

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
        //改变主题颜色
        this.chart = echarts.init(this.$refs.myEchart)
        // 把配置和数据放这里
        this.chart.setOption({
            color: ["#13CE66", "#20a0ff", "#F7BA2A"],
            title: {
                text: '注册用户',
                //subtext: '显示近7天数据',
                x: 'left'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                    color: '#999'
                    }
                },
            },
            // toolbox: {
            //     feature: {
            //         dataView: { show: true, readOnly: false },
            //         magicType: { show: true, type: ['bar'] },
            //         //restore: { show: true },
            //         //saveAsImage: { show: true }
            //     }
            // },
            legend: {
                data: ['普通用户', '会员','seller']
            },
            xAxis: [
            {
                type: 'category',
                name: '时间',
                data: ['4/8','4/9','4/10','4/11','4/12','4/13','4/14'],
                axisPointer: {
                    type: 'shadow'
                }
            }],
            yAxis: 
            [{
                type: 'value',
                name: '注册量',
                min: 0,
                max: 2500,
                interval: 500,
                axisLabel: {
                    formatter: '{value}'
                }
            }],
            series: [
                {
                    name: '普通用户',
                    type: 'bar',
                    data: [182, 239, 234, 1970, 1344, 630, 234]
                },
                {
                    name: '会员',
                    type: 'bar',
                    data: [125, 238, 310, 1594, 1341, 681, 234]
                },
                {
                    name: 'seller',
                    type: 'bar',
                    data: [195, 238, 310, 594, 141, 607, 1231]
                }
            ],  
        })
    }
  }
}
</script>