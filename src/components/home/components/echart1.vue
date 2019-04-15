<template>
  <div :class="className" :style="{height:height,width:width}" ref="myEchart">
  </div>
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['订单数', '加购物车数', '金额']
        },
        xAxis: [
          {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow'
            }
          }],
        yAxis: [
          {
            type: 'value',
            name: '单价',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} dollars'
            }
          },
          {
            type: 'value',
            name: '比数',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value}'
            }
          }],
        series: [
          {
            name: '订单数',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 6.4, 3.3, 76.7, 32.6, 20.0, 135.6, 162.2]
          },
          {
            name: '加购物车数',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7,6.0, 2.3, 48.7, 18.8, 70.7,182.2, 195.6]
          },
          {
            name: '金额',
            type: 'line',
            yAxisIndex: 1,
            data: [2.0, 2.2, 3.3, 4.5, 6.3,5.0, 6.2, 10.0, 10.2,16.5, 20.3, 23.4]
          }]
      })
    }
  }
}
</script>