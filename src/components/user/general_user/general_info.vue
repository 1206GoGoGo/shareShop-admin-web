<template>
    <div class="app-container">
<!--条件搜索 S-->
        <el-card shadow="never" style="background:#f2f2f2;">
            <div>
                <i class="el-icon-search"></i>
                <span>Conditional Search</span>
                <el-button style="padding-left:30px;" type="text"  @click="handleClear()">Refresh</el-button>
                <el-button
                    style="float: right"
                    @click="handleSearchException()"
                    type="danger"
                    size="small">
                    异常用户
                </el-button>
                <el-button
                    style="float: right;margin-right:15px"
                    @click="handleSearchList()"
                    type="primary"
                    size="small">
                    查询
                </el-button>
            </div>
            <div style="margin-top: 10px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="搜索条件：">
                        <el-select v-model="listQuery.search" multiple default-first-option @change="changesearch" style="width: 700px" placeholder="Please select one or more" clearable>
                            <el-option
                                v-for="item in selectSearch"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="登录名：" v-if="flag1">
                        <el-input style="width: 203px" v-model="listQuery.username" placeholder="登陆名"  clearable></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名：" v-if="flag2">
                        <el-input style="width: 203px" v-model="listQuery.name" placeholder="真实姓名" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：" v-if="flag3"> 
                        <el-input style="width: 203px" v-model="listQuery.phoneNumber" placeholder="手机号"  clearable></el-input>
                    </el-form-item>
                    <el-form-item label="证件号码：" v-if="flag4">
                        <el-input style="width: 203px"  v-model="listQuery.identityCardNo" placeholder="证件号码"  clearable></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：" v-if="flag5">
                        <el-input style="width: 203px" v-model="listQuery.email" placeholder="邮箱" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="用户级别：" v-if="flag6">
                        <el-select v-model="listQuery.level" placeholder="全部" style="width: 203px" clearable>
                            <el-option
                                v-for="item in selectlevel"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
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
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand" label-width="100px">
                        <el-form-item label="真实姓名：">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="邮箱：">
                            <span>{{ props.row.email }}</span>
                        </el-form-item>
                        <el-form-item label="证件类型：">
                            <span>{{ props.row.identityCardType | idFormatter}}</span>
                        </el-form-item>
                        <el-form-item label="证件号码：">
                            <span>{{ props.row.identityCardNo }}</span>
                        </el-form-item>
                        <!--冻结、可用！！！！！用按钮-可以修改的那种-->
                        <!-- <el-form-item label="用户状态：">
                            <span>{{ props.row.status | statusFormatter}}</span>
                        </el-form-item> -->
                        <el-form-item label="注册时间：">
                            <span>{{ props.row.registerTime | dateFormatter}}</span>
                        </el-form-item>
                        <!-- <el-form-item label="出生日期：">
                            <span>{{ props.row.birthday | dateFormatter}}</span>
                        </el-form-item> -->
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
            <el-table-column
                align='center'
                label="编号"
                width="90"
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
                label="用户级别"
                sortable
                :formatter="levelFormatter"
                prop="userLogin.level">
            </el-table-column>
            <el-table-column
                align='center'
                label="手机号"
                sortable
                prop="phoneNumber">
            </el-table-column>
            <el-table-column label="操作" width="260" align="center">
                <template slot-scope="scope"  >  
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
            title="用户基本信息"
            
            :visible.sync="dialogFormVisible" width="70%">
            <el-form :model="UserDetail" :inline="true"
                    ref="DetailForm" label-width="150px">
                <el-form-item label="登录名:">
                    <el-input v-model="UserDetail.username" style="width: 203px" readonly></el-input>
                </el-form-item>
                <el-form-item label="姓名:">
                    <el-input v-model="UserDetail.name" style="width: 203px"></el-input>
                </el-form-item>
                <el-form-item label="手机号:">
                    <el-input v-model="UserDetail.phoneNumber" style="width: 203px"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:">
                    <el-input v-model="UserDetail.email" style="width: 203px"></el-input>
                </el-form-item>
                <el-form-item label="用户级别:">
                    <el-input v-model="UserDetail.level" readonly style="width: 203px"></el-input>
                </el-form-item>
                <el-form-item label="性别:"><!--"到显示框中不可用！！！！！！！！！！！！！-->
                    <el-radio-group v-model="UserDetail.gender" @change="Tellgender" style="width: 203px">
                        <el-radio :label="0">Male</el-radio>
                        <el-radio :label="1">Female</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="证件号码:">
                    <el-input v-model="UserDetail.identityCardNo" style="width: 203px"></el-input>
                </el-form-item>
                <el-form-item label="证件类型:">
                    <el-select v-model="UserDetail.identityCardType" placeholder="请选择" clearable style="width: 203px">
                        <el-option v-for="item in IDCardType"
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
                <el-form-item label="注册时间:">
                    <el-date-picker
                        readonly
                        v-model="UserDetail.registerTime"
                        style="width: 203px"
                        type="date"
                        placeholder="Please Select Time">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="出生年月:">
                    <el-date-picker
                        v-model="UserDetail.birthday"
                        style="width: 203px"
                        type="date"
                        placeholder="Please Select Time">
                    </el-date-picker>
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

