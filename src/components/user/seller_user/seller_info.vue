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
                <!-- <el-button
                    style="float: right;margin-right:45px"
                    @click="handleResetSearch()"
                    size="small">
                    重置
                </el-button> v-model="listQuery.search" value-key="value"-->
            </div>
            <div style="margin-top: 10px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="搜索条件：">
                        <el-select v-model="listQuery.search" style="width: 203px" @change="changesearch" placeholder="Please select one or more" clearable>
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
        v-loading="listLoading"
        @selection-change="handleSelectionChange">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand" label-width="100px">
                        <el-form-item label="账户余额:">
                            <span>￥{{ props.row.userMoney }}</span>
                        </el-form-item>
                        <el-form-item label="注册时间:">
                            <span>{{ props.row.registerTime | dateFormatter}}</span>
                        </el-form-item>
                        <!--冻结、可用！！！！！用按钮-可以修改的那种-->
                        <!-- <el-form-item label="用户状态:">
                            <span>{{ props.row.status }}</span>
                        </el-form-item> -->
                        <el-form-item label="证件号码:">
                            <span>{{ props.row.identityCardNo }}</span>
                        </el-form-item>
                        <el-form-item label="证件类型:">
                            <span>{{ props.row.identityCardType | idFormatter}}</span>
                        </el-form-item>
                        <el-form-item label="邮箱:">
                            <span>{{ props.row.email }}</span>
                        </el-form-item>
                        <el-form-item label="出生日期:">
                            <span>{{ props.row.birthday | dateFormatter}}</span>
                        </el-form-item>
                        <el-form-item label="性别:">
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
                label="编号" 
                align='center'
                width="80"
                sortable
                prop="userInfoId">
            </el-table-column>
            <el-table-column
                label="登录名"
                align='center'
                sortable
                prop="userLogin.username">
            </el-table-column>
            <el-table-column
                label="真实姓名"
                align='center'
                prop="name"
                sortable
                width="180">
            </el-table-column>
            <el-table-column
                label="手机号"
                align='center'
                prop="phoneNumber"
                sortable
                width="180">
            </el-table-column>
            <el-table-column label="操作" width="300" align="center">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="getSellerAddr(scope.$index, scope.row)">地址
                    </el-button>
                    <el-button
                        size="mini"
                        @click="handleUpdateSeller(scope.$index, scope.row)">编辑
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
            title="Seller信息"
            
            :visible.sync="dialogFormVisible" width="70%">
            <el-form :model="SellerDetail" :inline="true"
                    ref="DetailForm" label-width="150px">
                <!-- <el-form-item label="编号:">
                    <el-input v-model="SellerDetail.userInfoId" style="width: 203px" readonly></el-input>
                </el-form-item> -->
                <el-form-item label="登录名:"> 
                    <el-input v-model="SellerDetail.username" style="width: 203px" readonly></el-input>
                </el-form-item>
                <el-form-item label="姓名:">
                    <el-input v-model="SellerDetail.name" style="width: 203px"></el-input>
                </el-form-item>
                <el-form-item label="手机号:">
                    <el-input v-model="SellerDetail.phoneNumber" style="width: 203px"></el-input>
                </el-form-item>
                 <el-form-item label="邮箱:">
                    <el-input v-model="SellerDetail.email" style="width: 203px"></el-input>
                </el-form-item>
                <el-form-item label="出生年月:">
                    <el-date-picker
                        v-model="SellerDetail.birthday"
                        style="width: 203px"
                        type="date"
                        placeholder="Please Select Time">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="性别:"><!--到显示框中不可用！！！！！！！！！！！！！-->
                    <el-radio-group v-model="SellerDetail.gender" style="width: 203px">
                        <el-radio :label="0">Male</el-radio>
                        <el-radio :label="1">Female</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="证件号码:">
                    <el-input v-model="SellerDetail.identityCardNo" style="width: 203px"></el-input>
                </el-form-item>
                <el-form-item label="证件类型:">
                    <el-select v-model="SellerDetail.identityCardType" placeholder="请选择" clearable style="width: 203px">
                        <el-option v-for="item in IDCardType"
                            style="width: 203px"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="注册时间:">
                    <el-date-picker
                        readonly
                        v-model="SellerDetail.registerTime"
                        style="width: 203px"
                        type="date"
                        placeholder="Please Select Time">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="账户余额:">
                    <el-input v-model="SellerDetail.userMoney" readonly style="width: 203px"></el-input>
                </el-form-item>
                <!-- <el-form-item label="用户状态:">
                    <el-input v-model="SellerDetail.status" style="width: 203px"></el-input>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirm">确 定</el-button>
            </span>
        </el-dialog>
