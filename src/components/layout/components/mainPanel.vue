<template>
    <!-- <el-container class="main-panel">  -->
      <transition name="fade" mode="out-in">
          <router-view>
              
          </router-view>
      </transition>
    <!-- </el-container> -->
</template>

<script>
//主界面
export default {
    name:"mainPanel",
    data:function(){
        return {

        }
    },
    
}
</script>

<style scoped>

/* 第二次 */
/*.el-main{
    padding: 0px !important;
    position: relative;
    height: 100%;
}
.main-panel{
    padding: 0px !important;
     position: absolute; 
    top:60px;
    bottom:0px;
    right:0px;
    left:200px;
    overflow: auto;
}  */

/* 第一次 */
/*.header-ceiling{
     border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden; 

    margin: 0px;
    background: #20b2aa;
    padding: 5px 0;
    overflow: hidden;
}*/
/* .header-ceiling-main{
    float: right;
    margin-right: 15px;
}
.header-ceiling-main a{
    color: #ffffff;
    text-decoration: none;
}
.header-icon{
    color: #ffffff;
} */

/* 第三次 */
/* .fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .2s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .2s;
} */


 
/* .main-panel{
    position: relative;
    top:0px;
    bottom:0px;
    right:0px;
    left:0px;
    overflow: auto;
} */
/*
.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .2s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .2s;
} */
</style>
