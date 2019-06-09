<template>
    <div><!--加库存排序-->
        <div class="table-layout">
            <el-row>
                <el-col :span="8" class="table-cell-title">时间</el-col>
                <el-col :span="4" class="table-cell-title">总销量</el-col>
                <el-col :span="4" class="table-cell-title">seller销量</el-col>
                <el-col :span="4" class="table-cell-title">总销售额</el-col>
                <el-col :span="4" class="table-cell-title">seller销售额</el-col>
            </el-row>
            <el-row>
                <el-col :span="8" class="table-cell">{{income.name}}</el-col>
                <el-col :span="4" class="table-cell">{{income.type}}</el-col>
                <el-col :span="4" class="table-cell">{{income.useType}}</el-col>
                <el-col :span="4" class="table-cell">{{income.useCondition}}</el-col>
                <el-col :span="4" class="table-cell">{{income.faceValue}}</el-col>
            </el-row>
        </div>
        <div>
            <el-table ref="productTable"
                    size="small"
                    highlight-current-row
                    :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                    :data="productCateList"
                    style="width: 100%;margin-bottom:20px;"

                    v-loading="listLoading"
                    fixed
                    show-summary
                    sum-text="Total"
                    border>
                <el-table-column label="No." width="70" type="index" align="center">
                </el-table-column>
                <!-- <el-table-column label="时间" sortable  width="120" prop="time" align="center">
                </el-table-column> -->
                <el-table-column label="商品分类" width="120" prop="productSort" align="center">
                </el-table-column>
                <el-table-column label="级别" width="120" prop="productLevel" align="center">
                </el-table-column>
                <el-table-column label="总销量" prop="totalMoney" sortable  align="center">
                    <!-- <template slot-scope="scope">${{scope.row.totalMoney}}</template> -->
                </el-table-column> 
                <el-table-column label="seller销量" prop="sellerMoney" sortable  align="center">
                    <!-- <template slot-scope="scope">${{scope.row.sellerMoney}}</template> -->
                </el-table-column> 
                <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">       
                    <el-button
                        type="text"
                        size="mini"
                        @click="handleIncomeProductCateDetail(scope.$index, scope.row)">详情
                    </el-button>                 
                </template>
            </el-table-column> 
            </el-table>
        </div>
        <div>
            <div class="pro-form">
                <el-form :inline="true" size="small" ref="productCateFrom">
                    <el-form-item label="商品分类：">
                        <el-cascader
                            style="width:203px;"
                            placeholder="please selete"
                            expand-trigger="click"
                            clearable
                            v-model="CateId"
                            :options="productCateOptions"
                            change-on-select>
                        </el-cascader>
                    </el-form-item>
                    <el-button type="primary" style="margin-left:10px;" size="small" @click="handleSearchList">查询</el-button>
                    <el-button type="primary" style="margin-left:10px;" size="small" @click="handleSearchList">导出</el-button> 
                </el-form> 
            </div>
        <div>
            <el-table ref="productTable"
                size="small"
                highlight-current-row
                :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                :data="productList"
                style="width: 100%; margin-bottom:20px;"
                
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
        </div>
<!--列表 E--> 

        </div>
    </div>
</template>

<script>
//统计用户的销售额、成本、支出（税率）
import {fetchListLevel,fetchListChildrenLevel} from '@/api/productCate'
import {fetchListBycategoryId,statisticSales} from '@/api/statistics'

