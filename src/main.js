// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'// 路由挂载
import router from './router' // 路由列表
// import axios from 'axios';
// import VueAxios from 'vue-axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/mycss/mycss.scss' ; //全局修改样式

// import '@/icons'

// import Vuex from 'vuex'
// Vue.use(Vuex)

import store from './store'
// import VCharts from 'v-charts'

Vue.config.productionTip = false

//全局引入axios
//需要npm两个包axios和vue-axios
Vue.use(ElementUI);
// Vue.use(VueAxios,axios);

// Vue.use(VCharts);


// Vue.use(VueRouter);  


// axios.defaults.baseURL = process.env.BASE_API;


// Vue.prototype.storage=window.localStorage;     本来就有



// Vue.filter('UserRoleFilter', function (value) {
//   if (value===1)
//       value = "管理员";
//   else{
//       value ="一般用户";
//   };
//   return value;
// })

// router.beforeEach(function(to,from,next){
//   console.log("aaaaaaaaaaa"+to.path+"------"+store.state.isLogined);
//   if(to.meta.loginRequired)
//   {
//     if(store.state.isLogined)
//         next();
//     else
//       next({path:'/login'});
//   }
//   else
//     {
//         next();
//     }

// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
