<template> 
  <el-card class="form-container" shadow="never">
      <!-- :model="orderSetting"  :rules="rules"-->
    <el-form   
             ref="orderSettingForm"
             
             label-width="150px">
      <el-form-item label="正常订单超过：" prop="normalOrderOvertime">
          <!-- v-model="orderSetting.normalOrderOvertime" -->
        <el-input       class="input-width">
          <template slot="append">分</template>
        </el-input>
        <span class="note-margin">未付款，订单自动关闭</span>
      </el-form-item>
      <el-form-item label="发货超过：" prop="confirmOvertime">
           <!-- v-model="orderSetting.confirmOvertime" -->
        <el-input      class="input-width">
          <template slot="append">天</template>
        </el-input>
        <span class="note-margin">未收货，订单自动完成</span>
      </el-form-item>
      <el-form-item label="订单完成超过：" prop="finishOvertime">
          <!-- v-model="orderSetting.finishOvertime" -->
        <el-input       class="input-width">
          <template slot="append">天</template>
        </el-input>
        <span class="note-margin">自动结束交易，不能申请售后</span>
      </el-form-item>
      <el-form-item label="订单完成超过：" prop="commentOvertime">
          <!-- v-model="orderSetting.commentOvertime" -->
        <el-input        class="input-width">
          <template slot="append">天</template>
        </el-input>
        <span class="note-margin">自动五星好评</span>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="confirm('orderSettingForm')"
          type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
    
}
</script>

<style scoped>
    .input-width {
    width: 50%;
  }

  .note-margin {
    margin-left: 15px;
  }
</style>
