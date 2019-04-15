<template>
  <div class="home-container">
      <el-row :gutter="35">
        <el-col :xs="10" :sm="10" :lg="8" class="card-panel-col">
          <calendar></calendar>
        </el-col>
        <el-col :xs="14" :sm="14" :lg="16" class="card-panel-col">
          <el-card class="box-card">
            <process></process>
          </el-card>
        </el-col>
      </el-row>
    <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
    <el-row :gutter="25">
        <el-col :xs="10" :sm="10" :lg="12" class="card-panel-col">
          <el-card class="box-card">
            <register></register>
          </el-card>
        </el-col>
        <el-col :xs="10" :sm="10" :lg="12" class="card-panel-col">
          <!-- <onsale>style="background:#fff;padding:16px 16px 0;margin-bottom:25px;"</onsale> -->
          <el-card class="box-card">
            <UserVechart></UserVechart>
          </el-card>
        </el-col>
    </el-row>
    <el-row >
      <el-card class="box-card">
        <echart></echart>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/panelGroup'
import echart from './components/echart'
import calendar from './components/calendar'
import process from './components/process'
import register from './components/register'
// import onsale from './components/onsale'
import UserVechart from './components/UserVechart'

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  name: 'home',
  components: {
    PanelGroup,
    echart,
    calendar,
    process,
    register,
    // onsale
    UserVechart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<!---<style rel="stylesheet/scss" lang="scss" scoped>
.home-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>-->

<style scoped>
  .home-container{
    padding: 25px;
    background-color: #f2f2f2;
  }
  /* .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px; 
  } */
</style>
