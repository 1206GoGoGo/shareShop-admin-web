import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@/components/layout/Layout'

//const login = r => require.ensure([], () => r(require('@/components/login/login')), 'login');

//管理员路由
const list_kinds = r => require.ensure([], () => r(require('@/components/admin/list_kinds')), 'list_kinds');
const list_admin = r => require.ensure([], () => r(require('@/components/admin/list_admin')), 'list_admin');
const add_admin = r => require.ensure([], () => r(require('@/components/admin/add_admin')), 'add_admin');
//用户路由
const general_info = r => require.ensure([], () => r(require('@/components/user/general_user/general_info')), 'general_info');
const general_record = r => require.ensure([], () => r(require('@/components/user/general_user/general_record')), 'general_record');
const seller_setting = r => require.ensure([], () => r(require('@/components/user/seller_user/seller_setting')), 'seller_setting');
const seller_info = r => require.ensure([], () => r(require('@/components/user/seller_user/seller_info')), 'seller_info');
const seller_income = r => require.ensure([], () => r(require('@/components/user/seller_user/seller_income')), 'seller_income');
const seller_profit = r => require.ensure([], () => r(require('@/components/user/seller_user/seller_profit')), 'seller_profit');
const member_info = r => require.ensure([], () => r(require('@/components/user/seller_user/member_info')), 'member_info');
//商品
const add_product = r => require.ensure([], () => r(require('@/components/product/add_product')), 'add_product');
const list_product = r => require.ensure([], () => r(require('@/components/product/list_product')), 'list_product');
const attr_product = r => require.ensure([], () => r(require('@/components/product/attr_product')), 'attr_product');
const add_cate = r => require.ensure([], () => r(require('@/components/product/product_cate/add_cate')), 'add_cate');
const collect_product = r => require.ensure([], () => r(require('@/components/product/collect_product')), 'collect_product');
//推荐商品
const list_recommend = r => require.ensure([], () => r(require('@/components/product/recommend/list_recommend')), 'list_recommend');
const recommend_kinds = r => require.ensure([], () => r(require('@/components/product/recommend/recommend_kinds')), 'recommend_kinds');
const add_recommend = r => require.ensure([], () => r(require('@/components/product/recommend/add_recommend')), 'add_recommend');
//订单
const list_orders = r => require.ensure([], () => r(require('@/components/orders/list_orders')), 'list_orders');
const return_orders = r => require.ensure([], () => r(require('@/components/orders/return_orders')), 'return_orders');
//优惠券
const list_coupon = r => require.ensure([], () => r(require('@/components/coupon/list_coupon')), 'list_coupon');
const info_coupon = r => require.ensure([], () => r(require('@/components/coupon/info_coupon')), 'info_coupon');
//评价
const view_user = r => require.ensure([], () => r(require('@/components/news/view_user')), 'view_user');
const comment_user = r => require.ensure([], () => r(require('@/components/news/comment_user')), 'comment_user');
//收入
const list_income = r => require.ensure([], () => r(require('@/components/income/list_income')), 'list_income');

const home = r => require.ensure([], () => r(require('@/components/home')), 'home');


