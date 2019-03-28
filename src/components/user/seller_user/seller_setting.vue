<template>
    <div class="app-container">
        <el-card shadow="never" class="card">
            <div class="setting">
                <el-form :inline="true" :model="DiscountSetting" size="small" ref="SettingForm" label-width="140px">
                    <el-alert class="alert"
                        title="Note that the unit of the discount here is the percentage"
                        type="warning"
                        show-icon
                        :closable="false">
                    </el-alert>
                    Member Discount:
                    <div class="block">
                        <el-slider                       
                        v-model="DiscountSetting.discountRate"
                        show-input>
                        </el-slider>
                    </div>
                    Seller Discount:
                    <div class="block">
                        <el-slider                       
                        v-model="DiscountSetting.sellerDiscountRate"
                        show-input>
                        </el-slider>
                    </div>
                    Seller Commission:
                    <div class="block">
                        <el-slider                        
                        v-model="DiscountSetting.yieldRate"
                        show-input>
                        </el-slider>
                    </div>
                    <el-form-item>
                        <el-button
                        class="btn"
                        @click="confirm('SettingForm')"
                        type="primary">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import { getDiscountSetting,updateDiscountSetting } from '@/api/user';
const defaultDiscountSetting = {
    discountId:null,
    discountRate:0,
    sellerDiscountRate:0,
    yieldRate:0
  };

export default {
    created(){
      this.getDetail();
    },

    data(){
        return{
            DiscountSetting: Object.assign({}, defaultDiscountSetting),
        }
    },
    methods:{
        //获取优惠信息
        getDetail(){
            getDiscountSetting().then(response=>{
                this.DiscountSetting=response.data;
            })
        },

        //提交修改优惠设置
        confirm(){
            this.$confirm('是否要提交修改?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              updateDiscountSetting(this.DiscountSetting).then(response=>{
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
.setting{
    margin: 30px 60px;
    /* margin-left: 60px; */
}
.block{
    padding: 10px;
    width: 80%;
}
.alert{
    width:85%;
    margin-bottom: 30px;
}
.card{
    width: 70%;
}
</style>


