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
        style="width: 100%"
        @selection-change="handleSelectionChange">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand" label-width="100px">
                        <el-form-item label="邮箱:">
                            <span>{{ props.row.email }}</span>
                        </el-form-item>
                        <el-form-item label="用户状态:"><!--冻结、可用！！！！！用按钮-可以修改的那种-->
                            <span>{{ props.row.status }}</span>
                        </el-form-item>
                        <el-form-item label="账户余额:">
                            <span>{{ props.row.userMoney }}</span>
                        </el-form-item>
                        <el-form-item label="注册时间:">
                            <span>{{ props.row.registerTime }}</span>
                        </el-form-item>
                        <el-form-item label="证件号码:">
                            <span>{{ props.row.identityCardNo }}</span>
                        </el-form-item>
                        <el-form-item label="证件类型:">
                            <span>{{ props.row.identityCardType }}</span>
                        </el-form-item>
                        <el-form-item label="出生日期:">
                            <span>{{ props.row.birthday }}</span>
                        </el-form-item>
                        <el-form-item label="性别:">
                            <span>{{ props.row.gender }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column><!--这个页面怎么确定查到的是店主seller？？？？？？？？？？？-->
            <el-table-column
                label="编号" 
                prop="userInfoId">
            </el-table-column>
            <el-table-column
                label="登录名"
                prop="username">
            </el-table-column>
            <el-table-column
                label="真实姓名"
                prop="name">
            </el-table-column>
            <el-table-column
                label="手机号"
                prop="phoneNumber">
            </el-table-column>
            <el-table-column label="操作" width="260" align="center">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleUpdateSeller(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                    <el-button
                        size="mini"
                        @click="getSellerAddr(scope.$index, scope.row)">地址
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
            
            :visible.sync="dialogVisible" width="70%">
            <el-form :model="SellerDetail" :inline="true"
                    ref="DetailForm" label-width="150px">
                <el-form-item label="编号:"> <!--编号不能修改！！！！！-->
                    <el-input v-model="SellerDetail.userInfoId" class="input-width" readonly></el-input>
                </el-form-item>
                <!-- <el-form-item label="登录名:"> 
                    <el-input v-model="SellerDetail.username" class="input-width" readonly></el-input>
                </el-form-item> -->
                <el-form-item label="姓名:">
                    <el-input v-model="SellerDetail.name" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="手机号:">
                    <el-input v-model="SellerDetail.phoneNumber" class="input-width"></el-input>
                </el-form-item>
                 <el-form-item label="邮箱:">
                    <el-input v-model="SellerDetail.email" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="证件号码:">
                    <el-input v-model="SellerDetail.identityCardNo" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="证件类型:">
                    <el-input v-model="SellerDetail.identityCardType" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="注册时间:">
                    <el-input v-model="SellerDetail.registerTime" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="出生年月:">
                    <el-input v-model="SellerDetail.birthday" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="用户状态:">
                    <el-input v-model="SellerDetail.status" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="性别:">
                    <el-input v-model="SellerDetail.gender" class="input-width"></el-input>
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
import {fetchListSeller,getSellerDetail,updateSeller,deleteSeller} from '@/api/user'
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    
    // userInfoId:null,
    name:null,
    username:null,
    phoneNumber:null,
    identityCardNo:null,
    email:null
  };

export default {
    data(){
        return{
            listQuery: Object.assign({}, defaultListQuery),
            dialogVisible:false,
            list: [
                {
                    userInfoId:'12323324',
                    name:'张三',
                    username:'zhangnan',
                    phoneNumber:18654789087,
                    userMoney:'3245',
                    identityCardNo:653789087654326789,
                    identityCardType:'身份证',
                    email:'1764537390@qq.com',
                    registerTime:'2019-9-8',
                    status:'正常',
                    birthday:'2009-9-9',
                    gender:'女',

                },
                {
                    userInfoId:'12323324',
                    name:'张三',
                    username:'zhangnan',
                    phoneNumber:18654789087,
                    userMoney:'3245',
                    identityCardNo:653789087654326789,
                    identityCardType:'身份证',
                    email:'1764537390@qq.com',
                    registerTime:'2019-9-8',
                    status:'正常',
                    birthday:'2009-9-9',
                    gender:'女',
                },
                {
                    userInfoId:'12323324',
                    name:'张三',
                    username:'zhangnan',
                    phoneNumber:18654789087,
                    userMoney:'3245',
                    identityCardNo:653789087654326789,
                    identityCardType:'身份证',
                    email:'1764537390@qq.com',
                    registerTime:'2019-9-8',
                    status:'正常',
                    birthday:'2009-9-9',
                    gender:'女',
                }
            ],
            //listLoading: true,
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
    methods:{

        //重置
        handleResetSearch(){
            this.listQuery = Object.assign({}, defaultListQuery);
        },
        //有获取全部信息的方法，需要吗？？？？？？？？？？？？？？？？

        //获取搜索列表
        getSearchList(){
            this.listLoading=true;
            fetchListSeller(this.listQuery).then(response => {
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

        // //获取seller详细信息
        // handleUpdateSeller(index, row){
        //     this.dialogVisible=true;
        //     this.userInfoId=row.userInfoId;    
        //     getSellerDetail(row.userInfoId).then(response=>{
        //         this.SellerDetail=response.data;
        //     });
        // },

        //获取seller详细信息
        handleUpdateSeller(index, row) {
            this.dialogVisible = true;
            // this.isEdit = true;
            this.SellerDetail = Object.assign({},row);
        },

        //修改用户信息  this.managerInfoId
        handleConfirm(){ 
          updateSeller(this.SellerDetail).then(response=>{
            this.dialogVisible=false;
            // this.managerInfoId=null;
            this.$message({
              message: '修改成功！',
              type: 'success',
              duration:1000
              });
                // this.getSearchList(); ??????????????????
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
</style>


