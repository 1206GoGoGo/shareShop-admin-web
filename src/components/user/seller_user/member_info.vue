<template>
    <div class="app-container">
<!--条件搜索 S-->
        <el-card shadow="never">
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
                    <!-- <el-form-item label="登录名：">
                        <el-input style="width: 203px" v-model="listQuery.username" placeholder="登陆名"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名：">
                        <el-input style="width: 203px" v-model="listQuery.name" placeholder="真实姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号："> 
                        <el-input style="width: 203px" v-model="listQuery.phoneNumber" placeholder="手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="证件号码：">
                        <el-input style="width: 203px" v-model="listQuery.identityCardNo" placeholder="证件号码"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                        <el-input style="width: 203px" v-model="listQuery.email" placeholder="证件号码"></el-input>
                    </el-form-item> -->
                    <el-form-item label="seller登录名：">
                        <el-input style="width: 203px" v-model="listQuery.sellerName" placeholder="seller登录名"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-alert class="alert"
                            title="Please check the seller's member information here."
                            type="warning"
                            show-icon
                            style="width:100%; padding-left:20px; height:35px;"
                            :closable="false">
                        </el-alert>
                    </el-form-item>
                    <!-- <el-form-item label="用户级别：" prop="level">
                        <el-select v-model="listQuery.level" placeholder="请选择" style="width: 203px">
                            <el-option label="权限一" value="shanghai"></el-option>
                            <el-option label="权限二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item> -->
                </el-form> 
            </div>
        </el-card>
<!--条件搜索 E-->
<!--信息的表头 S-->
        <el-table
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand" label-width="100px">
                        <!-- <el-form-item label="地址：">
                            <span>{{ props.row.firstAddr }}</span>
                        </el-form-item> -->
                        <el-form-item label="真实姓名：">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="邮箱：" class="label-position">
                            <span>{{ props.row.email }}</span>
                        </el-form-item>
                        <el-form-item label="证件类型：">
                            <span>{{ props.row.identityCardType }}</span>
                        </el-form-item>
                        <el-form-item label="证件号码：">
                            <span>{{ props.row.identityCardNo }}</span>
                        </el-form-item>
                        <el-form-item label="用户状态："><!--冻结、可用！！！！！用按钮-可以修改的那种-->
                            <span>{{ props.row.status }}</span>
                        </el-form-item>
                        <el-form-item label="注册时间：">
                            <span>{{ props.row.registerTime }}</span>
                        </el-form-item>
                        <el-form-item label="出生日期：">
                            <span>{{ props.row.birthday }}</span>
                        </el-form-item>
                        <el-form-item label="性别：">
                            <span>{{ props.row.gender }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                style="text-align: center"
                label="编号"
                prop="userInfoId">
            </el-table-column>
            <el-table-column
             style="text-align: center"
                label="登录名"
                prop="username">
            </el-table-column>
            <!-- <el-table-column
             style="text-align: center"
                label="真实姓名"
                prop="name">
            </el-table-column> -->
            <!-- <el-table-column
             style="text-align: center"
                label="用户级别"
                prop="level">
            </el-table-column> -->
            <el-table-column
             style="text-align: center"
                label="手机号"
                prop="phoneNumber">
            </el-table-column>
            <el-table-column label="操作" width="260" align="center">
                <template slot-scope="scope"  >
                    
                    <el-button
                        size="mini"
                        @click="handleUpdateUser(scope.$index, scope.row)">编辑
                    </el-button>
                   
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                    
                    <el-button
                        size="mini"
                        @click="getUserAddr(scope.$index, scope.row)">获取地址
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

        <!-- v-loading="listLoading" -->
        <!-- <div class="table-container">
            <el-table ref="productTable"
                        :data="list"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        
                        border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="编号" width="60" align="center">
                    <template slot-scope="scope">{{scope.row.userInfoId}}</template>
                </el-table-column>
                <el-table-column label="登录名" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="真实姓名" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="手机号" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="用户地址" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="注册时间" width="140" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="用户状态" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="邮箱" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="证件号码" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="证件类型" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="出生日期" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="性别" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="操作" width="160" align="center">
                    <template slot-scope="scope">
                        <p>
                        <el-button
                            size="mini"
                            @click="handleShowUser(scope.$index, scope.row)">查看
                        </el-button>
                        <el-button
                            size="mini"
                            @click="handleUpdateUser(scope.$index, scope.row)">编辑
                        </el-button>
                        </p>
                        <p>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div> -->

<!--修改信息的弹出框 S-->
        <el-dialog                    
            title="用户信息"
            
            :visible.sync="dialogVisible" width="70%">
            <el-form :model="UserDetail"  :inline="true"
                    ref="DetailForm" label-width="150px">
                <el-form-item label="编号:">
                    <el-input v-model="UserDetail.userInfoId" class="input-width" readonly></el-input>
                </el-form-item>
                <!-- <el-form-item label="登录名:">
                    <el-input v-model="UserDetail.username" class="input-width" readonly></el-input>
                </el-form-item> -->
                <el-form-item label="姓名:">
                    <el-input v-model="UserDetail.name" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="手机号:">
                    <el-input v-model="UserDetail.phoneNumber" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:">
                    <el-input v-model="UserDetail.email" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="证件号码:">
                    <el-input v-model="UserDetail.identityCardNo" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="证件类型:">
                    <el-select v-model="UserDetail.identityCardType" placeholder="全部" clearable class="input-width">
                        <el-option v-for="item in UserDetail.identityCardType"
                            class="input-width"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="用户状态:">
                    <el-select v-model="UserDetail.status" placeholder="全部" clearable class="input-width">
                        <el-option v-for="item in UserDetail.status"
                            class="input-width"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                </el-form-item>
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
                <el-form-item label="性别:">
                    <el-radio-group v-model="UserDetail.gender" class="input-width">
                        <el-radio :label="1">Male</el-radio>
                        <el-radio :label="0">Female</el-radio>
                    </el-radio-group>
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
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    
    // userInfoId:null,
    // name:null,
    username:null,
    // phoneNumber:null,
    // identityCardNo:null,
    // email:null,
    // level:null
  };

