<template>
    <div class="app-container">
<!--条件搜索 S-->
        <el-card shadow="never">
            <div>
                <i class="el-icon-search"></i>
                <span>Conditional Search</span>
                <el-button
                    style="float: right"
                    @click="handleSearchList()"
                    type="primary"
                    size="small">
                    Search
                </el-button>
                <el-button
                    style="float: right;margin-right: 15px"
                    @click="handleResetSearch()"
                    size="small">
                    Reset
                </el-button>
            </div>
            <div style="margin-top: 10px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="Permission:">
                        <el-select v-model="listQuery.level" style="width: 203px" placeholder="All" clearable class="input-width">
                        <el-option v-for="item in level"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Login Name:">
                        <el-input style="width: 203px" v-model="listQuery.username" placeholder="Please enter your login name"></el-input>
                    </el-form-item>
                    <el-form-item label="Real Name:">
                        <el-input style="width: 203px" v-model="listQuery.name" placeholder="Real Name"></el-input>
                    </el-form-item>
                    <el-form-item label="Phone Number:"> 
                        <el-input style="width: 203px" v-model="listQuery.phoneNumber" placeholder="Phone Number"></el-input>
                    </el-form-item>
                    <el-form-item label="ID Number:"> 
                        <el-input style="width: 203px" v-model="listQuery.identityCardNo" placeholder="ID Number"></el-input>
                    </el-form-item>
                    <el-form-item label="Email:"> 
                        <el-input style="width: 203px" v-model="listQuery.email" placeholder="Email"></el-input>
                    </el-form-item>
                </el-form> 
            </div>
        </el-card>
<!--条件搜索 E-->
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span>Administrator List</span>
            <el-button
                class="btn-add"
                @click="handleAddAdmin()"
                size="mini">
                Add
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
                <el-table-column label="Number" width="180" align="center">
                    <template slot-scope="scope">{{scope.row.managerInfoId}}</template>
                </el-table-column>
                <el-table-column label="Login Name"  width="180"  align="center">
                    <template slot-scope="scope">{{scope.row.username}}</template>
                </el-table-column>
                <el-table-column label="Real Name" width="180" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="Gender" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.gender}}</template>
                </el-table-column>
                <el-table-column label="Permission" width="300" align="center">
                    <template slot-scope="scope">{{scope.row.level}}</template>
                </el-table-column>
                <el-table-column label="Registration Time" width="200" align="center">
                    <template slot-scope="scope">{{scope.row.registerTime}}</template>
                </el-table-column>
                <el-table-column label="Phone Number" width="280" align="center">
                    <template slot-scope="scope">{{scope.row.phoneNumber}}</template>
                </el-table-column>
                <el-table-column label="ID Card" width="300" align="center">
                    <template slot-scope="scope">{{scope.row.identityCardNo}}</template>
                </el-table-column>
                <el-table-column label="Type of ID Card" width="280" align="center">
                    <template slot-scope="scope">{{scope.row.identityCardType}}</template>
                </el-table-column>
                <el-table-column label="Email" width="260" align="center">
                    <template slot-scope="scope">{{scope.row.email}}</template>
                </el-table-column>
                <el-table-column label="Date of Birth" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.birthday}}</template>
                </el-table-column>
                <el-table-column label="Operate" width="160" align="center" fixed="right">
                    <template slot-scope="scope"> 
                        <el-button
                            size="mini"
                            @click="handleUpdateAdmin(scope.$index, scope.row)">Edit
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">Delete
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
<!--分页 S-->
            <!-- <div class="pagination-container">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    layout="total,sizes,prev, pager, next,jumper"
                    :current-page.sync="listQuery.pageNum"
                    :page-size="listQuery.pageSize"
                    :page-sizes="[5,10,15]"
                    :total="total">
                </el-pagination>
            </div> -->

            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout=" prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
<!--分页 E-->
        </div>
<!--编辑弹出框-->        
        <el-dialog                    
            title="Administrator Information"
            
            :visible.sync="dialogVisible" width="70%">
            <el-form :model="AdminDetail" :inline="true"
                    ref="DetailForm" label-width="150px">
                <el-form-item label="Number:">
                    <el-input v-model="AdminDetail.managerInfoId" class="input-width" readonly></el-input>
                </el-form-item>
                <el-form-item label="Permission:">
                    <el-select v-model="AdminDetail.level" placeholder="All" clearable class="input-width">
                    <el-option v-for="item in level"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                    </el-select>
                </el-form-item>   
                <el-form-item label="Login Name:">
                    <el-input v-model="AdminDetail.username" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="Real Name:">
                    <el-input v-model="AdminDetail.name" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="Phone Number:">
                    <el-input v-model="AdminDetail.phoneNumber" class="input-width"></el-input>
                </el-form-item>            
                <el-form-item label="Email:">
                    <el-input v-model="AdminDetail.email" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="Type of ID Card:">
                    <el-select v-model="AdminDetail.identityCardType" placeholder="全部" clearable class="input-width">
                        <el-option v-for="item in AdminDetail.identityCardType"
                            class="input-width"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="ID Card:">
                    <el-input v-model="AdminDetail.identityCardNo" class="input-width"></el-input>
                </el-form-item>
                <el-form-item label="Registration Time:">
                    <el-date-picker
                        v-model="AdminDetail.registerTime"
                        class="input-width"
                        type="date"
                        placeholder="Please Select Time">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="Gender:">
                    <el-radio-group v-model="AdminDetail.gender" class="input-width">
                        <el-radio :label="1">Male</el-radio>
                        <el-radio :label="0">Female</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="Date of Birth:">
                    <el-date-picker
                        v-model="AdminDetail.birthday"
                        class="input-width"
                        type="date"
                        placeholder="Please Select Time">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">Cancel</el-button>
                <el-button type="primary" @click="handleConfirm">Confirm</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// import axios from 'axios'
