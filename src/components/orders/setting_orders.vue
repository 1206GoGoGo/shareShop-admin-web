<template> 
  <el-card class="form-container" shadow="never" style="background:#f2f2f2;">
    <el-form   
             ref="orderSettingForm"
             :model="orderSetting"  :rules="rules"
             label-width="150px">
      <el-form-item label="正常订单超过：" prop="normalOrderOvertime">
        <el-input v-model="orderSetting.normalOrderOvertime" class="input-width" clearable>
          <template slot="append">分</template>
        </el-input>
        <span class="note-margin">未付款，订单自动关闭</span>
      </el-form-item>
      <el-form-item label="发货超过：" prop="confirmOvertime">
        <el-input v-model="orderSetting.confirmOvertime"  class="input-width" clearable>
          <template slot="append">天</template>
        </el-input>
        <span class="note-margin">未收货，订单自动完成</span>
      </el-form-item>
      <el-form-item label="订单完成超过：" prop="finishOvertime">
        <el-input v-model="orderSetting.finishOvertime" class="input-width" clearable>
          <template slot="append">天</template>
        </el-input>
        <span class="note-margin">自动结束交易，不能申请售后</span>
      </el-form-item>
      <el-form-item label="订单完成超过：" prop="commentOvertime">
        <el-input v-model="orderSetting.commentOvertime" class="input-width" clearable>
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
import { getorderSetting,updateorderSetting } from "@/api/orders";

const defaultorderSetting = {
    normalOrderOvertime:null,
    confirmOvertime:null,
    finishOvertime:null,
    commentOvertime:null,
  };

export default {
    data(){
      return{
        orderSetting: Object.assign({}, defaultorderSetting),
      }
    },
    created(){
      this.getDetail();
    },
    methods:{
      //获取优惠信息
      getDetail(){
        getorderSetting().then(response=>{
          this.orderSetting=response.data;
        })
      },

      //提交修改优惠设置
      confirm(){
        this.$confirm('是否要提交修改?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateorderSetting(this.orderSetting).then(response=>{
            this.$message({
              type: 'success',
              message: '提交成功!',
              duration:1000
              });
            })
        });
      },


    }
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
