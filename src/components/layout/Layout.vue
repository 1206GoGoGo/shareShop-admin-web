<template>
    <el-container>
        <el-aside width="230px" class="aside">
            <sider :default-active="$route.path" :routes="routes"></sider>
        </el-aside>
        <el-container>
            <el-header>
                <headPanel style="margin-left=200px;"></headPanel>
            </el-header>
            <el-main>
                <mainPanel></mainPanel>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// import { headPanel, sider, mainPanel } from '@/components/layout/components'
import headPanel from '@/components/layout/components/headPanel'
import sider from '@/components/layout/components/sider'
import mainPanel from '@/components/layout/components/mainPanel'

import ResizeMixin from './mixin/ResizeHandler'

import { mapGetters } from 'vuex'

export default {
  name: 'layout',
  components: {
    headPanel,
    sider,
    mainPanel
  },
  mixins: [ResizeMixin],
//   computed: {
//     sidebar() {
//       return this.$store.state.app.sidebar
//     },
//     device() {
//       return this.$store.state.app.device
//     },
//     classObj() {
//       return {
//         hideSidebar: !this.sidebar.opened,
//         withoutAnimation: this.sidebar.withoutAnimation,
//         mobile: this.device === 'mobile'
//       }
//     }
//   }
data:function(){
    return {
    }
  },
computed: {
    sider() {
      return this.$store.state.app.sider
    },
    ...mapGetters([
      'sider'
    ]),
    routes() {
      return this.$router.options.routes
    },
  },

}
</script>

<style scoped>
/* //   @import "src/styles/mixin.scss";  rel="stylesheet/scss" lang="scss"
//   .app-wrapper {
//     @include clearfix;
//     position: relative;
//     height: 100%;
//     width: 100%;
//   } */

#app {
  font-family:'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 0px;
  height:100%;
}

*{
  margin:0px;
  padding:0px;
}

.aside{
  margin:0px;
  padding:0px;
}

.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
}


</style>


<!--
<el-container>
        <el-aside width="230px" class="aside">
            <sider :routes="routes"></sider>
        </el-aside>
        <el-container>
            <el-header>
                <headPanel style="margin-left=200px;"></headPanel>
            </el-header>
            <el-main>
                <mainPanel></mainPanel>
            </el-main>
        </el-container>
    </el-container>
-->