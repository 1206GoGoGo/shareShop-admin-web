<template>
  <div id="app">
    <!--在vue的模板中 所有的内容要被一个根节点包含起来 -->

    <!-- <el-container>
      <el-header>
        <headPanel>
        </headPanel>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <sider></sider>
        </el-aside>
        <el-container>
          <el-main>
            <mainPanel>
            </mainPanel>
          </el-main>
          <el-footer>
            <footPanel>
            </footPanel>
          </el-footer>
        </el-container>
      </el-container>
    </el-container> :routes="routes"-->


    <el-container>
      <el-aside width="230px">
          <sider :routes="routes"></sider>
      </el-aside>
      <el-container>
          <el-header>
            <headPanel style="margin-left=200px;">
          </headPanel>
          </el-header>
          <el-main>
            <mainPanel></mainPanel>
          </el-main>
      </el-container>
    </el-container>

</div>
</template> 

<script>
import headPanel from '@/components/index/headPanel'
import sider from '@/components/index/sider'
import mainPanel from '@/components/index/mainPanel'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'sider'
    ]),
    routes() {
      return this.$router.options.routes
    },
    // isCollapse() {
    //   return !this.sider.opened
    // }
  },
  name: 'App',
  data:function(){
    return {
      //count: 0
      
    }
  },

  methods:{
     handleClick (e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    },
    hh(){
      this.height.height=window.innerHeight-153+'px';
    }
  },
  components:{
    headPanel,
    sider,
    mainPanel,
  },
}
</script>

<style>

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



.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
}

/* 
.el-main{
  padding:0px;
}
.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .5s;
} */
</style>
