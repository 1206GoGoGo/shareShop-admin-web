<template>
  <div class="home-container">
      <el-row :gutter="35">
        <el-col :xs="10" :sm="10" :lg="8" class="card-panel-col">
          <calendar></calendar>
        </el-col>
        <el-col :xs="14" :sm="14" :lg="16" class="card-panel-col">
          <el-card class="box-card">
            <onsale></onsale>
          </el-card>
        </el-col>
      </el-row>
      <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
      <!-- <el-row :gutter="25">
          <el-col :xs="10" :sm="10" :lg="12" class="card-panel-col">
            <el-card class="box-card">
              <register></register>
            </el-card>
          </el-col>
          <el-col :xs="10" :sm="10" :lg="12" class="card-panel-col">
            <el-card class="box-card">
              <userVechart></userVechart>
            </el-card>
          </el-col>
      </el-row>
      <el-row >
        <el-card class="box-card">
          <echart></echart>
        </el-card>
      </el-row> -->
  </div>
</template>

<script>
import PanelGroup from './components/panelGroup'
// import echart from './components/echart'
import calendar from './components/calendar'
// import process from './components/process'
// import register from './components/register'
import onsale from './components/onsale'
// import userVechart from './components/userVechart'

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
    // echart,
    calendar,
    // register,
    onsale,
    // userVechart
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis
    }
  },
  methods: {
    //方法未知！！！
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    },
    
     /**
     * 按APP版本分布统计
     */
    appVersionlStat(beginTime = null, endTime = null, statInterval) {
        let params = appVersion;
        if (null != beginTime && null != endTime) {
            params = Object.assign({'starttime': beginTime, 'endtime': endTime}, params)
        }
        if (this.mock) {
            params = Object.assign({'statFunc': 'appVersionlStat', 'type': 0}, params)
        }
        aggregate(params).then(data => {                    
            this.app_version.title.text = 'APP 注册版本统计' + statInterval;
            for (let i = 0; i < data.length; i++) {
                let value = data[i].num;
                let bluVer = data[i]._id.bluVer;
                let deviceType = data[i]._id.deviceType;
                if (1 == deviceType) {
                    deviceType = 'android';
                    this.app_version.series[0].data.push({value: value, name: deviceType + ' ' + bluVer});
                } else if (2 == deviceType) {
                    deviceType = 'ios'
                    this.app_version.series[1].data.push({value: value, name: deviceType + ' ' + bluVer})
                }
                this.app_version.legend.data.push(deviceType + ' ' + bluVer);
            }
        });
    },



  }
}
</script>

<style scoped>
  .home-container{
    padding: 25px 25px 0px 25px;
    background-color: #f2f2f2;
  }
</style>
