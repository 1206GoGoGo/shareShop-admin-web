<template>
<div>
  <el-row :gutter="20">
    <el-col :xs="12" :sm="12" :lg="12" >
      <ve-ring :data="chartData1" height="300px" :settings="chartSettings"></ve-ring>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="12" >
      <ve-ring :data="chartData2" height="300px" :settings="chartSettings"></ve-ring>
    </el-col>
  </el-row>
</div>
</template>

<style scoped>
  /* .vcharts{
    height: 162px;
    width: 70%;
    border-radius: 25px;
  } */
</style>

<script>
  export default {
    data () {
      this.chartSettings = {
        //控制显示条数
        limitShowNum: 7,
        //控制环状的半径和位置
        radius: [65,85],
        offsetY: 185,
        
      }
      return {
        chartData1: {
          label:'用户访问量',
          columns: ['日期', 'Visitors'],
          rows: [
            { '日期': '1/1', 'Visitors': 1393 },
            { '日期': '1/2', 'Visitors': 3530 },
            { '日期': '1/3', 'Visitors': 2923 },
            { '日期': '1/4', 'Visitors': 1723 },
            { '日期': '1/5', 'Visitors': 3792 },
            { '日期': '1/6', 'Visitors': 4593 },
            { '日期': '1/7', 'Visitors': 4593 }
          ]
        },
        chartData2: {
          label:'收入',
          columns: ['日期', 'Revenue'],
          rows: [
            { '日期': '1/1', 'Revenue': 1393 },
            { '日期': '1/2', 'Revenue': 3530 },
            { '日期': '1/3', 'Revenue': 2923 },
            { '日期': '1/4', 'Revenue': 1723 },
            { '日期': '1/5', 'Revenue': 3792 },
            { '日期': '1/6', 'Revenue': 4593 },
            { '日期': '1/7', 'Revenue': 4593 }
          ]
        },
      }
    }
  }
</script>