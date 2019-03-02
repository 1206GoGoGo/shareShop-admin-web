<template>
    <div class="app-container">
<!--公告部分 S-->        
        <el-card class="box-card" :class="showInfo? 'show': 'hide'"> 
            <div slot="header" class="clearfix" @click="show">
                <el-button style="float: left; padding: 3px 0" type="text">公告</el-button>
                <!-- <el-button style="float: right; padding: 3px 0" type="text"   @click="show">{{msg}}</el-button> -->
            </div>
            <div class="text item" v-if="showInfo">
                <p>1、超级管理员可以管理所有功能</p>
                <p>2、客服管理员可以管理消息模块</p>
                <p>3、订单管理员可以处理用户订单</p>
                <p>4、商品管理员可以管理商品动态</p>
            </div>
        </el-card>
<!--公告部分 E-->      
<!--添加管理员部分 S-->
        <div class="table-container">
            <el-form :inline="true" :model="AddManagerForm" status-icon :rules="Vrules" ref="AddManagerForm" label-width="100px" >
                <el-form-item label="登陆名:"  prop="username">
                    <el-input  v-model="AddManagerForm.username" style="width:203px" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名:" prop="name">
                    <el-input  v-model="AddManagerForm.name" style="width:203px" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="password">
                    <el-input type="password" v-model="AddManagerForm.password" style="width:203px" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" prop="checkPass">
                    <el-input type="password" v-model.number="AddManagerForm.checkPass" style="width:203px"></el-input>
                </el-form-item>
                <el-form-item label="证件类型:">
                    <el-select v-model="AddManagerForm.identityCardType" placeholder="请选择" style="width:203px">
                    <el-option label="身份证" value="IDcard"></el-option>
                    <el-option label="通行证" value="Passcard"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码:" prop="identityCardNo">
                    <el-input  v-model="AddManagerForm.identityCardNo" autocomplete="off" style="width:203px"></el-input>
                </el-form-item>
                 <el-form-item label="权限:">
                    <el-select v-model="AddManagerForm.level" placeholder="请选择" style="width:203px">
                    <el-option label="权限一" value="shanghai"></el-option>
                    <el-option label="权限二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别:">
                    <el-radio-group v-model="AddManagerForm.gender" style="width:203px">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生日期:">
                    <!-- v-model="listQuery.createTime" -->
                    <el-date-picker
                        class="input-width"
                        v-model="AddManagerForm.birthday"
                        value-format="yyyy-MM-dd"
                        type="date"
                        style="width:203px"
                        placeholder="请选择时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="邮箱:" prop="age">
                    <el-input  v-model="AddManagerForm.age" style="width:203px" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="but">
                    <el-button type="primary" @click="submitForm('AddManagerForm')">提交</el-button>
                    <el-button @click="resetForm('AddManagerForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
<!--添加管理员部分 E-->
    </div>
</template>

<script>
export default {
    data(){
        var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.AddManagerForm.checkPass !== '') {
            this.$refs.AddManagerForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.AddManagerForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        showInfo: false,  
        AddManagerForm: {
          pass: '',
          checkPass: '',
          identityCardType:'',
          identityCardNo:'',
          level:'',
          gender:'',
          age: '',
          resource:'',
          birthday:'',  
          pickerOptions1: {
            disabledDate(time) {
                return time.getTime() > Date.now();
            },
          },
          
        },
        Vrules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };

    },

    methods:{
//公告显示与隐藏方法 S
        show(){
                this.showInfo = !this.showInfo
            },
//公告显示与隐藏方法 E
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
                } else {
                console.log('error submit!!');
                return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
}
</script>

<style scoped>
    /* .text {
        font-size: 14px;
    } */
    .item {
        margin-bottom: 18px;
        /* padding: 20px; */
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .box-card {
        width: 990px;
    }
    .show{
		height: 220px;
	}
    .hide{
        height: 59px;
    }
    .text p{
        padding: 5px;
    }
    
    .table-container{
        border: 1px solid #ebeef5;
        padding: 20px;
        width: 90%;
    }

    /* .btn{
        align-content: center;
    } */
</style>
