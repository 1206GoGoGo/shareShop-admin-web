<template>
<div>
  <el-row :gutter="20">
    <el-col :xs="12" :sm="12" :lg="12" >
      <ve-ring :data="chartData1" v-model="visitor" height="300px" :settings="chartSettings"></ve-ring>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="12" >
      <ve-ring :data="chartData2"  v-model="Revenue" height="300px" :settings="chartSettings"></ve-ring>
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
// import {getLists} from '@/api/user'
  export default {
    computed(){
      this.getInfo()
    },
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
          columns: ['Date', 'Visitors'],
          rows: [
            { 'Date': '1/1', 'Visitors': 1393 },
            { 'Date': '1/2', 'Visitors': 3530 },
            { 'Date': '1/3', 'Visitors': 2923 },
            { 'Date': '1/4', 'Visitors': 1723 },
            { 'Date': '1/5', 'Visitors': 3792 },
            { 'Date': '1/6', 'Visitors': 4593 },
            { 'Date': '1/7', 'Visitors': 4593 }
          ]
        },
        chartData2: {
          // label:'收入',
          columns: ['Date', 'Revenue'],
          rows: [
            { 'Date': '1/1', 'Revenue': 1393 },
            { 'Date': '1/2', 'Revenue': 3530 },
            { 'Date': '1/3', 'Revenue': 2923 },
            { 'Date': '1/4', 'Revenue': 1723 },
            { 'Date': '1/5', 'Revenue': 3792 },
            { 'Date': '1/6', 'Revenue': 4593 },
            { 'Date': '1/7', 'Revenue': 4593 }
          ]
        },
      }
    },
    methods:{
      getInfo(){
        
        // visitorList().then(response => {
        //     this.chartData1 = response.data;
        // });
        // rows: [
        //     { 'Date': this.chartData1.date, 'Visitors': this.chartData1.count },
        //     { 'Date': this.chartData1.date, 'Visitors': this.chartData1.count },
        //     { 'Date': this.chartData1.date, 'Visitors': this.chartData1.count },
        //     { 'Date': this.chartData1.date, 'Visitors': this.chartData1.count },
        //     { 'Date': this.chartData1.date, 'Visitors': this.chartData1.count },
        //     { 'Date': this.chartData1.date, 'Visitors': this.chartData1.count },
        //     { 'Date': this.chartData1.date, 'Visitors': this.chartData1.count }
        //   ]
      },
    }
  }
</script>