<template>
  <div id="app" class="fillcontain">
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
