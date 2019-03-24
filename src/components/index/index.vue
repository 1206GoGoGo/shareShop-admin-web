<template>
    <el-container>
      <el-aside >
         <Sider></Sider>
      </el-aside>
      <el-main>
        <MainPanel ></MainPanel>
        <el-popover
            placement="top-start"
            width="200"
            trigger="hover"
            >
            <el-row :gutter="2" class="user-info-item">
               <el-col :span="8">昵称</el-col>
               <el-col :span="16">{{getNickName}}</el-col>
            </el-row>
            <el-row :gutter="2" class="user-info-item">
               <el-col :span="8">用户名</el-col>
               <el-col :span="16">{{getUsername}}</el-col>
            </el-row>
            <el-row :gutter="2" class="user-info-item">
               <el-col :span="8">身份</el-col>
               <el-col :span="16">{{getLevel|UserRoleFilter}}</el-col>
            </el-row>
            <el-row :gutter="2" class="user-info-item-button">
               <el-col :span="24">
                   <el-button size="mini" type="danger" @click="logOut" round>退出登录</el-button>
               </el-col>
               
            </el-row>
            <div class="user-info" slot="reference"> 
                <img width="27" style="" src="../../assets/index-user-logo.png">
                <span>{{getNickName}}</span>
            </div>
        </el-popover> 
      </el-main>
    </el-container>
</template>

<script>
import Sider from '@/components/index/sider'
import MainPanel from '@/components/index/mainPanel'

export default {
    name:'index',
    data:function(){
        return{
        }
    },
    components:{
        Sider,
        MainPanel
    },
    computed:{
        getUsername(){
            return this.$store.state.user.username;
        },
        getNickName(){
            return this.$store.state.user.nickname;
        },
        getLevel(){
            return this.$store.state.user.level;
        },
        isLogined(){
            return this.$store.state.isLogined;
        },
    },
    methods:{
        logOut:function(){
             this.$store.commit('logOut');
             window.localStorage.removeItem('user');
             console.log("logout");
             this.$router.push({path:'../../user/login'});
        }
    }


}
</script>
<style scoped>
.el-main{
  padding:0px;

}
.user-info-item{
    height:30px;
    padding:3px 7px;
    padding-left:12px;
    margin-bottom: 8px;
    line-height: 30px; 
    border-bottom:0px solid #f5f5f5;
}
.user-info-item .el-col{
    height:30px;
    line-height: 30px;
    position: relative;
    
}
.user-info-item:hover{
    background-color: #f5f5f5;
}
.user-info-item:before{
    position: absolute;
    content: "";
    height:24px;
    width:3px;
    background-color: #6f7beb;
    left:0px;
    top:3px;

}
.user-info-item-button{
    margin-top:17px;
    text-align: center;
}
.user-info{
    position: absolute;
    top:8px;
    right:100px;
    width:180px;
    height:40px;
    line-height:40px;
    overflow: hidden;
    cursor: pointer;
    padding-left: 10px;
    
}
.user-info>*{
    float: left;
    /* display: inline-block; */
    line-height:40px;
} 
.user-info>img{
    margin-right:10px;
    margin-top:6px;
    border-radius: 27px;
    box-shadow: 0 0 4px 1px lightgray;
}
.user-info>span{
    font-size: 1.1em;
    height:40px;
    line-height: 40px;
    
    
}
</style>



