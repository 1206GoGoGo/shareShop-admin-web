<template v-model="isCollapse">
    <div class="header_container" >
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/mainPanel' }"><span class="Index">Index</span></el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index"><span class="Index">{{item}}</span></el-breadcrumb-item>
        </el-breadcrumb>

        <!-- @command="handleCommand" -->
        <!-- <el-dropdown       menu-align='start'>
            <img src="@/assets/images/girl.png" class="avator">
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="home">首页</el-dropdown-item>
                <el-dropdown-item command="signout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown> -->
    <!-- <template v-for="item in routes">
        <router-link tag="li"  class="nav-item nav-dropdown"  v-if="!item.hidden&&item.children&&item.children.length>0" :to="item.path+''+item.children[0].path"  disabled>
            <div class="nav-link nav-dropdown-toggle" @click="handleClick"><Icon :type="item.icon" color="red"/>{{ item.name}}  </div>
            <ul class="nav-dropdown-items">
                <li class="nav-item" v-for="child in item.children" :key="child" v-if='!child.hidden' @click="addActive">
                    
                    <router-link :to="item.path+'/'+child.path+'/'+child.children[0].path" class="nav-link" v-if="!child.hidden&&child.children" ><Icon :type="child.icon" color="red" />{{ child.name}} </router-link> 
                    <router-link :to="item.path+'/'+child.path" class="nav-link" v-else="!child.children" ><Icon :type="child.icon"  color="red" /> {{ child.name}} </router-link> 
                </li>
            </ul>
        </router-link>
    </template> -->

        <el-popover
            placement="top-start"
            width="240"
            trigger="hover">
            <el-row :gutter="2" class="user-info-item">
               <el-col :span="10" style="text-align: right;">Login Name:</el-col>
               <el-col :span="14" style="text-align: center;">csy</el-col><!--如果名字太长就截掉-->
            </el-row>
            <el-row :gutter="2" class="user-info-item">
               <el-col :span="10" style="text-align: right;">Real Name:</el-col>
               <el-col :span="14" style="text-align: center;">changshiying</el-col>
            </el-row>
            <el-row :gutter="2" class="user-info-item">
               <el-col :span="10" style="text-align: right;">Permission:</el-col>
               <el-col :span="14" style="text-align: center;">Super Admin</el-col><!--{{}}-->
            </el-row>
            <el-row :gutter="2" class="user-info-item-button">
                <el-col :span="24">
                    <el-button size="mini" type="primary" round>商城</el-button>
                    <el-button size="mini" type="primary" round>退出</el-button>
                </el-col>
               
            </el-row>
            <div class="user-info" slot="reference"> 
                <img width="27" style="" src="@/assets/images/girl.png">
                <span></span>
            </div>
        </el-popover> 

        <!-- <div class="header-right">
            <a href="#">Quit</a> <span class="header-icon">|</span>
            <a href="#">ShoppingIndex</a>
        </div> -->
    </div>

</template>

<script>
export default {
    props: {
        routes: {
            type: Array
        }
    },
    data(){
        return{
            isCollapse:true
        }
    },
    methods:{
        handleClick (e) {
            e.preventDefault()
            e.target.parentElement.classList.toggle('open')
        },
        addActive(e){
            e.preventDefault()
            e.target.parentElement.parentElement.parentElement.classList.add('open')
        }
    },
}
</script>
<style scoped>
    .Index
    {
        cursor: pointer;
    }
    /* .header{
        background: #EFF2F7;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 20px !important;
        left: 200px !important;
        width: 100% !important;
        height: 60px !important;
        overflow: hidden; 
    } */
    /* .header-right{
        color: #5b6270;
        float: right;
        padding-right: 40px !important;
    }
    .header-right a{
        color: #5b6270;
        text-decoration: none;
    }
     */
    /* a:hover{
        cursor: pointer;
    } */
    /* .header-icon{
        color: #5b6270;
    } */
    .header_container{
        /* background-color: #EFF2F7; */
        background-color: #f2f2f2;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 20px;
    }
    
    /* .wh(36px, 36px); */
	/* .avator{
        
        width: 36px;
        height:36px;
		border-radius: 50%;
		margin-right: 37px;
	}
	.el-dropdown-menu__item{
        text-align: center;
    } */



.user-info-item{
    height:30px;
    padding:3px 7px;
    padding-left:5px;
    margin-bottom: 8px;
    line-height: 30px; 
    border-bottom:0px solid #f5f5f5;
}
.user-info-item .el-col{
    height:30px;
    line-height: 30px;
    position: relative;
    
}
.user-info-item:hover{
    background-color: #f5f5f5;
}
.user-info-item:before{
    position: absolute;
    content: "";
    height:24px;
    width:3px;
    background-color: #6f7beb;
    left:0px;
    top:3px;

}
.user-info-item-button{
    margin-top:15px;
    text-align: center;
}
.user-info{
    position: absolute;
    top:8px;
    right:10px;
    /* width:150px; */
    height:40px;
    line-height:40px;
    overflow: hidden;
    cursor: pointer;
    padding-left: 10px;
    
}
.user-info>*{
    /* float:left; */
    display: inline-block;
    line-height:40px;
} 
.user-info>img{
    margin-right:10px;
    margin-top:6px;
    border-radius: 27px;
    box-shadow: 0 0 4px 1px lightgray;
}
.user-info>span{
    font-size: 1.1em;
    height:40px;
    line-height: 40px;
}

</style>
