<template>
    <div class="app-container">
<!--条件搜索 S-->
        <el-card shadow="never" style="background:#f2f2f2;">
            <div>
                <i class="el-icon-search"></i>
                <span>条件搜索</span>
                <el-button
                    style="float: right"
                    @click="handleSearchException()"
                    type="danger"
                    size="small">
                    状态异常用户
                </el-button>
                <el-button
                    style="float: right;margin-right: 15px"
                    @click="handleSearchList()"
                    type="primary"
                    size="small">
                    查询
                </el-button>
                <!-- <el-button
                    style="float: right;margin-right: 15px"
                    @click="handleResetSearch()"
                    size="small">
                    重置
                </el-button> -->
            </div>
            <div style="margin-top: 10px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="登录名：">
                        <el-input style="width: 203px" v-model="listQuery.username" placeholder="登陆名" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名：">
                        <el-input style="width: 203px" v-model="listQuery.name" placeholder="真实姓名" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="手机号："> 
                        <el-input style="width: 203px" v-model="listQuery.phoneNumber" placeholder="手机号" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="证件号码：">
                        <el-input style="width: 203px" v-model="listQuery.identityCardNo" placeholder="证件号码" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：">
                        <el-input style="width: 203px" v-model="listQuery.email" placeholder="邮箱" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="用户级别：">
                        <el-select v-model="listQuery.level" placeholder="全部" clearable>
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
                        <el-form-item label="出生日期：">
                            <span>{{ props.row.birthday | dateFormatter}}</span>
                        </el-form-item>
                        <el-form-item label="性别：">
                            <span>{{ props.row.gender | genderFormatter}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                align='center'
                label="编号"
                prop="userInfoId">
            </el-table-column>
            <el-table-column
                align='center'
                label="登录名"
                prop="username">
            </el-table-column>
            <el-table-column
                align='center'
                label="用户级别"
                :formatter="levelFormatter"
                prop="level">
            </el-table-column>
            <el-table-column
                align='center'
                label="手机号"
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
        <div class="pagination-container">
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
        </div>
<!--分页 E-->

<!--修改信息的弹出框 S-->
        <el-dialog                    
            title="用户基本信息"
            
            :visible.sync="dialogFormVisible" width="70%">
            <el-form :model="UserDetail" :inline="true"
                    ref="DetailForm" label-width="150px">
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
                <!-- <el-form-item label="用户级别:">
                    <el-input v-model="UserDetail.level" readonly class="input-width"></el-input>
                </el-form-item> --><!--未改好！！！！！！！！！！！-->
                <el-form-item label="用户级别:">
                    <el-select v-model="UserDetail.level" placeholder="请选择"  clearable class="input-width">
                        <el-option v-for="item in selectlevel"
                            readonly
                            class="input-width"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="性别:"><!--到显示框中不可用！！！！！！！！！！！！！-->
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
                        readonly
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
    pageindex: 1,
    pagesize: 10,

    name:null,
    username:null,
    phoneNumber:null,
    identityCardNo:null,
    email:null,
    level:null,
    status:1,
  };

export default {
    data(){
        return{
            listQuery: Object.assign({}, defaultListQuery),
            dialogFormVisible:false,
            dialogTableVisible:false,
            listLoading: true,
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
                    value: '0'
                },
                {
                    label: "member",
                    value: '1'
                }
            ],
            lavel:[
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
            list: [
                {
                    userInfoId:23233432,
                    name:'张三',
                    username:'dsddfdf',
                    level:'1',
                    phoneNumber:12362734349,
                    identityCardNo:344321323443,
                    email:'23627834@qq.com',
                    registerTime:'2018-3-28',
                    identityCardType:2,
                    birthday:'2010-8-24',
                    gender:'0',
                },
                {
                    userInfoId:23233432,
                    name:'张三',
                    username:'dsddfdf',
                    level:'0',
                    phoneNumber:12362734349,
                    identityCardNo:344321323443,
                    email:'23627834@qq.com',
                    registerTime:'2001-9-28',
                    identityCardType:1,
                    birthday:'1994-8-12',
                    gender:'1',
                },
                {
                    userInfoId:23233432,
                    name:'张三',
                    username:'dsddfdf',
                    level:'0',
                    phoneNumber:12362734349,
                    identityCardNo:344321323443,
                    email:'23627834@qq.com',
                    registerTime:'1990-8-8',
                    identityCardType:0,
                    birthday:'1990-8-8',
                    gender:'0',
                }
            ],
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
                birthday:null,
                gender:null,
                level:null,
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
            else {return 'Not claer'}
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
            else {return 'Not claer'}
        },
        defaultFormatter(value)
        {
            if(value === "0"){return 'Default'} 
            else if(value === "1"){return 'Undefault'}
            else {return 'Not claer'}
        },
    },
    //初始化
    created() {
      this.getList();
    },
    methods:{

        //初始化列表
        getList(){
            this.status=1  //这样写可以吗？？？？？？？？？？？？？？？？？？？？？？？？
            getLists(this.listQuery).then(response => {
            // getLists(this.status,{pagesize: 10, pageindex: 1,}).then(response => {
                this.listLoading = false;
                this.list = response.data;
                this.total = response.data.total;
            })
        },

        //级别转换
        levelFormatter:function(row,column){
            let level=row.level
            if(level === '0'){return 'seller'} 
            else if(level === '1'){return 'member'}
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
            this.listQuery.pageindex = 1;
            this.listQuery.pagesize = val;
            this.getSearchList();
        },

        //重置
        handleResetSearch(){
            this.listQuery = Object.assign({}, defaultListQuery);
        },

        //获取状态异常用户
        handleSearchException(){
            this.status=0
            getLists(this.status,{pagesize: 10, pageindex: 1,}).then(response => {
                this.listLoading = false;
                this.list = response.data;
                this.total = response.data.total;
            });
        },

        //获取用户详细信息
        // handleUpdateUser(index, row){
        //     this.dialogFormVisible=true;
        //     this.userInfoId=row.userInfoId;
        //     getUserDetail(row.userInfoId).then(response=>{
        //         this.UserDetail=response.data;
        //     });
        // },

        //获取用户详细信息
        handleUpdateUser(index, row) {
            this.dialogFormVisible = true;
            // this.isEdit = true;
            this.UserDetail = Object.assign({},row);
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
            this.getList(); 
            });
        },

        //获取用户地址
        getUserAddr(index, row){
            this.dialogTableVisible = true;  //this.userInfoId???
            fetchUserAddr(row.userLogin.userId).then(response => {
                this.list = response.data;
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
                this.listQuery.pageindex=1;
                // this.getSearchList();     
                });
            })
        },

        //获取页码
        handleSizeChange(val){
            this.listQuery.pageindex = 1;
            this.listQuery.pagesize = val;
            //this.getList();       
        },
        //获取当前页
        handleCurrentChange(val) {
            this.listQuery.pageindex = val;
            //this.getList();        
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


