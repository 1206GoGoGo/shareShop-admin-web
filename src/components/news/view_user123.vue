<template>
  <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">网站浏览量</el-menu-item>
      <el-menu-item index="2">网站注册量</el-menu-item>
      <!-- <el-submenu index="2">网站注册量 -->
        <!-- <template slot="title">网站注册量</template> -->
        <!-- <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item> -->
        <!-- <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu> -->
      <!-- </el-submenu> -->
      <el-menu-item index="3">对比查询</el-menu-item>
  </el-menu>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods:{
        //路由跳转处理
        handleSelect:function(index,indexpath){
            var locthis=this;
            switch(index)
            {
                //通过index来控制路由跳转
                case "1":locthis.$router.push({path:'/xqdm'});break;
                case "2":locthis.$router.push({path:'/xqdm'});break;
                case "3":locthis.$router.push({path:'/xqdm'});break;
                default:console.log("跳转错误");
            }
        }

    }
  }
</script>