export default{

    created() {
        //this.getList();
        this.getProductCateList();        
    },

    data(){
        return{
            productCateOptions:[],
            income:[],
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
            productCateList:[
                {
                    productSort:'帽子',
                    productLevel:'1级',
                    time:'2018-1',
                    //month:'1月',
                    totalSale:'3356',
                    sellerSale:'1545',
                    totalMoney:'343434',
                    sellerMoney:'45453',
                    cost:'34322' 
                },
                {
                    productSort:'围巾',
                    productLevel:'1级',
                    time:'2018-1',
                    //month:'1月',
                    totalSale:'3356',
                    sellerSale:'1545',
                    totalMoney:'343434',
                    sellerMoney:'45453',
                    cost:'34322' 
                },
                {
                    productSort:'裤子',
                    productLevel:'1级',
                    time:'2018-1',
                    //month:'1月',
                    totalSale:'3356',
                    sellerSale:'1545',
                    totalMoney:'343434',
                    sellerMoney:'45453',
                    cost:'34322' 
                },
                {
                    productSort:'衬衣',
                    productLevel:'1级',
                    time:'2018-1',
                    //month:'1月',
                    totalSale:'3356',
                    sellerSale:'1545',
                    totalMoney:'343434',
                    sellerMoney:'45453',
                    cost:'34322' 
                }
            ],
            list:[
               {
                    time:'2018-1-1',
                    //month:'1月',
                    totalSale:'3356',
                    sellerSale:'1545',
                    totalMoney:'343434',
                    sellerMoney:'45453',
                    cost:'34322'
               },
               {
                    time:'2018-1-2',
                    //month:'2月',
                    totalSale:'3456',
                    sellerSale:'1445',
                    totalMoney:'343434',
                    sellerMoney:'47453',
                    cost:'36322'
               }, 
               {
                    time:'2018-1-3',
                    //month:'2月',
                    totalSale:'3436',
                    sellerSale:'1455',
                    totalMoney:'343734',
                    sellerMoney:'47653',
                    cost:'36322'
               }, 
               {
                    time:'2018-1-4',
                    //month:'2月',
                    totalSale:'3436',
                    sellerSale:'1455',
                    totalMoney:'343734',
                    sellerMoney:'47653',
                    cost:'36322'
               }, 
               {
                    time:'2018-1-5',
                    //month:'2月',
                    totalSale:'3436',
                    sellerSale:'1455',
                    totalMoney:'343734',
                    sellerMoney:'47653',
                    cost:'36322'
               }, 
               {
                    time:'2018-1-6',
                    //month:'2月',
                    totalSale:'3436',
                    sellerSale:'1455',
                    totalMoney:'343734',
                    sellerMoney:'47653',
                    cost:'36322'
               }, 
               {
                    time:'2018-1-7',
                    //month:'2月',
                    totalSale:'3436',
                    sellerSale:'1455',
                    totalMoney:'343734',
                    sellerMoney:'47653',
                    cost:'36322'
               }, 
            ],
            
        }
    },
    
    methods:{
        
        //合计
        // getSummaries(param) {
        //     const { columns, data } = param;
        //     const sums = [];
        //     columns.forEach((column, index) => {
        //         if (index === 0) {
        //             sums[index] = 'Total';
        //             return;
        //         }
        //         const values = data.map(item => Number(item[column.property]));
        //         if (!values.every(value => isNaN(value))) {
        //             sums[index] = values.reduce((prev, curr) => {
        //             const value = Number(curr);
        //             if (!isNaN(value)) {
        //                 return prev + curr;
        //             } else {
        //                 return prev;
        //             }
        //             }, 0);
        //             sums[index] += ' 元';
        //         } else {
        //             sums[index] = 'N/A';
        //         }
        //     });
        //     return sums;
        // },

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
        handleIncomeDetail(){
            this.$router.push({path:'/statistics/income/list_income_product'});
        },
        handleIncomeProductCateDetail(){
            this.$router.push({path:'/statistics/income/list_income_productCate'});
        },
    },
    
}
</script>

<style scoped>
    .home-container{
        padding: 20px;
        background-color: #f2f2f2;
    }

    .table-layout {
        /*margin-top: 20px;*/
        border-left: 1px solid #DCDFE6;
        border-top: 1px solid #DCDFE6;
        margin-bottom:20px; 
    }
    .table-cell {
    height: 40px;
    line-height: 40px;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    /* padding: 10px; */
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }

  .table-cell-title {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    /* background: #F2F6FC; */
    background:#f2f2f2;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }

    .title-font{
        font-size: 18px;
    }
    .S-icon{
        font-size: 25px;
        padding:1px 0px 0px 0px;
    }
    /* .pro-form{
        padding: 20px 0px 5px;
    } */
    
</style>
