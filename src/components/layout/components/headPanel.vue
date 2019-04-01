<template v-model="isCollapse">
    <div class="header_container" >
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }"><span class="Index">Index</span></el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, layout) in $route.meta" :key="layout"><span class="Index">{{item}}</span></el-breadcrumb-item>
        </el-breadcrumb>

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
    .header_container{
        /* background-color: #EFF2F7; */
        background-color: #f2f2f2;
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
        padding-left: 20px;
        margin-left:0px;
    }
    
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
