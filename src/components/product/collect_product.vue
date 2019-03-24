<template>
    <div class="app-container">
<!--条件搜索 S-->
        <el-card shadow="never" style="background:#f2f2f2;">
            <div>
                <i class="el-icon-search"></i>
                <span>条件搜索</span>
                <el-button
                    style="float: right"
                    @click="handleSearchList()"
                    type="primary"
                    size="small">
                    查询结果
                </el-button>
                <el-button
                    style="float: right;margin-right: 15px"
                    @click="handleResetSearch()"
                    size="small">
                    重置
                </el-button>
            </div>
            <div style="margin-top: 10px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="收藏用户：">
                        <el-input style="width: 203px" v-model="listQuery.username" placeholder="登陆名"></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称：">
                        <el-input style="width: 203px" v-model="listQuery.name" placeholder="真实姓名"></el-input>
                    </el-form-item>  
                    <!-- <el-form-item>
                        <el-alert class="alert"
                            title="You only need to enter one query condition."
                            type="warning"
                            show-icon
                            style="margin-left:40px; padding-left:20px; width:100%; height:35px; !important"
                            :closable="false">
                        </el-alert>
                    </el-form-item> -->
                </el-form> 
                
            </div>
        </el-card>
<!--条件搜索 E-->
<!--信息的表头 S-->
        <el-table
        highlight-current-row
        :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" align='center' label="编号" width="50">
            </el-table-column>
            <el-table-column label="收藏用户" width="160" align="center">
                <template slot-scope="scope">{{scope.row.username}}</template>
            </el-table-column>
            <el-table-column label="商品名称" align="center">
                <template slot-scope="scope">{{scope.row.productName}}</template>
            </el-table-column>
            <el-table-column label="收藏总数" width="100" align="center">
                <template slot-scope="scope">{{scope.row.count}}</template>
            </el-table-column>
            <el-table-column label="收藏时间" width="180" align="center">
                <template slot-scope="scope">{{scope.row.registerTime}}</template>
            </el-table-column>
            <el-table-column label="操作" width="160" align="center">
                <template slot-scope="scope"  >       
                    <!-- <el-button
                        size="mini"
                        @click="handleUpdateUser(scope.$index, scope.row)">编辑
                    </el-button>                 
                     -->
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
<!--信息的表头 E-->
<!--分页 S-->
        <div class="pagination-container">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :current-page.sync="listQuery.pageNum"
                :page-size="listQuery.pageSize"
                :page-sizes="[5,10,15]"
                :total="total">
            </el-pagination>
        </div>
<!--分页 E-->

<!--修改信息的弹出框 S-->
        <el-dialog                    
            title="用户信息"
            
            :visible.sync="dialogVisible" width="70%">
            <el-form :model="UserDetail" :inline="true"
                    ref="DetailForm" label-width="150px">
                <!-- <el-form-item label="编号:">
                    <el-input v-model="UserDetail.userInfoId" class="input-width" readonly></el-input>
                </el-form-item> -->
                <el-form-item label="登录名:">
                    <el-input v-model="UserDetail.username" class="input-width" readonly></el-input>
                </el-form-item>
                <el-form-item label="姓名:">
                    <el-input v-model="UserDetail.name" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="手机号:">
                    <el-input v-model="UserDetail.phoneNumber" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:">
                    <el-input v-model="UserDetail.email" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="用户级别:">
                    <el-select v-model="UserDetail.level" placeholder="请选择" clearable class="input-width">
                        <el-option v-for="item in selectlevel"
                            class="input-width"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="性别:"><!--到显示框中就不可用！！！！！！！！！！！！！-->
                    <el-radio-group v-model="UserDetail.gender" class="input-width">
                        <el-radio :label="0">Male</el-radio>
                        <el-radio :label="1">Female</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="证件号码:">
                    <el-input v-model="UserDetail.identityCardNo" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="证件类型:">
                    <el-select v-model="UserDetail.identityCardType" placeholder="请选择" clearable class="input-width">
                        <el-option v-for="item in IDCardType"
                            class="input-width"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                </el-form-item>
                <!-- <el-form-item label="用户状态:">
                    <el-select v-model="UserDetail.status" placeholder="全部" clearable class="input-width">
                        <el-option v-for="item in UserDetail.status"
                            class="input-width"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                </el-form-item> -->
                <el-form-item label="注册时间:">
                    <el-date-picker
                        v-model="UserDetail.registerTime"
                        class="input-width"
                        type="date"
                        placeholder="Please Select Time">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="出生年月:">
                    <el-date-picker
                        v-model="UserDetail.birthday"
                        class="input-width"
                        type="date"
                        placeholder="Please Select Time">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirm">确 定</el-button>
            </span>
        </el-dialog>
<!--修改信息的弹出框 E-->
    </div>
</template>

<script>

import {fetchList,getUserDetail,updateUser,deleteUser} from '@/api/user'
import {formatDate} from '@/utils/date';
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    
    // userInfoId:null,  ？？
    name:null,
    username:null,
    phoneNumber:null,
    identityCardNo:null,
    email:null,
    level:null
  };