const routes = [
	// {
	// 	path: '/login',
	// 	component: login
	// },
	{
		path:'',
			component:Layout,
			redirect:'/home',
			children: [
			{
				path: '/home',
				name: 'home',
				component:home,
				meta: {title: 'home'}
			}],
	},
//-------------------------------------管理员-------------------------------------------
		{
			path: '/admin',
			component: Layout,
			redirect: '/admin',
			name: 'admin',
			meta: {title: 'Administrator'},
			children:
			[
				{
					path: 'list_kinds',
					name: 'list_kinds',
					component: list_kinds,
					meta: ['Administrator', 'Category'],
					//hidden:true
				},
				{
					path: 'list_admin',
					component: list_admin,
					meta: ['Administrator', 'List'],					
				},
				{
					path: 'add_admin',
					component: add_admin,
					meta: ['Administrator', 'Add'],
				},
			]
		},
//-------------------------------------用户---------------------------------------------
		{
			path: '/user',
			component: Layout,
			redirect: '/user',
			name: 'user',
			meta: {title: 'User'},
			children:
			[
				{
					path: '/user/general_user/general_info',
					name: 'general_info',
					component: general_info,
					meta: ['User', 'Information'],		
				},
				{
					path: '/user/general_user/general_record',
					component: general_record,
					meta: ['User', 'Record'],
				},
				{
					path: '/user/seller_user/seller_setting',
					component: seller_setting,
					meta: ['User', 'Setting'],
				},
				{
					path: '/user/seller_user/seller_info',
					component: seller_info,
					meta: ['User', 'Seller','Information'],
				},
				{
					path: '/user/seller_user/seller_income',
					component: seller_income,
					meta: ['User', 'Seller','Income'],
				},
				{
					path: '/user/seller_user/seller_profit',
					component: seller_profit,
					meta: ['User', 'Seller','Profit'],
					hidden:true
				},
				{
					path: '/user/seller_user/member_info',
					component: member_info,
					meta: ['User','Seller','Information'],
				},
			]
		},
//-------------------------------------商品--------------------------------------------
		{
			path: '/product',
			component: Layout,
			redirect: '/product',
			name: 'product',
			meta: {title: 'Product'},
			children:
			[
				{
					path: '/product/add_product',
					component: add_product,
					meta: ['Product', 'Add'],
				},
				{
					path: '/product/list_product',
					component: list_product,
					meta: ['Product', 'List'],
				},
				{
					path: '/product/attr_product',
					component: attr_product,
					meta: ['Product', 'Attributes'],
				},
				{
					path: '/product/product_cate/add_cate',
					component: add_cate,
					meta: ['Product','Category','Add'],
				},
				{
					path: '/product/collect_product',
					component: collect_product,
					meta: ['Product', 'Collect'],
				},
				//推荐商品
				{
					path: '/product/recommend/list_recommend',
					component: list_recommend,
					meta: ['Product','Recommend','List'],
				},
				{
					path: '/product/recommend/recommend_kinds',
					component: recommend_kinds,
					meta: ['Product','Recommend','Category'],
				},
				//推荐记录还是推荐添加？？？？？？？？
				{
					path: '/product/recommend/add_recommend',
					component: add_recommend,
					meta: ['Product','Recommend','Add'],
				},
			]
		},
//------------------------------订单-----------------------------------------------------
		{
			path: '/orders',
			component: Layout,
			redirect: '/orders',
			name: 'orders',
			meta: {title: 'Order'},
			children:
			[
				{
					path: '/orders/list_orders',
					component: list_orders,
					meta: ['Order','List'],
				},
				{
					path: '/orders/return_orders',
					component: return_orders,
					meta: ['Order','Return'],
				},
			]
		},
//-----------------------------------优惠券------------------------------------------
		{
			path: '/coupon',
			component: Layout,
			redirect: '/coupon',
			name: 'coupon',
			meta: {title: 'Coupon'},
			children:
			[
				{
					path: '/coupon/list_coupon',
					component: list_coupon,
					meta: ['Coupon','List'],
				},
				{
					path: '/coupon/info_coupon',
					component: info_coupon,
					meta: ['Coupon','Information'],
				},
			]
		},
//-------------------------------------评价-------------------------------------------
		{
			path: '/news',
			component: Layout,
			redirect: '/news',
			name: 'news',
			meta: {title: 'News'},
			children:
			[
				{
					path: '/news/view_user',
					component: view_user,
					meta: ['News','View'],
				},
				{
					path: '/news/comment_user',
					component: comment_user,
					meta: ['News','Comment'],
				},
			]
		},
//----------------------------收入---------------------------------------------------
		{
			path: '/income',
			component: Layout,
			redirect: '/income',
			name: 'income',
			meta: {title: 'Income'},
			children:
			[
				{
					path: '/income/list_income',
					component: list_income,
					meta: ['Income','List'],
				},
			]
		},	
	]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
