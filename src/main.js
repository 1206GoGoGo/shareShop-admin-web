// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'// 路由挂载
import router from './router' // 路由列表
import axios from 'axios';
import VueAxios from 'vue-axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/mycss/mycss.scss' ; //全局修改样式

import '@/icons'

//引入图表
import Vuex from 'vuex'
import VCharts from 'v-charts'
// import ECharts from 'vue-echarts/components/ECharts.vue'
// Vue.component('chart', ECharts)


Vue.use(Vuex)
Vue.use(VueAxios,axios);
import store from './store'


Vue.config.productionTip = false

//全局引入axios
//需要npm两个包axios和vue-axios
Vue.use(ElementUI);
// Vue.use(VueAxios,axios);

Vue.use(VCharts);


// Vue.use(VueRouter);  


axios.defaults.baseURL = process.env.BASE_API;

Vue.prototype.storage=window.localStorage;    


// import '@/permission' // permission control
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
