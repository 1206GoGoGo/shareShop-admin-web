<template>
    <div>
        <!-- class="app-container" -->
        <!-- <el-card shadow="never" style="background:#f2f2f2;"> -->
            <div>
                <el-form :inline="true" :model="listQuery" style="margin-bottom:0px;"  size="small" label-width="100px" ref="productCateFrom">
                    <el-form-item label="查询时间：">
                        <el-date-picker
                            style="width:203px"
                            v-model="beginTime1"
                            type="date"
                            placeholder="Please select time"
                            align="right"
                            format="yyyy-MM-dd 0:0:0"
                            :picker-options="pickerOptions1">
                        </el-date-picker>
                        -
                        <el-date-picker
                            v-model="endTime1"
                            style="width:203px"
                            type="date"
                            placeholder="Please select time"
                            align="right"
                            format="yyyy-MM-dd 0:0:0"
                            :picker-options="pickerOptions1">
                        </el-date-picker>
                        <el-button type="primary" style="margin-left:10px;" size="small" @click="handleSearchList">查询</el-button>
                        <el-button type="primary" style="margin-left:10px;" size="small" @click="handleSearchList">导出</el-button>
                    </el-form-item>
                </el-form> 
            </div>
        <!-- </el-card> -->
<!--列表 S  @selection-change="handleSelectionChange"  -->
        <div class="table-container">
            <el-table ref="productTable"
                    highlight-current-row
                    size="medium"
                    :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                    :data="list"
                    style="width: 100%"
                    
                    v-loading="listLoading"
                    fixed
                    show-summary
                    :summary-method="getSummaries"
                    border>     
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="No." width="60" type="index" align="center">
                    <!-- <template slot-scope="scope">{{scope.row.managerInfoId}}</template> -->
                </el-table-column>
                <el-table-column label="普通用户注册量"  align="center">
                    <template slot-scope="scope">{{scope.row.userLogin.productName}}</template>
                </el-table-column>
                <el-table-column label="会员注册量" sortable    align="center">
                    <template slot-scope="scope">{{scope.row.userLogin.Quantity }}</template>
                </el-table-column>
                <el-table-column label="seller注册量" sortable  align="center">
                    <template slot-scope="scope">{{scope.row.money}}</template>
                </el-table-column> 
                <!-- <el-table-column label="库存" sortable width="120" align="center">
                    <template slot-scope="scope">{{scope.row.number}}</template>
                </el-table-column>  -->
            </el-table>
<!--分页 S-->
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
         <el-table ref="productTable"
                    highlight-current-row
                    size="medium"
                    :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                    :data="list"
                    style="width: 100%"
                    
                    v-loading="listLoading"
                    fixed
                    show-summary
                    :summary-method="getSummaries"
                    border>     
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="No." width="60" type="index" align="center">
                    <!-- <template slot-scope="scope">{{scope.row.managerInfoId}}</template> -->
                </el-table-column>
                <el-table-column label="网站总访问量"  align="center">
                    <template slot-scope="scope">{{scope.row.userLogin.productName}}</template>
                </el-table-column>
                <el-table-column label="普通用户访问量" sortable    align="center">
                    <template slot-scope="scope">{{scope.row.userLogin.Quantity }}</template>
                </el-table-column>
                <el-table-column label="会员访问量" sortable  align="center">
                    <template slot-scope="scope">{{scope.row.money}}</template>
                </el-table-column> 
                <el-table-column label="seller访问量" sortable  align="center">
                    <template slot-scope="scope">{{scope.row.money}}</template>
                </el-table-column> 
            </el-table>
        </div>
<!--列表 E--> 
<!--分页 S-->
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
        //获得商品分类
        getProductCateList()
        {
            fetchListLevel().then(response => {                
                let list = response.data;
                for (let i = 0; i < list.length; i++) {
                    fetchListChildrenLevel(list[i].categoryId).then(response => {
                        //注意级联！！！
                        list[i].children = response.data;
                        let children = [];
                        if (list[i].children != null && list[i].children.length > 0) {
                            for (let j = 0; j < list[i].children.length; j++) {
                                children.push({label: list[i].children[j].categoryName, value: list[i].children[j].categoryId});
                            }
                        }
                        this.productCateOptions.push({label: list[i].categoryName, value: list[i].categoryId, children: children});
                    })
                }
            });
        },

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

        //求和
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                        return prev + curr;
                    } else {
                        return prev;
                    }
                    }, 0);
                    sums[index] += ' 元';
                } else {
                    sums[index] = '';
                }
            });
            return sums;
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
    