import {fetchList,getAdminDetail,updateManager,deleteManager} from '@/api/admin'

const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    
    level:null,
    name:null,
    username:null,
    phoneNumber:null,
    identityCardNo:null,
    // identityCardType:null,
    email:null,
    // birthday:null
  };

  const defaultAdminDetail = {
    managerInfoId:null,
    name:'',
    username:'',
    gender:'',
    phoneNumber:'',
    identityCardNo:'',
    identityCardType:'',
    email:'',
    birthday:'',
    level:[],
  };

export default {
    //初始化
    created() {
      this.getList();
    },
    data(){
        return{
            listQuery: Object.assign({}, defaultListQuery),
            AdminDetail: Object.assign({}, defaultAdminDetail),
            list: [{
                'managerInfoId': 12345678,
                'username': 'michleSarah666',
                'name': 'zhangsanying',
                'gender': 0,
                'level':'Super administrator',
                'registerTime':'2019-08-1',
                'phoneNumber': 18437963762,
                'identityCardNo': 421987654321345567,
                'identityCardType':0,
                'email':'28973823@qq.com',    
                'birthday':'1993-08-1',
            },
            {
                'managerInfoId': 12345673,
                'username': 'michleSarah111',
                'name': 'zhangsanying',
                'gender': 1,
                'level':'Super administrator',
                'registerTime':'2019-08-1',
                'phoneNumber': 18437963762,
                'identityCardNo': 421987654321345567,
                'identityCardType':1,
                'email':'28973823@qq.com',    
                'birthday':'1993-08-1',
            },
            {
                'managerInfoId': 12345670,
                'username': 'michleSarah888',
                'name': 'zhangsanying',
                'gender': 0,
                'level':'Super administrator',
                'registerTime':'2019-08-1',
                'phoneNumber': 18437963762,
                'identityCardNo': 421987654321345567,
                'identityCardType':0,
                'email':'28973823@qq.com',    
                'birthday':'1993-08-1',
            }
            ],
            // total: null,
            offset: 0,
            limit: 20,
            count: 0,
            currentPage: 1,
            // listLoading: true,

            // AdminDetail:{
            //     managerInfoId:null,
            //     name:'',
            //     username:'',
            //     gender:'',
            //     phoneNumber:'',
            //     identityCardNo:'',
            //     identityCardType:'',
            //     registerTime:'',
            //     email:'',
            //     birthday:'',
            //     level:[],
            // },
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
        }
    },
    methods:{
        //获取列表
        getList(){
            this.listLoading=true;
            //this.listQuery为空即为查询全部，有查询条件根据条件查询
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
            // this.currentPage = val;
            // this.offset = (val - 1)*this.limit;
            // this.getUsers()

            this.listQuery.pageNum = val;
            this.getList();
        },

        handleSelectionChange(){},

        //由于已经获取到了全部数据，就无需使用这种方法
        // //获取管理员详细信息
        // handleUpdateAdmin(index, row){
        //     this.dialogVisible=true;
        //     this.managerInfoId=row.managerInfoId;
        //     getAdminDetail(row.managerInfoId).then(response=>{
        //         this.AdminDetail=response.data;
        //     });
        // },

        //获取管理员详细信息
        handleUpdateAdmin(index, row) {
            this.dialogVisible = true;
            // this.isEdit = true;
            this.AdminDetail = Object.assign({},row);
        },
    
        //修改管理员操作  this.managerInfoId
        handleConfirm(){ 
          updateManager(this.AdminDetail).then(response=>{
            this.dialogVisible=false;
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
            this.deleteManager(ids);
        },
        
        //删除详细信息
        deleteManager(ids){
            this.$confirm('是否要进行该删除操作?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
            //let params = new URLSearchParams(); //?????????????post 还是get??????
            //params.append("ids",ids);
            deleteManager(this.managerInfoId).then(response=>{
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
    width: 203px;
  }
</style>


