<template>
  <div id="app" class="fillcontain">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
</div>
</template> 

<script>
export default {
  name: 'App',
  methods:{
  },
}
</script>

<style>

.fillcontain{
    height: 100%;
    width: 100%;
}

*{
  margin:0px;
  padding:0px;
}
</style>