<!--修改信息的弹出框 E-->
<!--地址弹出框 S-->
        <el-dialog                    
            title="Seller地址信息"

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
import {getLists,fetchUserAddr,fetchListSeller,getSellerDetail,updateSeller,deleteSeller} from '@/api/user'
import {formatDate} from '@/utils/date';
const defaultListQuery = {
    pageindex: 0,
    pagesize: 20,
    id:null,

    name:null,
    username:null,
    phoneNumber:null,
    identityCardNo:null,
    email:null,
    level:3,//seller的级别
    status:null,
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

            // list:null,
            list: [
                {
                    userInfoId:'12323324',
                    name:'张三',
                    username:'zhangnan',
                    phoneNumber:18654789087,
                    userMoney:'3245',
                    identityCardNo:653789087654326789,
                    identityCardType:1,
                    email:'1764537390@qq.com',
                    registerTime:'2019-9-8',
                    // status:'正常',
                    birthday:'2009-9-9',
                    gender:'0',

                },
                {
                    userInfoId:'12323324',
                    name:'张三',
                    username:'zhangnan',
                    phoneNumber:18654789087,
                    userMoney:'3245',
                    identityCardNo:653789087654326789,
                    identityCardType:2,
                    email:'1764537390@qq.com',
                    registerTime:'2019-9-8',
                    // status:'正常',
                    birthday:'2009-9-9',
                    gender:'1',
                },
                {
                    userInfoId:'12323324',
                    name:'张三',
                    username:'zhangnan',
                    phoneNumber:18654789087,
                    userMoney:'3245',
                    identityCardNo:653789087654326789,
                    identityCardType:0,
                    email:'1764537390@qq.com',
                    registerTime:'2019-9-8',
                    birthday:'2009-9-9',
                    gender:'0',
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

            SellerDetail:{
                userInfoId:null,
                name:null,
                username:null,
                phoneNumber:null,
                identityCardNo:null,
                identityCardType:null,
                email:null,
                userMoney:null,
                registerTime:null,
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
            let date = new Date(time)
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
        //     if(value === "1"){return 'Normal'} else {return 'Abnormal'}
        // },

        //证件类型
        idFormatter(value)
        {
            if(value===0){return 'IDP'} //驾照
            else if(value===1){return 'USP'} //护照
            else if(value===2){return 'SSN'}  //社会安全号
            else {return 'Not claer'}
        },

        //是否默认
        defaultFormatter(value)
        {
            if(value === 0){return 'UnDefault'} 
            else if(value === 1){return 'default'}
            else {return 'Not clear'}
        },
    },
    created(){
        this.getList();
    },
    methods:{

        //搜索条件
        changesearch(value){
            if(value===1)
                {this.flag1=true; this.listQuery.search=""}
            if(value===2)
                {this.flag2=true; this.listQuery.search=""}
            if(value===3)
                {this.flag3=true; this.listQuery.search=""}
            if(value===4)
                {this.flag4=true; this.listQuery.search=""}
            if(value===5)
                {this.flag5=true; this.listQuery.search=""}
            if(value===6)
                {this.flag6=true; this.listQuery.search=""}
        },

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
            this.listQuery.status=1 //这样写可以吗？？？？？？？？？？？？？？？？？？？？？？？？
            getLists(this.listQuery).then(response => {
            // getLists(this.status,{pagesize: 10, pageindex: 1,}).then(response => {
                this.listLoading = false;
                this.list = response.data;
                this.total = response.data.total;
            })
        },

        //获取搜索列表
        getSearchList(){
            //this.listLoading=true;
            fetchListSeller(this.listQuery).then(response => {
                this.listLoading = false;
                this.list = response.data;
                this.total = response.data.total;
            });
        },

        //获取搜索结果
        handleSearchList(){
            this.listQuery.pageindex = 0;
            this.listQuery.pagesize = 20;
            this.getSearchList();
        },

        //重置
        handleResetSearch(){
            this.listQuery = Object.assign({}, defaultListQuery);
        },

        //获取seller详细信息
        // handleUpdateSeller(index, row){
        //     this.dialogFormVisible=true;
        //     this.userInfoId=row.userInfoId;    
        //     getSellerDetail(row.userInfoId).then(response=>{
        //         this.SellerDetail=response.data;
        //         this.SellerDetail.username=response.data.userLogin.username
        //     });
        // },

        //获取seller详细信息  与普通用户使用的方法不一样！！！
        handleUpdateSeller(index, row) {
            this.dialogFormVisible = true;
            // this.isEdit = true;
            this.SellerDetail = Object.assign({},row);
            this.SellerDetail.username=row.userLogin.username
        },

        //修改用户信息 
        handleConfirm(){ 
          updateSeller(this.SellerDetail).then(response=>{
            this.dialogFormVisible=false;
            this.$message({
              message: '修改成功！',
              type: 'success',
              duration:1000
              });
            this.getList(); 
            });
        },

        //获取用户地址  注意：为查找不到的信息写提示！！！！！！！！！！！！！！！！！！！！
        getSellerAddr(index, row){
            this.dialogTableVisible = true;
            this.listQuery.status=null
            this.listQuery.level=null,
            this.listQuery.id=row.userId
            fetchUserAddr(this.listQuery).then(response => {
                this.Addrlist = response.data;
            });
        },

        //删除用户
        handleDelete(index, row){
            let ids=[];
            ids.push(row.userInfoId);
            this.deleteSeller(ids);
        },
        
        //删除详细信息
        deleteSeller(ids){
            this.$confirm('是否要进行该删除操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
            //let params = new URLSearchParams(); //?????????????post 还是get??????
            //params.append("ids",ids);
            deleteSeller(this.userInfoId).then(response=>{
                this.$message({
                message: '删除成功！',
                type: 'success',
                duration: 1000
                });
                this.listQuery.pageindex=1;
                // this.getSearchList();     ?????????????
                });
            })
        },

        //获取页码
        // handleSizeChange(val){
        //     this.listQuery.pageindex = 1;
        //     this.listQuery.pagesize = val;
        //     // this.getList();       ?????????????????
        // },
        //获取当前页
        // handleCurrentChange(val) {
        //     this.listQuery.pageindex = val;
        //     // this.getList();        ????????????????????
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


