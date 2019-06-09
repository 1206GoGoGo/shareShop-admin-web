<template>
    <div>
        <div class="table-container">
            <el-tag>网站访问量：{{ createdTimes }}</el-tag>
            <el-button type="primary" style="margin-right:10px; float:right" size="small" @click="returnList">
            返回
            </el-button>     
            <el-table ref="productTable"
                highlight-current-row
                size="small"
                :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                :data="visitList"
                style="width: 100%;margin-bottom:20px;"
                
                v-loading="listLoading"
                fixed
                show-summary
                :summary-method="getSummaries"
                border>     
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="No." width="60" type="index" align="center">
                    <!-- <template slot-scope="scope">{{scope.row.managerInfoId}}</template> -->
                </el-table-column>
                <el-table-column label="时间" align="center">
                    <template slot-scope="scope">{{scope.row.date}}</template>
                </el-table-column>
                <el-table-column label="网站总访问量" align="center">
                    <template slot-scope="scope">{{scope.row.totalVisit}}</template>
                </el-table-column>
                <el-table-column label="普通用户访问量" sortable align="center">
                    <template slot-scope="scope">{{scope.row.userVisit }}</template>
                </el-table-column>
                <el-table-column label="会员访问量" sortable  align="center">
                    <template slot-scope="scope">{{scope.row.memberVisit}}</template>
                </el-table-column> 
                <el-table-column label="seller访问量" sortable  align="center">
                    <template slot-scope="scope">{{scope.row.sellerVisit}}</template>
                </el-table-column> 
                <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">       
                        <el-button
                            type="text"
                            size="mini"
                            @click="monthVisitDetail(scope.$index, scope.row)">详情
                        </el-button>                 
                    </template>
                </el-table-column> 
            </el-table>
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
        this.getProductCateList();
    },

    data(){
        return{
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            date1:'',
            date2:'',
            compareList:null,
            visitList:[
                {
                    date:'2019',
                    totalVisit:2324,
                    userVisit:234,
                    sellerVisit:524,
                    memberVisit:1323,
                },
                {
                    date:'2018',
                    totalVisit:1324,
                    userVisit:234,
                    sellerVisit:524,
                    memberVisit:323,
                },
                {
                    date:'2017',
                    totalVisit:4324,
                    userVisit:234,
                    sellerVisit:523,
                    memberVisit:2323,
                },
                {
                    date:'2016',
                    totalVisit:2324,
                    userVisit:234,
                    sellerVisit:524,
                    memberVisit:1323,
                },
            ],
            listQuery: Object.assign({}, defaultListQuery),
            productCateOptions:[],
            count:null,
            currentPage:null,
            
            list:null,
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
        monthVisitDetail(){
            this.$router.push({path:'/statistics/user/list_monthVisit'});
        },
        returnList(){
            this.$router.push({path:'/statistics/user/list_user'});
        },
        currentPage(){},
        handleSizeChange(){},
        handleCurrentChange(){},

    },
}
</script>

<style scoped>
</style>
    