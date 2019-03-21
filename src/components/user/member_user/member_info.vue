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
                    <el-form-item label="所属seller：">
                        <el-input style="width: 203px" v-model="listQuery.sellerName" placeholder="所属seller"></el-input>
                    </el-form-item>
                </el-form> 
            </div>
        </el-card>
<!--条件搜索 E-->
        <!-- v-loading="listLoading" -->
        <div class="table-container">
            <el-table ref="productTable"
                        highlight-current-row
                        :data="list"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        
                        border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="编号" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="会员姓名" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="会员地址" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="注册时间" width="140" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="所属seller" width="140" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="会员状态" width="100" align="center">
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
            
        </div>
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
</template>

<script>

const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    
    name:null,
    username:null,
    phoneNumber:null,
    identityCardNo:null,
    sellerName:null
  };

export default {
    data(){
        return{
            listQuery: Object.assign({}, defaultListQuery),
            list: null,
            //listLoading: true,
            
            // offset: 0,
            // limit: 20,
            // count: 0,
            //currentPage: 1,
            UserDetail:{
                userInfoId:null,
                name:null,
                username:null,
                phoneNumber:null,
                identityCardNo:null,
                email:null,
                firstAddr:null,
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
            //需要参数吗？？？？？？？？this.listQuery
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

        handleSelectionChange(){},



        handleShowUser(){},
        handleUpdateUser(){},
        handleDelete(){}
    }
}
</script>

<style scoped>
</style>