import {getLists,fetchList,getUserDetail,updateUser,fetchUserAddr,deleteUser} from '@/api/user'
import {formatDate} from '@/utils/date';
const defaultListQuery = {
    pageindex: 0,
    pagesize: 20,
    //search:null,
    search:[],

    id:null,
    name:null,
    username:null,
    phoneNumber:null,
    identityCardNo:null,
    email:null,
    level:null,
    status:null,
  };

export default {
    data(){
        return{
            listQuery: Object.assign({}, defaultListQuery),
            dialogFormVisible:false,
            dialogTableVisible:false,
            listLoading: true,
            flag1:false,
            flag2:false,
            flag3:false,
            flag4:false,
            flag5:false,
            flag6:false,
            // value:null,
            //分页
            currentPage: 1,
            offset: 0,
            limit: 20,
            count: 0,

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
                    label: "general user",
                    value: 1
                },
                {
                    label: "member",
                    value: 2
                }
            ],
            selectSearch:[
                {
                    label: "登录名",
                    value: 1
                },
                {
                    label: "真实姓名",
                    value: 2
                },
                {
                    label: "手机号",
                    value: 3
                },
                {
                    label: "证件号码",
                    value: 4
                },
                {
                    label: "邮箱",
                    value: 5
                },
                {
                    label: "用户级别",
                    value: 6
                },
            ],
            list: null,
            Addrlist:null,
            UserDetail:{
                userInfoId:null,
                name:null,
                username:null,
                level:null,
                phoneNumber:null,
                identityCardNo:null,
                email:null,
                registerTime:null,
                identityCardType:null,
                birthday:null,
                gender:0,               
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
        //性别格式
        genderFormatter(value){
            if(value === "0"){return 'Male'} 
            else if(value === "1"){return 'Female'}
            else {return 'Not clear'}
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
            else if(value===2){return 'SSN'}  //社会安全号
            else {return 'Not clear'}
        },
        //是否默认
        defaultFormatter(value)
        {
            if(value === 0){return 'UnDefault'} 
            else if(value === 1){return 'default'}
            else {return 'Not clear'}
        },
    },
    //初始化
    created() {
      this.getList();
    },
    methods:{
        // changesearch(value){
        //     if(value===1)
        //         {this.flag1=true; this.listQuery.search=""}
        //     if(value===2)
        //         {this.flag2=true; this.listQuery.search=""}
        //     if(value===3)
        //         {this.flag3=true; this.listQuery.search=""}
        //     if(value===4)
        //         {this.flag4=true; this.listQuery.search=""}
        //     if(value===5)
        //         {this.flag5=true; this.listQuery.search=""}
        //     if(value===6)
        //         {this.flag6=true; this.listQuery.search=""}
        // },
        handleClear(){
            this.flag1=false
            this.flag2=false
            this.flag3=false
            this.flag4=false
            this.flag5=false
            this.flag6=false
            this.listQuery = Object.assign({}, defaultListQuery);
            this.getList()
        },
        //初始化列表
        getList(){
            this.listQuery.status=1 
            this.listQuery.id=null
            this.listQuery.search=null
            this.listQuery.pageindex=0
            this.listQuery.pagesize=20
            getLists(this.listQuery).then(response => {
                this.listLoading = false;
                this.list = response.data;
                this.total = response.data.total;
            })
        },

        //没有用！！！！！！！！！！！
        Tellgender(value){
            if(value==='0') {return 'Male'}
            else if(value === '1'){return 'Female'}
            else { return 'Not clear' }
        },

        //级别转换
        levelFormatter:function(row,column){
            let level=row.userLogin.level
            if(level === 1){return 'general user'} 
            else if(level === 2){return 'member'}
            else { return 'Not clear' }
        },

        //获取搜索列表
        getSearchList(){
            this.listLoading=true;
            this.listQuery.search=null
            //this.listQuery即为搜索条件
            fetchList(this.listQuery).then(response => {
                this.listLoading = false;
                this.list = response.data;
                this.total = response.data.total;
            });
        },
        
        //获取搜索结果
        handleSearchList(){
            this.listQuery.pageindex = '0';
            this.listQuery.pagesize = 20;
            this.getSearchList();
        },

        //重置
        // handleResetSearch(){
        //     this.listQuery = Object.assign({}, defaultListQuery);
        // },

        //获取状态异常用户
        handleSearchException(){
            this.listQuery.status=0
            this.listQuery.search=null
            getLists(this.listQuery).then(response => {
                this.listLoading = false;
                this.list = response.data;
                this.total = response.data.total;
            });
        },

        //获取用户详细信息   有问题???????????????????????
        handleUpdateUser(index, row){
            this.dialogFormVisible=true
            this.listQuery.pageindex=null
            this.listQuery.pagesize=null
            this.listQuery.status=null
            this.listQuery.search=null
            this.listQuery.id=row.userId
            getUserDetail(this.listQuery).then(response=>{
                this.UserDetail=response.data;
                //这两行将跨表查询的字段也显示到了弹出框上面！
                this.UserDetail.username=response.data.userLogin.username
                this.UserDetail.level=response.data.userLogin.level
                    if(this.UserDetail.level === 1){this.UserDetail.level= 'general user'} 
                    else if(this.UserDetail.level === 2){this.UserDetail.level=  'member'}
                    else { this.UserDetail.level=  'Not clear' }
                // this.UserDetail.gender=response.data.gender
                //     if(this.UserDetail.gender === '0'){this.UserDetail.gender.label= '0'} 
                //     else if(this.UserDetail.gender === '1'){this.UserDetail.gender.label= '1'}
                //     else { this.UserDetail.gender=  'Not clear' }
                

            });
        },

        //获取用户详细信息
        // handleUpdateUser(index, row) {
        //     this.dialogFormVisible = true;
        //     // this.isEdit = true;
        //     this.UserDetail = Object.assign({},row);
        // },

        //修改用户信息
        handleConfirm(){ 
          updateUser(this.UserDetail).then(response=>{
            this.dialogFormVisible=false;
            this.$message({
              message: '修改成功！',
              type: 'success',
              duration:1000
              });
            this.getList(); 
            });
        },

        //获取用户地址 
        getUserAddr(index, row){
            this.dialogTableVisible = true
            this.listQuery.status=null
            this.listQuery.id=row.userId
            fetchUserAddr(this.listQuery).then(response => {
                this.Addrlist = response.data;
            });
        },

        //删除用户  需要考虑用户的状态和订单情况？？？？？？？？？？？？？？？？？？？
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
            //let params = new URLSearchParams(); 
            //params.append("ids",ids);
            deleteUser(this.userInfoId).then(response=>{
                this.$message({
                    message: '删除成功！',
                    type: 'success',
                    duration: 1000
                });
                this.listQuery.pageindex='0';
                // this.getSearchList();     
                });
            })
        },

        //获取页码
        // handleSizeChange(val){
        //     this.listQuery.pageindex = '0';
        //     this.listQuery.pagesize = val;
        //     //this.getList();       
        // },
        
        //获取当前页
        // handleCurrentChange(val) {
        //     this.listQuery.pageindex = '0';
        //     //this.getList();        
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
    /* .input-width {
        width: 203px !important;
    } */
</style>