export default {
    data(){
        return{
            listQuery: Object.assign({}, defaultListQuery),
            dialogVisible:false,
            IDCardType:[
                {
                    label: "IDP",
                    value: 0
                },
                {
                    label: "USP",
                    value: 1
                },
                {
                    label: "SSN",
                    value: 2
                }
            ],
            selectlevel:[
                {
                    label: "seller",
                    value: '0'
                },
                {
                    label: "member",
                    value: '1'
                }
            ],
            // list: null,
            list: [{
                userInfoId:23233432,
                name:'张三',
                username:'dsddfdf',
                count:'1',
                phoneNumber:12362734349,
                identityCardNo:344321323443,
                productName:'23627834@qq.com',
                registerTime:'2018-3-28',
                identityCardType:2,
                // status:'正常',
                birthday:'2010-8-24',
                gender:'0',
            },
            {
                userInfoId:23233432,
                name:'张三',
                username:'dsddfdf',
                count:'0',
                phoneNumber:12362734349,
                identityCardNo:344321323443,
                productName:'23627834@qq.com',
                registerTime:'2001-9-28',
                identityCardType:1,
                // status:'正常',
                birthday:'1994-8-12',
                gender:'1',
            },
            {
                userInfoId:23233432,
                name:'张三',
                username:'dsddfdf',
                count:'0',
                phoneNumber:12362734349,
                identityCardNo:344321323443,
                productName:'23627834@qq.com',
                registerTime:'1990-8-8',
                identityCardType:0,
                // status:'正常',
                birthday:'1990-8-8',
                gender:'0',
            }
            ],

            //listLoading: true,
            
            UserDetail:{
                userInfoId:null,
                name:null,
                username:null,
                phoneNumber:null,
                identityCardNo:null,
                email:null,
                registerTime:null,
                identityCardType:null,
                status:null,
                birthday:null,
                gender:null,
            },
        }
    },

    //过滤器 格式化
    filters: {
        //日期转变
        dateFormatter(time) {
            let date = new Date(time);
            return formatDate(date, 'MM.dd.yyyy hh:mm:ss')
        },
        genderFormatter(value){
            if(value === "0"){return 'Male'} else {return 'Female'}
        },
        // //状态转变
        // statusFormatter(value){
        //     if(value === "1"){return 'Normal'} else {return 'unNormal'}
        // },
        //证件类型
        idFormatter(value)
        {
            if(value===0){return 'IDP'} //驾照
            else if(value===1){return 'USP'} //护照
            else {return 'SSN'}  //社会安全号
        }
    },
    // created:{
    //     getList();
    // },
    methods:{
        //级别转换
        levelFormatter:function(row,column){
            let level=row.level
            if(level === '0'){return 'seller'} 
            else if(level === '1'){return 'member'}
        },

        //初始化
        // getList(){
        //     getLists().then();
        // },

        //重置
        handleResetSearch(){
            this.listQuery = Object.assign({}, defaultListQuery);
        },

        //获取搜索列表
        getSearchList(){
            this.listLoading=true;
            //this.listQuery即为搜索条件
            fetchList(this.listQuery).then(response => {
                this.listLoading = false;
                this.list = response.data;
                this.total = response.data.total;
            });
        },

        //获取搜索结果
        handleSearchList(val){
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;
            this.getSearchList();
        },

        //获取状态异常用户  这里的fetchList方法接口可能不对！!!!!!
        handleSearchException(){
            this.status=0
            fetchList(this.status).then(response => {
                this.listLoading = false;
                this.list = response.data.list;
                this.total = response.data.total;
            });
        },

        //获取用户详细信息
        // handleUpdateUser(index, row){
        //     this.dialogVisible=true;
        //     this.userInfoId=row.userInfoId;
        //     getUserDetail(row.userInfoId).then(response=>{
        //         this.UserDetail=response.data;
        //     });
        // },

        //获取用户详细信息
        handleUpdateUser(index, row) {
            this.dialogVisible = true;
            // this.isEdit = true;
            this.UserDetail = Object.assign({},row);
        },

        //修改用户信息  this.managerInfoId
        handleConfirm(){ 
          updateUser(this.UserDetail).then(response=>{
            this.dialogVisible=false;
            // this.managerInfoId=null;
            this.$message({
              message: '修改成功！',
              type: 'success',
              duration:1000
              });
                // this.getSearchList(); 
            });
        },

        //删除用户
        handleDelete(index, row){
            let ids=[];
            ids.push(row.userInfoId);
            this.deleteUser(ids);
        },
        
        //删除详细信息
        deleteUser(ids){
            this.$confirm('是否要进行该删除操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
            //let params = new URLSearchParams(); //?????????????post 还是get??????
            //params.append("ids",ids);
            deleteUser(this.userInfoId).then(response=>{
                this.$message({
                message: '删除成功！',
                type: 'success',
                duration: 1000
                });
                this.listQuery.pageNum=1;
                // this.getSearchList();     
                });
            })
        },

        //获取页码
        handleSizeChange(val){
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;
            // this.getList();       
        },
        //获取当前页
        handleCurrentChange(val) {
            this.listQuery.pageNum = val;
            // this.getList();        
        },

        handleSelectionChange(){},
    }
}
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .input-width {
        width: 203px;
    }
</style>


