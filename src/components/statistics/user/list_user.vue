<template>
    <div>
        <div class="table-container">
            <el-form :inline="true" size="small">
                <el-tag>网站访问量：{{ createdTimes }}</el-tag>
                <el-form-item>
                    <el-date-picker
                        style="width:203px;margin-left:10px;"
                        v-model="beginTime1"
                        type="date"
                        placeholder="Please select time"
                        align="right"
                        format="yyyy-MM-dd 00:00:00"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                    -
                    <el-date-picker
                        v-model="endTime1"
                        style="width:203px"
                        type="date"
                        placeholder="Please select time"
                        align="right"
                        format="yyyy-MM-dd 00:00:00"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                    <el-button type="primary" style="margin-left:10px;" @click="handleSearchList">查询</el-button>
                </el-form-item>
                <el-button type="primary" style="margin-right:10px; float:right" size="small" @click="searchYearVisit">
                    年访问量
                </el-button> 
            </el-form>

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
                <el-table-column label="时间"  align="center">
                    <template slot-scope="scope">{{scope.row.date}}</template>
                </el-table-column>
                <el-table-column label="网站总访问量"  align="center">
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
            </el-table>

            <el-form :inline="true" size="small">
                <el-tag>网站注册量：{{ createdTimes }}</el-tag>
                <el-form-item>
                    <el-date-picker
                        style="width:203px;margin-left:10px;"
                        v-model="beginTime1"
                        type="date"
                        placeholder="Please select time"
                        align="right"
                        format="yyyy-MM-dd 00:00:00"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                    -
                    <el-date-picker
                        v-model="endTime1"
                        style="width:203px"
                        type="date"
                        placeholder="Please select time"
                        align="right"
                        format="yyyy-MM-dd 00:00:00"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                    <el-button type="primary" style="margin-left:10px;" @click="handleSearchList">查询</el-button>
                </el-form-item>
                <el-button type="primary" style="margin-right:10px; float:right" size="small" @click="searchYearRegister">
                    年注册量
                </el-button>
            </el-form>

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
                <!-- <el-table-column label="库存" sortable width="120" align="center">
                    <template slot-scope="scope">{{scope.row.number}}</template>
                </el-table-column>  -->
            </el-table>
            <el-tag style="margin-bottom:10px;">对比查询：{{ createdTimes }}</el-tag>
            <el-form :inline="true" :model="listQuery" style="margin-bottom:0px;"  size="small" ref="productCateFrom">
                <el-form-item label="查询时间：">
                    <el-date-picker
                        v-model="value1"
                        style="width:400px"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <!-- <el-date-picker
                        style="width:203px"
                        v-model="date1"
                        type="date"
                        placeholder="Please select time"
                        align="right"
                        format="yyyy-MM-dd" 
                        :picker-options="pickerOptions">
                    </el-date-picker> -->
                </el-form-item>
                <el-form-item label="对比时间：">
                    <!-- <el-date-picker
                        style="width:203px"
                        v-model="date2"
                        type="date"
                        placeholder="Please select time"
                        align="right"
                        format="yyyy-MM-dd" 
                        :picker-options="pickerOptions">
                    </el-date-picker> -->
                    <el-date-picker
                        v-model="value1"
                        style="width:400px"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form> 
            <el-table ref="productTable"
                    highlight-current-row
                    size="small"
                    :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                    :data="compareList"
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
                <!-- <el-table-column label="库存" sortable width="120" align="center">
                    <template slot-scope="scope">{{scope.row.number}}</template>
                </el-table-column>  -->
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
        this.beginTime1 = moment().subtract(1, 'month').format('MM-DD-YYYY 00:00:00');
        //this.beginTime1 = moment().subtract(7, 'days').format('MM-DD-YYYY 00:00:00');
        this.endTime1 = moment().format('MM-DD-YYYY 00:00:00');

        this.handleSearchList();
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
            //时间
            pickerOptions1: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = moment().subtract(1, 'days').format('MM-DD-YYYY 00:00:00');
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '7天前',
                    onClick(picker) {
                        const date = moment().subtract(7, 'days').format('MM-DD-YYYY 00:00:00');
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '30天前',
                    onClick(picker) {
                        const date = moment().subtract(30, 'days').format('MM-DD-YYYY 00:00:00');
                        picker.$emit('pick', date);
                    }
                }]
            },
            beginTime1: '',
            endTime1: '',
            date1:'',
            date2:'',
            compareList:null,
            visitList:[
                {
                    date:'2019-5-13',
                    totalVisit:2324,
                    userVisit:234,
                    sellerVisit:524,
                    memberVisit:1323,
                },
                {
                    date:'2019-5-12',
                    totalVisit:1324,
                    userVisit:234,
                    sellerVisit:524,
                    memberVisit:323,
                },
                {
                    date:'2019-5-11',
                    totalVisit:4324,
                    userVisit:234,
                    sellerVisit:523,
                    memberVisit:2323,
                },
                {
                    date:'2019-5-10',
                    totalVisit:2324,
                    userVisit:234,
                    sellerVisit:524,
                    memberVisit:1323,
                },
            ],
            registerList:[
                {
                    date:'2019-5-13',
                    totalRegister:12323,
                    userRegister:1223,
                    memberRegister:1233,
                    sellerRegister:123,
                },
                {
                    date:'2019-5-12',
                    totalRegister:12323,
                    userRegister:1223,
                    memberRegister:1233,
                    sellerRegister:123,
                },
                {
                    date:'2019-5-11',
                    totalRegister:12323,
                    userRegister:1223,
                    memberRegister:1233,
                    sellerRegister:123,
                },
                {
                    date:'2019-5-10',
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
            //时间
            pickerOptions1: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = moment().subtract(1, 'days').format('MM-DD-YYYY 00:00:00');
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '7天前',
                    onClick(picker) {
                        const date = moment().subtract(7, 'days').format('MM-DD-YYYY 00:00:00');
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '30天前',
                    onClick(picker) {
                        const date = moment().subtract(30, 'days').format('MM-DD-YYYY 00:00:00');
                        picker.$emit('pick', date);
                    }
                }]
            },
            beginTime1: '',
            endTime1: '',
            
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
        
        searchYearVisit(){
            this.$router.push({path:'/statistics/user/list_yearVisit'});
        },
        searchYearRegister(){
            this.$router.push({path:'/statistics/user/list_yearRegister'});
        },

        currentPage(){},
        handleSizeChange(){},
        handleCurrentChange(){},

    },
}
</script>

<style scoped>

/* .home-container{
    padding: 20px;
    background-color: #f2f2f2;
} */
</style>
    