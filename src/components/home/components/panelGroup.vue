<template>
  <el-row class="panel-group" :gutter="35">
    <!--第一个-->
    <el-col :xs="10" :sm="10" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="orders()">
        <div class="card-panel-icon-wrapper icon-deliver">
          <svg-icon icon-class="deliver" class-name="card-panel-icon"></svg-icon>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">To Be Delivered</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="1020" :duration="2600"></count-to>
        </div>
      </div>
    </el-col>
    <!--第二个 @click="handleSetLineChartData('shoppings')"-->
    <el-col :xs="10" :sm="10" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="orders()">
        <div class="card-panel-icon-wrapper icon-Refund">
          <svg-icon icon-class="Refund" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Pending Refund</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="130" :duration="3600"></count-to>
        </div>
      </div>
    </el-col>
    <!--第三个-->
    <el-col :xs="10" :sm="10" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="orders()">
        <div class="card-panel-icon-wrapper icon-tight">
          <svg-icon icon-class="tight" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">Tight Inventory</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="90" :duration="3200"></count-to>
        </div>
      </div>
    </el-col>
    <!--第四个-->
    <el-col :xs="10" :sm="10" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="orders()">
        <div class="card-panel-icon-wrapper icon-system">
          <svg-icon icon-class="system" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">System Error</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="3" :duration="3600"></count-to>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    orders(){
      this.$router.push({path:"../../orders/list_orders"});
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  //margin-top: 10px;
  .card-panel-col{
    margin-bottom: 25px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      // .card-panel-icon-wrapper {
      //   color: #fff;
      // }
      .icon-deliver {
        //  background: #40c9c6;
        background: #f2f2f2;
      }
      // .icon-message {
      //   background: #36a3f7;
      // }
      .icon-tight {
        // background: #f4516c;
        background: #f2f2f2;
      }
      .icon-Refund {
        // background: #34bfa3
        background: #f2f2f2;
      }
      .icon-system{
        background: #f2f2f2;
      }
    }
    .icon-deliver {
      color: #36a3f7;
    }
    // .icon-message {#40c9c6;
    //   color: #36a3f7;
    // }
    .icon-system{
      color: #808080;
    }
    .icon-tight {
      color: #f4516c;
    }
    .icon-Refund {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 30px 0 0 10px;
      padding: 8px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 28px;
    }
    .card-panel-description {
      margin-top:30px;
      margin-right:10px;
      float: right;
      font-weight: bold;
      //margin: 10px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
