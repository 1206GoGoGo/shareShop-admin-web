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
                    <el-form-item label="登录名：">
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
                    </el-form-item>
                </el-form> 
            </div>
        </el-card>
<!--条件搜索 E-->

<!--信息的表头 S-->
        <!-- v-loading="listLoading" -->
        <el-table
        :data="list"
        highlight-current-row
        style="width: 100%"
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
                        <el-form-item label="出生日期:">
                            <span>{{ props.row.birthday | dateFormatter}}</span>
                        </el-form-item>
                        <el-form-item label="性别:">
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
                type="index"
                label="编号"
                align='center'
                width="55">
            </el-table-column>
            <!-- <el-table-column
                label="编号" 
                align='center'
                prop="userInfoId">
            </el-table-column> -->
            <el-table-column
                label="登录名"
                align='center'
                prop="username"
                width="130">
            </el-table-column>
            <el-table-column
                label="真实姓名"
                align='center'
                prop="name"
                width="130">
            </el-table-column>
            <el-table-column
                label="手机号"
                align='center'
                prop="phoneNumber"
                width="160">
            </el-table-column>
            <el-table-column
                label="邮箱"
                align='center'
                prop="email">
            </el-table-column>
            <el-table-column label="操作" width="260" align="center">
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
            title="Seller信息"
            
            :visible.sync="dialogFormVisible" width="70%">
            <el-form :model="SellerDetail" :inline="true"
                    ref="DetailForm" label-width="150px">
                <!-- <el-form-item label="编号:">
                    <el-input v-model="SellerDetail.userInfoId" class="input-width" readonly></el-input>
                </el-form-item> -->
                <el-form-item label="登录名:"> 
                    <el-input v-model="SellerDetail.username" class="input-width" readonly></el-input>
                </el-form-item>
                <el-form-item label="姓名:">
                    <el-input v-model="SellerDetail.name" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="手机号:">
                    <el-input v-model="SellerDetail.phoneNumber" class="input-width"></el-input>
                </el-form-item>
                 <el-form-item label="邮箱:">
                    <el-input v-model="SellerDetail.email" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="出生年月:">
                    <el-date-picker
                        v-model="SellerDetail.birthday"
                        class="input-width"
                        type="date"
                        placeholder="Please Select Time">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="性别:"><!--到显示框中就不可用！！！！！！！！！！！！！-->
                    <el-radio-group v-model="SellerDetail.gender" class="input-width">
                        <el-radio :label="0">Male</el-radio>
                        <el-radio :label="1">Female</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="证件号码:">
                    <el-input v-model="SellerDetail.identityCardNo" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="证件类型:">
                    <el-select v-model="SellerDetail.identityCardType" placeholder="请选择" clearable class="input-width">
                        <el-option v-for="item in IDCardType"
                            class="input-width"
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
                        class="input-width"
                        type="date"
                        placeholder="Please Select Time">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="账户余额:">
                    <el-input v-model="SellerDetail.userMoney" readonly class="input-width"></el-input>
                </el-form-item>
                <!-- <el-form-item label="用户状态:">
                    <el-input v-model="SellerDetail.status" class="input-width"></el-input>
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
    pageNum: 1,
    pageSize: 10,
    
    // userInfoId:null,
    name:null,
    username:null,
    phoneNumber:null,
    identityCardNo:null,
    email:null,
    level:'3',//seller的级别！！！！！！！！！！！！！！！！！
    status:1,
  };

export default {
    data(){
        return{
            listQuery: Object.assign({}, defaultListQuery),
            dialogFormVisible:false,
            dialogTableVisible:false,
            //listLoading: true,
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
            // offset: 0,
            // limit: 20,
            // count: 0,
            // currentPage: 1,
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
        //     if(value === "1"){return 'Normal'} else {return 'Female'}
        // },

        //证件类型
        idFormatter(value)
        {
            if(value===0){return 'IDP'} //驾照
            else if(value===1){return 'USP'} //护照
            else if(value===2){return 'SSN'}  //社会安全号
            else {return 'Not claer'}
        }
    },
    created(){
        getList();
    },
    methods:{
        //初始化列表
        getList(){
            this.status=1  //这样写可以吗？？？？？？？？？？？？？？？？？？？？？？？？
            // getLists(this.listQuery).then(response => {
            getLists(this.status,{pageSize: 10, pageNum: 1,}).then(response => {
                this.listLoading = false;
                this.list = response.data;
                this.total = response.data.total;
            })
        },

        //获取搜索列表
        getSearchList(){
            this.listLoading=true;
            fetchListSeller(this.listQuery).then(response => {
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

        //重置
        handleResetSearch(){
            this.listQuery = Object.assign({}, defaultListQuery);
        },

        // //获取seller详细信息
        // handleUpdateSeller(index, row){
        //     this.dialogFormVisible=true;
        //     this.userInfoId=row.userInfoId;    
        //     getSellerDetail(row.userInfoId).then(response=>{
        //         this.SellerDetail=response.data;
        //     });
        // },

        //获取seller详细信息
        handleUpdateSeller(index, row) {
            this.dialogFormVisible = true;
            // this.isEdit = true;
            this.SellerDetail = Object.assign({},row);
        },

        //修改用户信息  this.managerInfoId
        handleConfirm(){ 
          updateSeller(this.SellerDetail).then(response=>{
            this.dialogFormVisible=false;
            this.$message({
              message: '修改成功！',
              type: 'success',
              duration:1000
              });
            // this.getSearchList(); ??????????????????
            });
        },

        //获取用户地址
        getSellerAddr(index, row){
            this.dialogTableVisible = true;  //this.userInfoId???
            fetchUserAddr(row.userLogin.userId).then(response => {
                this.list = response.data;
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
                this.listQuery.pageNum=1;
                // this.getSearchList();     ?????????????
                });
            })
        },

        //获取页码
        handleSizeChange(val){
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;
            // this.getList();       ?????????????????
        },
        //获取当前页
        handleCurrentChange(val) {
            this.listQuery.pageNum = val;
            // this.getList();        ????????????????????
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


