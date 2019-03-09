//引入mockjs
const Mock = require('mockjs')

//使用mockjs模拟数据
// Mock.mock('/admin/list_admin', (req, res) => {
//     return {
// 		// data: ['a','b'],
// 		data:{
// 			'managerInfoId|10000-1000000': 1,
// 			'username|2': 'value',
// 			'name|1': '张三',
// 			'gender|1': '男',
// 			'level|1':'超级管理员',
// 			'registerTime|1':'2019-08-1',
// 			'phoneNumber|10000-1000000': 1,
// 			'identityCardNo|1':'身份证',
// 			'email|1':289738237,    
// 			'birthday|1':23627463,	
// 		}
//     }
// })


Mock.mock('/admin/list_admin', "get", {
		// data: ['a','b'],
		"data":{
			'managerInfoId': 123342,
			'username': 'sdd',
			'name': '张三',
			'gender': '男',
			'level':'超级管理员',
			'registerTime':'2019-08-1',
			'phoneNumber': 14234343,
			'identityCardNo': 1343434,
			'identityCardType':'身份证',
			'email':'28973823@qq.com',    
			'birthday':'1993-08-1',	
		}
		
})

// Mock.mock(ApiPath.user.getUserInfo, "get", {
// 	    "code": 0,
// 	    "data": {
// 	      "fullName": "@CNAME", // 随机生成中文人名
// 	      "userId": 1000234234001,
// 	      "username": "zhangsan"
// 	    },
// 	    "msg": "success"


// 'managerInfoId|10000-1000000': 1,
// 			'username|2': 'value',
// 			'name|1': '张三',
// 			'gender|1': '男',
// 			'level|1':'超级管理员',
// 			'registerTime|1':'2019-08-1',
// 			'phoneNumber|10000-1000000': 1,
// 			'identityCardNo|10000-1000000': 1,
// 			'identityCardType|1':'身份证',
// 			'email|1':289738237,    
// 			'birthday|1':23627463,	
// 	})

