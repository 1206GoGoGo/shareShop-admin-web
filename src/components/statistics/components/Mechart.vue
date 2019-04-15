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
            text: "Sales Statistics",
            x: 'left'
        },
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
          data: ['总销售额', 'seller销售额', '成本']
        },
        xAxis: [
          {
            type: 'category',
            //name: '月份',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisPointer: {
              type: 'shadow'
            }
          }],
        yAxis: [
          {
            type: 'value',
            //name: '金额',
            min: 0,
            max: 2500,
            interval: 500,
            axisLabel: {
              formatter: '{value} dollars'
            }
          },
          ],
        series: [
          {
            name: '总销售额',
            type: 'bar',
            data: [200, 490, 700, 232, 256, 345, 344, 767, 326, 1200, 1356, 1622]
          },
          {
            name: 'seller销售额',
            type: 'bar',
            data: [246, 545, 650, 264, 207,160, 203, 287, 183, 707,842, 956]
          },
          {
            name: '成本',
            type: 'bar',
            data: [220, 232, 343, 455, 663,570, 682, 100, 102,165, 203, 234]
          }]
      })
    }
  }
}
</script>