export default {
    data(){
        return{
            listQuery: Object.assign({}, defaultListQuery),
            dialogVisible:false,
            // list: null,
            list: [{
                userInfoId:23233432,
                name:'张三',
                username:'dsddfdf',
                level:'会员',
                phoneNumber:12362734349,
                identityCardNo:344321323443,
                email:'23627834@qq.com',
                // firstAddr:'湖北省武汉市珞狮路122号 邮编：430070',
                registerTime:'1990-8-8',
                identityCardType:'身份证',
                status:'正常',
                birthday:'1990-8-8',
                gender:'女',
            },
            {
                userInfoId:23233432,
                name:'张三',
                username:'dsddfdf',
                level:'会员',
                phoneNumber:12362734349,
                identityCardNo:344321323443,
                email:'23627834@qq.com',
                // firstAddr:'地址：湖北省武汉市珞狮路122号 邮编：430070',
                registerTime:'1990-8-8',
                identityCardType:'身份证',
                status:'正常',
                birthday:'1990-8-8',
                gender:'女',
            },
            {
                userInfoId:23233432,
                name:'张三',
                username:'dsddfdf',
                level:'会员',
                phoneNumber:12362734349,
                identityCardNo:344321323443,
                email:'23627834@qq.com',
                // firstAddr:'地址：湖北省武汉市珞狮路122号 邮编：430070',
                registerTime:'1990-8-8',
                identityCardType:'身份证',
                status:'正常',
                birthday:'1990-8-8',
                gender:'女',
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
    methods:{

        //重置
        handleResetSearch(){
            this.listQuery = Object.assign({}, defaultListQuery);
        },

        //获取搜索列表
        getSearchList(){
            this.listLoading=true;
            fetchList(this.listQuery).then(response => {
            this.listLoading = false;
            this.list = response.data.list;
            this.total = response.data.total;
            });
        },

        //获取搜索结果
        handleSearchList(val){
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;
            this.getSearchList();
        },

        // //获取用户详细信息
        // handleUpdateUser(index, row){
        //     this.dialogVisible=true;
        //     // this.userInfoId=row.userInfoId;
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


