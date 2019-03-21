import Vue from 'vue'
import Router from 'vue-router'

// import login from './login.js'
import user from './user.js'
import product from './product.js'
import orders from './orders.js'   
import news from './news.js'   
import income from './income.js'   
import admin from './admin.js'
import coupon from './coupon.js'


Vue.use(Router)
// mainPanel[0].children=mainPanel[0].children.concat(user,product,orders,news,income,admin);

// console.log(mainPanel);

export default new Router({
      // path: '/index',
      // name: 'left',
      // component: sider
      mode:'hash',
      // routes:[].concat(headPanel,mainPanel,login)
      routes:[].concat(user,product,orders,coupon,news,income,admin)
})


// const routes = [
// 	// {
// 	// 	path: '/',
// 	// 	component: login
// 	// },
// 	{
// 		path: '/manage',
// 		component: manage,
// 		name: '',
// 		children: [{
// 			path: '',
// 			component: home,
// 			meta: [],
// 		},{
// 			path: '/addShop',
// 			component: addShop,
// 			meta: ['添加数据', '添加商铺'],
// 		},{
// 			path: '/addGoods',
// 			component: addGoods,
// 			meta: ['添加数据', '添加商品'],
// 		},{
// 			path: '/userList',
// 			component: userList,
// 			meta: ['数据管理', '用户列表'],
// 		},{
// 			path: '/shopList',
// 			component: shopList,
// 			meta: ['数据管理', '商家列表'],
// 		},{
// 			path: '/foodList',
// 			component: foodList,
// 			meta: ['数据管理', '食品列表'],
// 		},{
// 			path: '/orderList',
// 			component: orderList,
// 			meta: ['数据管理', '订单列表'],
// 		},{
// 			path: '/adminList',
// 			component: adminList,
// 			meta: ['数据管理', '管理员列表'],
// 		},{
// 			path: '/visitor',
// 			component: visitor,
// 			meta: ['图表', '用户分布'],
// 		},{
// 			path: '/newMember',
// 			component: newMember,
// 			meta: ['图表', '用户数据'],
// 		},{
// 			path: '/uploadImg',
// 			component: uploadImg,
// 			meta: ['文本编辑', 'MarkDown'],
// 		},{
// 			path: '/vueEdit',
// 			component: vueEdit,
// 			meta: ['编辑', '文本编辑'],
// 		},{
// 			path: '/adminSet',
// 			component: adminSet,
// 			meta: ['设置', '管理员设置'],
// 		},{
// 			path: '/sendMessage',
// 			component: sendMessage,
// 			meta: ['设置', '发送通知'],
// 		},{
// 			path: '/explain',
// 			component: explain,
// 			meta: ['说明', '说明'],
// 		}]
// 	}
// ]





// export default new Router({
//   mode:'hash',
//   routes:[].concat(xtwh,xxtx,zyxx,xtqx,kck,zhcx,kcjjgl)
// })
