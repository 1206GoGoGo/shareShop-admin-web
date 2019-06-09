<template>
    <div>
        <!-- class="app-container" -->
        <!-- <el-card shadow="never" style="background:#f2f2f2;"> -->
            <div>
                <el-form :inline="true" :model="listQuery" style="margin-bottom:0px;"  size="small" label-width="100px" ref="productCateFrom">
                    <el-form-item label="商品分类：" style="margin-bottom:0px;">
                        <el-cascader
                            style="width:203px;"
                            placeholder="please selete"
                            expand-trigger="click"
                            clearable
                            v-model="listQuery.id"
                            :options="productCateOptions"
                            change-on-select>
                        </el-cascader>                        
                    </el-form-item>
                    <el-form-item>
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
                <el-table-column label="商品名称"  align="center">
                    <template slot-scope="scope">{{scope.row.userLogin.productName}}</template>
                </el-table-column>
                <el-table-column label="销量" sortable  width="120"  align="center">
                    <template slot-scope="scope">{{scope.row.userLogin.Quantity }}</template>
                </el-table-column>
                <el-table-column label="销售额" sortable width="160" align="center">
                    <template slot-scope="scope">{{scope.row.money}}</template>
                </el-table-column> 
                <el-table-column label="成本" sortable width="120" align="center">
                    <template slot-scope="scope">{{scope.row.number}}</template>
                </el-table-column> 
            </el-table>
            <el-table ref="productTable"
                size="small"
                highlight-current-row
                :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                :data="productList"
                style="width: 100%"
                
                v-loading="listLoading"
                fixed
                border>
            <el-table-column label="No." width="70" type="index" align="center">
                
            </el-table-column>
            <el-table-column label="销售时间" prop="time" width="120" align="center">
            </el-table-column> 
            <el-table-column label="商品名称" prop="productName" align="center">
            </el-table-column> 
            <el-table-column label="价格" prop="price" width="90" sortable  align="center">  
            </el-table-column> 
            <el-table-column label="销售数量" prop="number" width="100" sortable  align="center">  
            </el-table-column> 
            <el-table-column label="折扣" prop="discount" sortable width="90" align="center"> 
            </el-table-column>
            <el-table-column label="是否使用优惠券" prop="isCoupon" sortable width="130" align="center"> 
            </el-table-column>
            <el-table-column label="销售额" prop="saleMoney" sortable width="100" align="center"> 
            </el-table-column>
            <el-table-column label="用户级别" prop="saleWay" sortable width="120" align="center"> 
            </el-table-column>
            <el-table-column label="seller佣金" prop="sellerMoney" sortable width="110" align="center"> 
            </el-table-column>
            <el-table-column label="税费" prop="taxPay" sortable width="100" align="center"> 
            </el-table-column>
            <el-table-column label="运费" prop="farePay" sortable width="100" align="center"> 
            </el-table-column>
            <el-table-column label="商品成本" prop="cost" sortable width="100" align="center"> 
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">       
                    <el-button
                        type="text"
                        size="mini"
                        @click="handleIncomeDetail(scope.$index, scope.row)">详情
                    </el-button>                 
                </template>
            </el-table-column> 
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

        <div>
            <el-table ref="productTable"
                size="small"
                highlight-current-row
                :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                :data="list"
                style="width: 100%"
                
                v-loading="listLoading"
                fixed
                show-summary
                sum-text="Total"
                border>
                <el-table-column label="No." width="70" type="index" align="center">
                    <!-- <template slot-scope="scope">{{scope.row.managerInfoId}}</template> -->
                </el-table-column>
                <el-table-column label="销售商品" prop="totalMoney"  align="center">
                </el-table-column> 
                <el-table-column label="销量" prop="sellerMoney" sortable  align="center">  
                </el-table-column> 
                <!-- <el-table-column label="折扣" prop="cost" sortable width="160" align="center"> 
                </el-table-column>
                <el-table-column label="优惠券" prop="cost" sortable width="160" align="center"> 
                </el-table-column> -->
                <el-table-column label="销售额" prop="cost" sortable width="160" align="center"> 
                </el-table-column>
                <!-- <el-table-column label="销售方式" prop="cost" sortable width="160" align="center"> 
                </el-table-column>平台销售?seller？普通用户 -->
                <el-table-column label="商品成本" prop="cost" sortable width="160" align="center"> 
                </el-table-column>
                <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">       
                        <el-button
                            type="text"
                            size="mini"
                            @click="handleIncomeDetail(scope.$index, scope.row)">详情
                        </el-button>                 
                    </template>
                </el-table-column> 
            </el-table>
        </div>
    </div>
<!--列表 E--> 

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
            productList:[
                {
                    time:'2019-05-07',
                    productName:'太阳帽防晒遮阳小清新', 
                    price:'3234',
                    number:'2',
                    discount:'3%',
                    isCoupon:'否',
                    saleMoney:'$199',
                    saleWay:'会员',
                    sellerMoney:'$5',
                    taxPay:'$10',
                    farePay:'$5',
                    cost:'$50',
                },
                {
                    time:'2019-05-07',
                    productName:'鸭舌帽防晒遮阳小清新', 
                    price:'3234',
                    number:'2',
                    discount:'3%',
                    isCoupon:'否',
                    saleMoney:'$199',
                    saleWay:'seller',
                    sellerMoney:'$5',
                    taxPay:'$10',
                    farePay:'$5',
                    cost:'$50',
                },
                {
                    time:'2019-05-07',
                    productName:'圆帽防晒遮阳小清新', 
                    price:'3234',
                    number:'2',
                    discount:'3%',
                    isCoupon:'否',
                    saleMoney:'$199',
                    saleWay:'会员',
                    sellerMoney:'$5',
                    taxPay:'$10',
                    farePay:'$5',
                    cost:'$50',
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
    