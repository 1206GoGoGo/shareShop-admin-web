<template>
    <div class="app-container">
<!--条件搜索 S-->
        <!-- <el-card shadow="never" style="background:#f2f2f2;">
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
                        <el-select v-model="listQuery.level" style="width: 203px" placeholder="All" clearable >
                        <el-option v-for="item in selectlevel"
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
        </el-card> -->
<!--条件搜索 E class="operate-container"-->
        <el-card  shadow="never">
            <i class="el-icon-tickets"></i>
            <span>Administrator List</span>
            <el-button
                class="btn-add1"
                type="primary"
                @click="handleAddAdmin()"
                size="mini">Add</el-button>
        </el-card>
<!--列表内容-->
        <div class="table-container">
            <el-table ref="productTable"
                    highlight-current-row
                    
                    :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                    :data="list"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"  
                    v-loading="listLoading"
                    border>     
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="No." width="60" align="center">
                    <template slot-scope="scope">{{scope.row.managerInfoId}}</template>
                </el-table-column>
                <el-table-column label="Login Name"  width="180"  align="center">
                    <template slot-scope="scope">{{scope.row.userLogin.username}}</template>
                </el-table-column>
                <el-table-column label="Permission"  width="160"  align="center">
                    <template slot-scope="scope">{{scope.row.userLogin.level |levelFormatter}}</template>
                </el-table-column>
                <el-table-column label="Real Name" width="180" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="Gender" width="80" align="center">
                    <template slot-scope="scope">{{scope.row.gender | genderFormatter}}</template>
                </el-table-column>
                <el-table-column label="Registration Time" width="200" align="center">
                    <template slot-scope="scope">{{scope.row.registerTime | date1Formatter}}</template>
                </el-table-column>
                <el-table-column label="Phone Number" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.phoneNumber}}</template>
                </el-table-column>
                <!-- <el-table-column label="ID Card" width="230" align="center">
                    <template slot-scope="scope">{{scope.row.identityCardNo}}</template>
                </el-table-column>
                <el-table-column label="Type of ID Card" width="180" align="center">
                    <template slot-scope="scope">{{scope.row.identityCardType | idFormatter}}</template>
                </el-table-column> -->
                <el-table-column label="Email" width="260" align="center">
                    <template slot-scope="scope">{{scope.row.email}}</template>
                </el-table-column>
                <el-table-column label="Date of Birth" width="140" align="center">
                    <template slot-scope="scope">{{scope.row.birthday | date2Formatter}}</template>
                </el-table-column>
                <el-table-column label="Operate" width="200" align="center" fixed="right">
                    <template slot-scope="scope"> 
                        <el-button
                            size="mini"
                            icon="el-icon-edit"
                            type="primary"
                            @click="handleUpdateAdmin(scope.$index, scope.row)">Edit
                        </el-button>
                        <el-button
                            size="mini"
                            icon="el-icon-delete"
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
                    :current-page.sync="listQuery.pageindex"
                    :page-size="listQuery.pagesize"
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
                    <el-input v-model="AdminDetail.managerInfoId" style="width: 203px"  readonly></el-input>
                </el-form-item>
                <el-form-item label="Permission:">
                    <el-input v-model="AdminDetail.level" style="width: 203px" readonly></el-input>
                </el-form-item> 
                <el-form-item label="Login Name:">
                    <el-input v-model="AdminDetail.username" style="width: 203px" readonly></el-input>
                </el-form-item>
                <el-form-item label="Real Name:">
                    <el-input v-model="AdminDetail.name" style="width: 203px" ></el-input>
                </el-form-item>
                <el-form-item label="Phone Number:">
                    <el-input v-model="AdminDetail.phoneNumber" style="width: 203px" ></el-input>
                </el-form-item>            
                <el-form-item label="Email:">
                    <el-input v-model="AdminDetail.email" style="width: 203px" ></el-input>
                </el-form-item>
                <el-form-item label="Type of ID Card:">
                    <el-select v-model="AdminDetail.identityCardType" placeholder="全部" style="width: 203px" clearable >
                        <el-option v-for="item in IDCardType"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="ID Card:">
                    <el-input v-model="AdminDetail.identityCardNo" style="width: 203px" ></el-input>
                </el-form-item>
                <el-form-item label="Registration Time:">
                    <el-date-picker
                        v-model="AdminDetail.registerTime"
                        readonly
                        style="width: 203px"
                        type="date"
                        placeholder="Please Select Time">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="Gender:">
                    <el-radio-group v-model="AdminDetail.gender" style="width: 203px" >
                        <el-radio :label="0">Male</el-radio>
                        <el-radio :label="1">Female</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="Date of Birth:">
                    <el-date-picker
                        v-model="AdminDetail.birthday"            
                        style="width: 203px"
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
import {formatDate} from '@/utils/date';
const defaultListQuery = {
    pageindex: 0,
    pagesize: 20,
    status:1,

    level:null,
    name:null,
    username:null,
    phoneNumber:null,
    identityCardNo:null,
    email:null,
  };

  const defaultAdminDetail = {
    managerInfoId:null,
    name:'',
    username:'',
    gender:0,
    phoneNumber:'',
    identityCardNo:'',
    identityCardType:null,
    email:'',
    birthday:'',
    level:[],
  };

