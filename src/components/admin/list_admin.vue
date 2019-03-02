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
                    <el-form-item label="权限：">
                        <!--v-model="listQuery.level"这样写对吗？？？？？？  -->
                        <el-select v-model="listQuery.level" style="width: 203px" placeholder="全部" clearable class="input-width">
                        <el-option v-for="item in level"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="真实姓名：">
                        <el-input style="width: 203px" v-model="listQuery.name" placeholder="真实姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="登录名：">
                        <el-input style="width: 203px" v-model="listQuery.username" placeholder="登陆名"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号："> 
                        <el-input style="width: 203px" v-model="listQuery.phoneNumber" placeholder="手机号"></el-input>
                    </el-form-item>
                </el-form> 
            </div>
        </el-card>
<!--条件搜索 E-->
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span>管理员列表</span>
            <el-button
                class="btn-add"
                @click="handleAddAdmin()"
                size="mini">
                添加
            </el-button>
        </el-card>
<!--列表内容-->
        <div class="table-container">
            <el-table ref="productTable"
                    :data="list"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"  
                    
                    border>     
                    <!-- v-loading="listLoading"   -->
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="编号" width="60" align="center">
                    <template slot-scope="scope">{{scope.row.managerInfoId}}</template>
                </el-table-column>
                <el-table-column label="登录名"  width="100"  align="center">
                    <template slot-scope="scope">{{scope.row.username}}</template>
                </el-table-column>
                <el-table-column label="真实姓名" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="性别" width="60" align="center">
                    <template slot-scope="scope">{{scope.row.gender}}</template>
                </el-table-column>
                <el-table-column label="权限" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.level}}</template>
                </el-table-column>
                <el-table-column label="注册时间" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.registerTime}}</template>
                </el-table-column>
                <el-table-column label="手机号" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.phoneNumber}}</template>
                </el-table-column>
                <el-table-column label="证件号码" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.identityCardNo}}</template>
                </el-table-column>
                <el-table-column label="证件类型" width="180" align="center">
                    <template slot-scope="scope">{{scope.row.identityCardType}}</template>
                </el-table-column>
                <el-table-column label="邮箱" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.email}}</template>
                </el-table-column>
                <el-table-column label="出生年月" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.birthday}}</template>
                </el-table-column>
                <el-table-column label="操作" width="160" align="center">
                    <template slot-scope="scope">
                        <p>
                        <el-button
                            size="mini"
                            @click="handleUpdateAdmin(scope.$index, scope.row)">编辑
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
        </div>
<!--编辑弹出框！！！！-->        
        <!-- <el-dialog                    ！！！！！！！！！！！！！！！！！报错代码！！！！！！！！！！！！！！！！！
            title="管理员信息"
            
            :visible.sync="dialogVisible" width="80%">
            <el-form :model="AdminDetail"
                    ref="DetailForm" label-width="100px">
                <el-form-item label="编号:">
                    <el-input v-model="AdminDetail.managerInfoId" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="登录名:">
                    <el-input v-model="AdminDetail.username" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="姓名:">
                    <el-input v-model="AdminDetail.name" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="权限:">
                    <el-input v-model="AdminDetail.level" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="注册时间:">
                    <el-input v-model="AdminDetail.registerTime" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="手机号:">
                    <el-input v-model="AdminDetail.phoneNumber" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="证件号码:">
                    <el-input v-model="AdminDetail.identityCardNo" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="证件类型:">
                    <el-input v-model="AdminDetail.identityCardType" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:">
                    <el-input v-model="AdminDetail.email" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="出生年月:">
                    <el-input v-model="AdminDetail.birthday" class="input-width"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleConfirm">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
import {fetchList,getAdminDetail,updateManage,deleteManage} from '@/api/admin'

const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    level:null,
    name:null,
    username:null,
    phoneNumber:null,
    identityCardNo:null,
    identityCardType:null,
    email:null,
    birthday:null
  };

export default {
    created() {
      this.getList();
    },
    data(){
        return{
            listQuery: Object.assign({}, defaultListQuery),
            list: null,
            total: null,
            // listLoading: true,
            name:'',
            username:'',
            phoneNumber:'',
            identityCardNo:'',
            identityCardType:'',
            email:'',
            birthday:'',
            level: [{
                value: 0,
                label: '超级管理员'
                },{
                value: 1,
                label: '客服管理员'
                },{
                value: 2,
                label: '商品管理员'
                },{
                value: 3,
                label: '订单管理员'
            }],
            dialogVisible:false,
            managerInfoId:null,
        }
    },
    methods:{
        //获取列表
        getList(){
            this.listLoading=true;
            //需要参数吗？？？？？？？？this.listQuery
            fetchList().then(response => {
            this.listLoading = false;
            this.list = response.data.list;
            this.total = response.data.total;
            });
        },
        //获取搜索结果
        handleSearchList(val){
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;
            this.getList();
        },
        //重置
        handleResetSearch(){
            this.listQuery = Object.assign({}, defaultListQuery);
        },
        //添加管理员
        handleAddAdmin(){
            this.$router.push({path: '/admin/add_admin'})
        },

        //获取页码
        handleSizeChange(val){
            // console.log(`每页 ${val} 条`);
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;
            this.getList();
        },
        //获取当前页
        handleCurrentChange(val) {
            //this.currentPage = val;
            //this.offset = (val - 1)*this.limit;
            //this.getUsers()
            this.listQuery.pageNum = val;
            this.getList();
        },
        //？？？？？？？？？？？？？？
        handleSelectionChange(){},

        //获取管理员详细信息
        handleUpdateAdmin(index, row){
            this.dialogVisible=true;
            this.managerInfoId=row.managerInfoId;
            getAdminDetail(row.managerInfoId).then(response=>{
                this.AdminDetail=response.data;
            });
        },
    
        //修改管理员操作  this.managerInfoId
        handleConfirm(){ 
          updateManage(this.AdminDetail).then(response=>{
            this.dialogVisible=false;
            // this.managerInfoId=null;
            this.$message({
              message: '修改成功！',
              type: 'success',
              duration:1000
              });
                this.getList();
            });
        },

        //删除管理员
        handleDelete(index, row){
            let ids=[];
            ids.push(row.managerInfoId);
            this.deleteManage(ids);
        },
        
        //删除详细信息
        deleteManage(ids){
            this.$confirm('是否要进行该删除操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
            //let params = new URLSearchParams(); //?????????????post 还是get??????
            //params.append("ids",ids);
            deleteManage(this.managerInfoId).then(response=>{
                this.$message({
                message: '删除成功！',
                type: 'success',
                duration: 1000
                });
                this.listQuery.pageNum=1;
                this.getList();
                });
            })
        },

    }
}
</script>

<style scoped>
    .input-width {
    width: 80%;
  }
</style>


