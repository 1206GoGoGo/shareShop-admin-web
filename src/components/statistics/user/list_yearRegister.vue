<template>
    <div>
        <div class="table-container">
            <el-tag>网站注册量：{{ createdTimes }}</el-tag>
            <el-button type="primary" style="margin-right:10px; float:right" size="small" @click="returnList">
            返回
            </el-button> 
            <el-table ref="productTable"
                    highlight-current-row
                    size="small"
                    :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                    :data="registerList"
                    style="width: 100%; margin-bottom:20px;"
                    
                    v-loading="listLoading"
                    fixed
                    show-summary
                    :summary-method="getSummaries"
                    border>     
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="No." width="60" type="index" align="center">
                    <!-- <template slot-scope="scope">{{scope.row.managerInfoId}}</template> -->
                </el-table-column>
                <el-table-column label="时间"  align="center">
                    <template slot-scope="scope">{{scope.row.date}}</template>
                </el-table-column>
                <el-table-column label="网站总注册量"  align="center">
                    <template slot-scope="scope">{{scope.row.totalRegister}}</template>
                </el-table-column>
                <el-table-column label="普通用户注册量"  align="center">
                    <template slot-scope="scope">{{scope.row.userRegister}}</template>
                </el-table-column>
                <el-table-column label="会员注册量" sortable    align="center">
                    <template slot-scope="scope">{{scope.row.memebrRegister }}</template>
                </el-table-column>
                <el-table-column label="seller注册量" sortable  align="center">
                    <template slot-scope="scope">{{scope.row.sellerRegister}}</template>
                </el-table-column> 
                <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">       
                        <el-button
                            type="text"
                            size="mini"
                            @click="monthRegisterDetail(scope.$index, scope.row)">详情
                        </el-button>                 
                    </template>
                </el-table-column> 
            </el-table>     
<!--分页 S-->
            <!-- <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout=" prev, pager, next"
                  :total="count">
                </el-pagination>
            </div> -->
<!--分页 E-->   
    </div>
    </div>
</template>
    
<script>
import {fetchListLevel,fetchListChildrenLevel} from '@/api/productCate'
import {fetchProductList,} from '@/api/statistics'
import moment from 'moment'
const defaultListQuery = {
    pageindex: 0,
    pagesize: 20,
    id:null
}

export default {
    mounted: function () {
        
    },
    created() {
        this.getList();
        // this.getProductCateList();
    },

    data(){
        return{
            registerList:[
                {
                    date:'2019',
                    totalRegister:12323,
                    userRegister:1223,
                    memberRegister:1233,
                    sellerRegister:123,
                },
                {
                    date:'2018',
                    totalRegister:12323,
                    userRegister:1223,
                    memberRegister:1233,
                    sellerRegister:123,
                },
                {
                    date:'2017',
                    totalRegister:12323,
                    userRegister:1223,
                    memberRegister:1233,
                    sellerRegister:123,
                },
                {
                    date:'2016',
                    totalRegister:12323,
                    userRegister:1223,
                    memberRegister:1233,
                    sellerRegister:123,
                },
            ],
            listQuery: Object.assign({}, defaultListQuery),
            productCateOptions:[],
            count:null,
            currentPage:null,
            listLoading:false,
        }
    },
    methods:{
        handleSearchList(){},
        //初始化数据
        getList(){
            //this.listLoading=true;
            fetchProductList(this.listQuery).then(response => {
                this.listLoading = false;
                this.list = response.data;
            });
        },

        //统计一个月的销量
        handleSearchList(){
            //this.listLoading=true;
            fetchProductList(this.listQuery.id).then(response => {
                this.listLoading = false;
                this.list = response.data;
            });
        },
        currentPage(){},
        handleSizeChange(){},
        handleCurrentChange(){},
        monthRegisterDetail(){
            this.$router.push({path:'/statistics/user/list_monthRegister'});
        },
        returnList(){
            this.$router.push({path:'/statistics/user/list_user'});
        },
    },
}
</script>

<style scoped>

</style>
    