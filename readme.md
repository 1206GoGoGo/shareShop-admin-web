#### backstage management of eshop
### 说明
基于Vue+ElementUI的电商后台管理员系统。
### 项目介绍
ShoppingMall是一个电商后台管理系统的前端项目，基于Vue+Element实现。 主要包括商品管理、订单管理、用户管理、管理员管理、商城页面管理、统计收入、优惠券管理、消息管理等功能。（暂定，可能有所变动）
### 项目结构
src -- 源码目录
├── api -- axios网络请求定义
├── assets -- 资源文件
    ├── images -- 静态图片资源文件
    ├── mycss -- 全局自定义样式文件
├── router -- vue-router路由配置
├── store -- vuex的状态管理
├── utils -- 工具类
└── components -- 组件封装页面
    ├── index -- 通用导航页面
    ├── login -- 登录页
    ├── admin -- 管理员页面
    ├── user -- 用户页面
    ├── coupon -- 优惠券页面
    ├── income -- 收入统计页面
    ├── news -- 消息页面
    ├── product -- 商品页面
    ├── orders -- 订单页面
    └── pagesetting -- 商城页面设置