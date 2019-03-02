<template>
    <div class="login-bg">
        <div class="center-panel">
            <div class="title-pic">商城后台管理系统</div>
            <div class="form-area">
                <el-form :rules="rules" :model="formdata" ref="log-form">
                    <el-form-item prop="user.username">
                        <el-col :span="20" :offset="2">
                            <el-input v-model="formdata.user.username" placeholder="请输入用户名">
                                <img width="20" style="margin-top:10px;padding-right:10px;" slot="prefix" src="../../assets/user-logo.png">
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item prop="user.password">
                        <el-col :span="20" :offset="2">
                            <el-input type="password" v-model="formdata.user.password" placeholder="请输入密码">
                                <img width="20" style="margin-top:10px;padding-right:10px;" slot="prefix" src="../../assets/password-logo.png">
                            </el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="8" :offset="2" >以何种身份登录？</el-col>
                        <el-col :span="12" style="height:40px;line-height:40px;padding-top:10px;    text-align: right;">
                            <el-switch
                                style="display: block"
                                v-model="formdata.level"
                                active-color="#13ce66"
                                inactive-color="#409eff"
                                active-text="普通用户"
                                active-value="2"
                                inactive-text="管理员"
                                inactive-value="1">
                            </el-switch>
                        </el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="6" :offset="2">
                            <el-checkbox v-model="formdata.remember">记住密码</el-checkbox>
                        </el-col>
                        <el-col style="text-align:right;" :span="10" :offset="4"> 没有账号?去<span @click="gotoRegist" class="go-reg-text" >注册</span></el-col>
                    </el-form-item>
                    <el-form-item>
                        <el-col :span="20" :offset="2">
                            <el-button 
                            v-loading="login_loading" 
                            type="primary" @click="login">登录</el-button>
                        </el-col>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .d2{
    background: -webkit-linear-gradient(red,yellow,blue); /* Safari 5.1 to 6.0   087f85*/
        background: -o-linear-gradient(red,yellow,blue); /* Opera 11.1 to 12.0 */
        background: -moz-linear-gradient(red,yellow,blue); /* Firefox 3.6 to 15 */
        background: linear-gradient(red,yellow,blue); /* 标准语法 (必须在最后) */
    }

    .d1 {
    background: url("http://csssecrets.io/images/tiger.jpg") 0 / cover fixed;
    }
    main {
        background: hsla(0,0%,100%,.25) border-box;
    }
    
</style>