export default {
    //初始化
    created() {
      this.getList();
    },

    //过滤器 格式化
    filters: {
        //注册日期格式
        date1Formatter(time) {
            let date = new Date(time);
            return formatDate(date, 'MM.dd.yyyy hh:mm:ss')
        },
        //出生日期格式
        date2Formatter(time) {
            let date = new Date(time);
            return formatDate(date, 'MM.dd.yyyy')
        },
        //性别
        genderFormatter(value){
            if(value === "0"){return 'Male'} else {return 'Female'}
        },
        //身份验证
        idFormatter(value)
        {
            if(value===0){return 'IDP'} //驾照
            else if(value===1){return 'SSN'} //社会安全号
            else {return 'Not Clear'}  //不清楚
        },
        //级别
        levelFormatter(value)
        {
            if(value===11){return 'General Admin'} //一般管理员
            else if(value===20){return 'Super Admin'} //超级管理员
            else {return 'Not Clear'}  //不清楚
        },
    },
    data(){
        return{
            listQuery: Object.assign({}, defaultListQuery),
            AdminDetail: Object.assign({}, defaultAdminDetail),
            list:null,
            //分页
            total: null,
            offset: 0,
            limit: 20,
            count: 0,
            currentPage: 1,

            listLoading: false,
            IDCardType:[
                {
                    label: "IDP", //驾照
                    value: 0
                },
                {
                    label: "SSN", //社会安全码
                    value: 1
                }
            ],
            selectlevel: [{
                value: 11,
                label: 'General Admin'
                },{
                value: 20,
                label: 'Super Admin'
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
                this.list = response.data;
                this.total = response.data.total;
            });
        },
        
        //获取搜索结果
        handleSearchList(){
            this.listQuery.pageindex = 0;
            this.listQuery.pagesize = 20;
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
            console.log(`每页 ${val} 条`);
            // this.listQuery.pageindex = 0;
            // this.listQuery.pagesize = val;
            this.getList();
        },

        //获取当前页
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1)*this.limit;
            // this.getUsers()

            // this.listQuery.pageindex = val;
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
            this.AdminDetail = Object.assign({},row)
            this.AdminDetail.username=row.userLogin.username
            this.AdminDetail.level=row.userLogin.level
            if(this.AdminDetail.level===11){ this.AdminDetail.level='General Admin' }
            else if(this.AdminDetail.level===20){ this.AdminDetail.level='Super Admin' }
            else { this.AdminDetail.level='Not Clear' }
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
            //let params = new URLSearchParams(); 
            //params.append("ids",ids);
            deleteManager(this.managerInfoId).then(response=>{
                this.$message({
                message: '删除成功！',
                type: 'success',
                duration: 1000
                });
                this.listQuery.pageindex=0;
                this.getList();
                });
            })
        },

    }
}
</script>

<style scoped>
.btn-add1{
    float:right;
    padding-right: 20px;
}
</style>


