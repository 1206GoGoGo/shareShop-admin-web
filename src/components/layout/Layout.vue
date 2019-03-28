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

#app {
  font-family:'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
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

</style>