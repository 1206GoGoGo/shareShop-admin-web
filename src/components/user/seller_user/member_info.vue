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
                    查询
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
                    <el-form-item label="seller登录名：">
                        <el-input style="width: 203px" v-model="listQuery.username" placeholder="Login Name for Seller" clearable></el-input>
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
        highlight-current-row
        :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
        style="width: 100%"
        @selection-change="handleSelectionChange">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand" label-width="100px">
                        <!-- <el-form-item label="真实姓名：">
                            <span>{{ props.row.name }}</span>
                        </el-form-item> -->
                        <el-form-item label="邮箱：" class="label-position">
                            <span>{{ props.row.email }}</span>
                        </el-form-item>
                        <el-form-item label="注册时间：">
                            <span>{{ props.row.registerTime | dateFormatter}}</span>
                        </el-form-item>
                        <el-form-item label="证件类型：">
                            <span>{{ props.row.identityCardType | idFormatter}}</span>
                        </el-form-item>
                        <el-form-item label="证件号码：">
                            <span>{{ props.row.identityCardNo }}</span>
                        </el-form-item>
                        <!--冻结、可用！！！！！用按钮-可以修改的那种-->
                        <!-- <el-form-item label="用户状态：">
                            <span>{{ props.row.status | statusFormatter }}</span>
                        </el-form-item> -->
                        <el-form-item label="出生日期：">
                            <span>{{ props.row.birthday | dateFormatter }}</span>
                        </el-form-item>
                        <el-form-item label="性别：">
                            <span>{{ props.row.gender | genderFormatter}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <!-- <el-table-column
                type="selection"
                width="55">
            </el-table-column> -->
            <!-- <el-table-column
                type="index"
                label="编号"
                align='center'
                width="55">
            </el-table-column> -->
            <el-table-column
                align='center'
                label="编号"
                width="80"
                sortable
                prop="userInfoId">
            </el-table-column>
            <el-table-column
                align='center'
                label="登录名"
                sortable
                prop="userLogin.username">
            </el-table-column>
            <el-table-column
                align='center'
                label="真实姓名"
                sortable
                prop="name">
            </el-table-column>
            <!-- <el-table-column
                align='center'
                label="用户级别"
                prop="level">
            </el-table-column> -->
            <el-table-column
                align='center'
                label="手机号"
                sortable
                prop="phoneNumber">
            </el-table-column>
            <el-table-column label="操作" width="260" align="center">
                <template slot-scope="scope" >
                    <el-button
                        size="mini"
                        @click="getUserAddr(scope.$index, scope.row)">地址
                    </el-button>
                    <el-button
                        size="mini"
                        @click="handleUpdateUser(scope.$index, scope.row)">编辑
                    </el-button>
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
        <!-- <div class="pagination-container">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :current-page.sync="listQuery.pageindex"
                :page-size="listQuery.pagesize"
                :page-sizes="[5,10,15]"
                :total="total">
            </el-pagination>
        </div> -->

        <div class="Pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="20"
                layout="total, prev, pager, next"
                :total="count">
            </el-pagination>
        </div>
<!--分页 E-->

<!--修改信息的弹出框 S-->
        <el-dialog                    
            title="用户信息"
            
            :visible.sync="dialogFormVisible" width="70%">
            <el-form :model="UserDetail"  :inline="true"
                    ref="DetailForm" label-width="150px">
                <el-form-item label="编号:" >
                    <el-input v-model="UserDetail.userInfoId" style="width: 203px" readonly></el-input>
                </el-form-item>
                <el-form-item label="登录名:" >
                    <el-input v-model="UserDetail.username" style="width: 203px" readonly></el-input>
                </el-form-item>
                <el-form-item label="姓名:" >
                    <el-input v-model="UserDetail.name" style="width: 203px"></el-input>
                </el-form-item>
                <el-form-item label="手机号:" >
                    <el-input v-model="UserDetail.phoneNumber" style="width: 203px"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" >
                    <el-input v-model="UserDetail.email" style="width: 203px"></el-input>
                </el-form-item>
                <!--是否需要做？？？？？？？？？？？-->
                <!-- <el-form-item label="出生年月:" >
                    <el-date-picker
                        v-model="UserDetail.birthday"
                        style="width: 203px"
                        type="date"
                        placeholder="Please Select Time">
                    </el-date-picker>
                </el-form-item> -->
                <el-form-item label="证件号码:" >
                    <el-input v-model="UserDetail.identityCardNo" style="width: 203px"></el-input>
                </el-form-item>
                <el-form-item label="证件类型:" >
                    <el-select v-model="UserDetail.identityCardType" placeholder="全部" clearable style="width: 203px">
                        <el-option v-for="item in idCardType"
                            style="width: 203px"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                </el-form-item>
                <!-- <el-form-item label="用户状态:">
                    <el-select v-model="UserDetail.status" placeholder="全部" clearable style="width: 203px">
                        <el-option v-for="item in UserDetail.status"
                            style="width: 203px"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                </el-form-item> -->
                <!-- <el-form-item label="用户状态:">
                    <el-input v-model="UserDetail.status" style="width: 203px" readonly=""></el-input>
                </el-form-item> -->
                <el-form-item label="注册时间:" >
                    <el-date-picker
                        readonly
                        v-model="UserDetail.registerTime"
                        style="width: 203px"
                        type="date"
                        placeholder="Please Select Time">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="性别:">
                    <el-radio-group v-model="UserDetail.gender" style="width: 203px">
                        <el-radio :label="1">Male</el-radio>
                        <el-radio :label="0">Female</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirm">确 定</el-button>
            </span>
        </el-dialog>
<!--修改信息的弹出框 E-->
<!--地址弹出框 S-->
        <el-dialog                    
            title="用户地址信息"
            
            :visible.sync="dialogTableVisible" width="90%">
            <el-table ref="AddrTable"
                    highlight-current-row
                    :data="Addrlist"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"  
                    v-loading="listLoading"
                    border>     
                <el-table-column label="NO." type="index" width="50" align="center"></el-table-column>
                <el-table-column label="邮编" width="90" align="center">
                    <template slot-scope="scope">{{scope.row.postalCode}}</template>
                </el-table-column>
                <el-table-column label="州"  width="180"  align="center">
                    <template slot-scope="scope">{{scope.row.state}}</template>
                </el-table-column>
                <el-table-column label="市"  width="180"  align="center">
                    <template slot-scope="scope">{{scope.row.city}}</template>
                </el-table-column>
                <el-table-column label="第一地址"  width="260"  align="center">
                    <template slot-scope="scope">{{scope.row.firstAddr}}</template>
                </el-table-column>
                <el-table-column label="第二地址"  width="260"  align="center">
                    <template slot-scope="scope">{{scope.row.secondAddr}}</template>
                </el-table-column>
                <el-table-column label="是否默认"  width="100"  align="center">
                    <template slot-scope="scope">{{scope.row.isDefault | defaultFormatter}}</template>
                </el-table-column>
                <el-table-column label="修改时间"  width="180"  align="center">
                    <template slot-scope="scope">{{scope.row.modifiedTime | dateFormatter}}</template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false" type="primary">返 回</el-button>
            </span>
        </el-dialog>
<!--地址弹出框 E-->
    </div>
</template>

<script>

import {fetchList,fetchMemberList,getUserDetail,updateUser,fetchUserAddr,deleteUser} from '@/api/user'
import {formatDate} from '@/utils/date';
const defaultListQuery = {
    pageindex: 0,
    pagesize: 20,

    id:null,
    username:null,
  };

export default {
    data(){
        return{
            listQuery: Object.assign({}, defaultListQuery),
            dialogFormVisible:false,
            dialogTableVisible:false,
            listLoading: true,
            
            //分页
            currentPage: 1,
            offset: 0,
            limit: 20,
            count: 0,
            list: null,
            // list: [{
            //     userInfoId:23233432,
            //     name:'张三',
            //     username:'dsddfdf',
            //     level:'会员',
            //     phoneNumber:12362734349,
            //     identityCardNo:344321323443,
            //     email:'23627834@qq.com',
            //     registerTime:'1990-8-8',
            //     identityCardType:2,
            //     status:'正常',
            //     birthday:'1990-8-8',
            //     gender:'0',
            // },
            // {
            //     userInfoId:23233432,
            //     name:'张三',
            //     username:'dsddfdf',
            //     level:'会员',
            //     phoneNumber:12362734349,
            //     identityCardNo:344321323443,
            //     email:'23627834@qq.com',
            //     registerTime:'1990-8-8',
            //     identityCardType:0,
            //     status:'正常',
            //     birthday:'1990-8-8',
            //     gender:'女',
            // },
            // {
            //     userInfoId:23233432,
            //     name:'张三',
            //     username:'dsddfdf',
            //     level:'会员',
            //     phoneNumber:12362734349,
            //     identityCardNo:344321323443,
            //     email:'23627834@qq.com',
            //     registerTime:'1990-8-8',
            //     identityCardType:1,
            //     status:'正常',
            //     birthday:'1990-8-8',
            //     gender:'1',
            // }
            // ],

            // Addrlist:null,
            Addrlist:
            [
                {
                    postalCode:2323432,
                    state:'weowewdfddfd',
                    city:'dsddfwedeedf',
                    firstAddr:'dkfhnerkfheifhdjk',
                    secondAddr:'12362734349',
                    isDefault:'1',
                    modifiedTime:'1990-8-8',
                },
                {
                    postalCode:2323432,
                    state:'weowewdfddfd',
                    city:'dsddfwedeedf',
                    firstAddr:'dkfhnerkfheifhdjk',
                    secondAddr:'12362734349',
                    isDefault:'1',
                    modifiedTime:'1990-8-8',
                },
                {
                    postalCode:2323432,
                    state:'weowewdfddfd',
                    city:'dsddfwedeedf',
                    firstAddr:'dkfhnerkfheifhdjk',
                    secondAddr:'12362734349',
                    isDefault:'1',
                    modifiedTime:'1990-8-8',
                }
            ],
          
            UserDetail:{
                userInfoId:null,
                name:null,
                username:null,
                phoneNumber:null,
                identityCardNo:null,
                email:null,
                registerTime:null,
                identityCardType:null,
                // status:null,
                birthday:null,
                gender:null,
            },
            idCardType:[
                {
                    label:'IDP',
                    value:0   
                },
                {
                    label:'USP',
                    value:1   
                },
                {
                    label:'SSN',
                    value:2   
                }
            ],
        }
    },

    filters:{
        //证件类型转换
        idFormatter(value){
            if(value=== 0 ){ return 'IDP' }
            else if(value=== 1){return 'USP' }
            else if(value=== 2){return 'SSN'}
            else{return 'Not clear'}
        },
        //日期转换
        dateFormatter(time){
            let date=new Date(time)
            return formatDate(date, 'MM.dd.yyyy hh:mm:ss')
        },
        //性别转换
        genderFormatter(value){
            if(value==="0"){return 'Male'}
            else if(value==="1"){return 'Female'}
            else{return 'Not clear'}
        },
        //状态转变
        // statusFormatter(value){
        //     if(value === "1"){return 'Normal'} else {return 'Abnormal'}
        // },
        //是否默认
        defaultFormatter(value)
        {
            if(value === 0){return 'UnDefault'} 
            else if(value === 1){return 'default'}
            else {return 'Not clear'}
        }, 
    },
    methods:{
        //重置
        handleResetSearch(){
            this.listQuery = Object.assign({}, defaultListQuery);
        },

        //获取搜索列表
        getSearchList(){
            this.listLoading=true;
            fetchMemberList(this.listQuery).then(response => {
                this.listLoading = false;
                this.list = response.data;
                this.total = response.data.total;
            });
        },

        //获取搜索结果
        handleSearchList(val){
            this.listQuery.pageindex = 0;
            this.listQuery.pagesize = 20;
            this.getSearchList();
        },

        // //获取用户详细信息
        // handleUpdateUser(index, row){
        //     this.dialogFormVisible=true;
        //     // this.userInfoId=row.userInfoId;
        //     getUserDetail(row.userInfoId).then(response=>{
        //         this.UserDetail=response.data;
        //     });
        // },

        //获取用户详细信息
        handleUpdateUser(index, row) {
            this.dialogFormVisible = true;
            // this.isEdit = true;
            this.UserDetail = Object.assign({},row);
            this.UserDetail.username=row.userLogin.username
        },

        //修改用户信息 
        handleConfirm(){ 
            updateUser(this.UserDetail).then(response=>{
                this.dialogFormVisible=false;
                this.$message({
                message: '修改成功！',
                type: 'success',
                duration:1000
                });
                // this.getSearchList(); 
            });
        },

        //获取用户地址
        getUserAddr(index, row){
            this.dialogTableVisible = true 
            this.listQuery.id=row.userId
            fetchUserAddr(this.listQuery).then(response => {
                this.Addrlist = response.data;
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
                this.listQuery.pageindex=0;
                // this.getSearchList();     
                });
            })
        },

        //获取页码
        // handleSizeChange(val){
        //     this.listQuery.pageindex = 1;
        //     this.listQuery.pagesize = val;
        //     // this.getList();       
        // },
        // //获取当前页
        // handleCurrentChange(val) {
        //     this.listQuery.pageindex = val;
        //     // this.getList();        
        // },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },

        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1)*this.limit;
            this.getList()
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


