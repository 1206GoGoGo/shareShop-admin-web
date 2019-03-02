import Vue from 'vue'
import Router from 'vue-router'

// import login from './login.js'
import user from './user.js'
import product from './product.js'
import orders from './orders.js'   
import news from './news.js'   
import income from './income.js'   
import admin from './admin.js'


Vue.use(Router)
// mainPanel[0].children=mainPanel[0].children.concat(user,product,orders,news,income,admin);

// console.log(mainPanel);

export default new Router({
      // path: '/index',
      // name: 'left',
      // component: sider
      mode:'hash',
      // routes:[].concat(headPanel,mainPanel,login)
      routes:[].concat(user,product,orders,news,income,admin)
    
  
})

// export default new Router({
//   mode:'hash',
//   routes:[].concat(xtwh,xxtx,zyxx,xtqx,kck,zhcx,kcjjgl)
// })
