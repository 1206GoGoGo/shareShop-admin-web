<template>
    <div class="app-container">
<!--添加须知 S-->        
        <el-card shadow="never" class="box-card" :class="showInfo? 'show': 'hide'"> 
            <div slot="header" class="clearfix" @click="show">
                <el-button style="float: left; padding: 3px 0" type="text">添加须知</el-button>
            </div>
            <div class="text item" v-if="showInfo">
                <p>1、超级管理员可以管理所有功能</p>
                <p>2、普通管理员可以管理部分模块</p>
            </div>
        </el-card>
<!--添加须知 E-->      
<!--添加管理员部分 S  inline-message-->
        <div class="table-container">
            <el-form :inline="true"  :model="AddManagerForm" status-icon :rules="Vrules" ref="AddManagerForm" label-width="140px" size="small">
                <el-form-item label="权限:" class="formclass" prop="level">
                    <el-select v-model="AddManagerForm.level" placeholder="请选择" style="width:203px">
                      <el-option v-for="item in selectlevel"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                      </el-option>
                    <!-- <el-option label="权限一" value="shanghai"></el-option>
                    <el-option label="权限二" value="beijing"></el-option> -->
                    </el-select>
                </el-form-item>
                <el-form-item label="登陆名:" class="formclass" prop="username">
                    <el-input clearable  v-model="AddManagerForm.username" style="width:203px" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码:" class="formclass" prop="password">
                    <el-input type="password" v-model="AddManagerForm.password" style="width:203px" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" class="formclass" prop="checkPass">
                    <el-input type="password" v-model.number="AddManagerForm.checkPass" style="width:203px"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名:" class="formclass" prop="name">
                    <el-input clearable  v-model="AddManagerForm.name" style="width:203px" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号码:" class="formclass" prop="phoneNumber">
                    <el-input clearable  v-model.number="AddManagerForm.phoneNumber" style="width:203px" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" class="formclass" prop="email">
                    <el-input clearable  v-model="AddManagerForm.email" style="width:203px" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="证件类型:" prop="identityCardType">
                    <el-select v-model="AddManagerForm.identityCardType" placeholder="请选择" style="width:203px">
                      <el-option v-for="item in selectCardType"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="证件号码:" prop="identityCardNo">
                    <el-input clearable v-model="AddManagerForm.identityCardNo" autocomplete="off" style="width:203px"></el-input>
                </el-form-item> -->
                
                <!-- <el-form-item label="出生日期:">
                    <el-date-picker
                        class="input-width"
                        v-model="AddManagerForm.birthday"
                        value-format="yyyy-MM-dd"
                        type="date"
                        style="width:203px"
                        placeholder="请选择时间">
                    </el-date-picker>
                </el-form-item> -->
                <el-form-item class="formclass" label="性别:" prop="gender">
                    <el-radio-group v-model="AddManagerForm.gender" style="width:203px">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item style="display:block; margin-left:340px; margin-top:20px;">
                    <el-button type="primary" @click="submitForm('AddManagerForm')">提交</el-button>
                    <el-button @click="resetForm('AddManagerForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
<!--添加管理员部分 E-->
    </div>
</template>

<script>
import {AddManager} from '@/api/admin'

const defaultAddManagerForm = {
    username:'',
    name:'',
    password: '',
    checkPass: '',
    phoneNumber:'',
    identityCardType:'',
    identityCardNo:'',
    level:'',
    gender:'',
    email: '',
    birthday:'', 
  };
export default {
    data(){
      //验证密码
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

      //再次输入密码
      var validateCheckPass = (rule, value, callback) => {
        if (this.AddManagerForm.password === '') {
          callback(new Error('请先输入密码'));
        } else if(value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value != this.AddManagerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      //验证手机号
      var checkphoneNumber = (rule, value, callback) => {
        if(this.AddManagerForm.phoneNumber === '') {
          callback(new Error('请输入手机号'));
        } else if (!Number.isInteger(value)) {
          callback(new Error('请输入数字'));
        } else {
          callback();
        }
      };
      // else if (value!=/^1[34578]\d{8}$/) {
      //     callback(new Error('必须为10位数'));
      //   }

      //验证手机号
      //  var checkphoneNumber = (rule, value, callback) => {
      //   if (!value) {
      //     return callback(new Error('请输入手机号'));
      //   }
      //   setTimeout(() => {
      //     if (!Number.isInteger(value)) {
      //       callback(new Error('请输入数字值'));
      //     } else {
      //       if (length(value) != 10) {
      //         callback(new Error('必须为10位数'));
      //       } else {
      //         callback();
      //       }
      //     }
      //   }, 1000);
      // };

      //检查证件号
      // var checkNo = (rule, value, callback) => {
      //   // alert(typeof value);//value的值是一个string类型的
      //   // console.log(typeof value)
      //   if (!value) {
      //     callback(new Error('证件号码不能为空'));
      //   } else if (!Number.isInteger(value)) {
      //       callback(new Error('请输入数字'));
      //     } 
      //     else {
      //       callback();
      //     }
      // };

      return {
        showInfo: false,  
        AddManagerForm: Object.assign({}, defaultAddManagerForm),
        selectCardType:[
            {
              label: "IDP", //驾照
              value: 0
            },
            {
                label: "SSN", //社会安全码
                value: 1
            }
        ],
        selectlevel: [{
            value: 11,
            label: 'General Admin'
            },{
            value: 20,
            label: 'Super Admin'
        }],
        Vrules: {
          username: [
            { required: true, message: '请输入登录名', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
          ],
          name:[
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' },
            { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validateCheckPass, trigger: 'blur' }
          ],
          phoneNumber:[
            { validator: checkphoneNumber, trigger: 'blur' },
          ],
          // identityCardNo:[
          //   { required: true, message: '请输入证件号码', trigger: 'blur' }
          // ],
          // identityCardType:[
          //   { required: true, message: '请选择证件类型', trigger: 'change' }
          // ],
          level:[
            { required: true, message: '请选择权限', trigger: 'change' }
          ],
          // gender:[
          //   { required: true, message: '请选择性别', trigger: 'change' }
          // ],
          // birthday:[
          //   { type: 'array', required: true, message: '请选择出生日期', trigger: 'change' },
          // ],
          email:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }         
          ],
        }
      };

    },

    methods:{

//公告显示与隐藏 
        show(){
                this.showInfo = !this.showInfo
            },

//提交
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            // if (valid) {
            //     alert('submit!');
            //     } else {
            //     console.log('error submit!!');
            //     return false;
            //     }
            //怎么报注册失败信息？？？？？？？？？？？？？？？？？？？？？
              AddManager(this.AddManagerForm).then(response=>{
                this.$message({
                  message: '添加成功！',
                  type: 'success',
                  duration:1000
                  });
                  this.$router.push({path: '/admin/list_admin'})  
                });
            });
        },

        // //提交信息
        // submitForm(){     //怎么报注册失败信息？？？？？？？？？？？？？？？？？？？？？
        //   AddManager(this.AddManagerForm).then(response=>{
        //     this.$message({
        //       message: '修改成功！',
        //       type: 'success',
        //       duration:1000
        //       });
        //       this.$router.push({path: '/admin/list_admin'})  
        //     });
        // },

        //重置
        resetForm(formName) {
          this.$refs[formName].resetFields();
          this.AddManagerForm = Object.assign({}, defaultAddManagerForm);
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
        /* width: 950px; */
        width:100%;
    }
    .show{
		height: 160px;
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
        /* width: 95%; */
    }

    .formclass{
      margin-bottom:18px;
    }
</style>
