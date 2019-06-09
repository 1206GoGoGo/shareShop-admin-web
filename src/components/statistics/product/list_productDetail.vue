<template>
<!--列表 S--> 
    <div>
        <div class="table-layout">
            <el-row>
                <el-col :span="3" class="table-cell-title">时间</el-col>
                <el-col :span="3" class="table-cell-title">总销售额</el-col>
                <el-col :span="3" class="table-cell-title">seller销售额</el-col>
                <el-col :span="3" class="table-cell-title">商品成本</el-col>
                <el-col :span="3" class="table-cell-title">退款金额</el-col>
                <el-col :span="3" class="table-cell-title">seller佣金</el-col>
                <el-col :span="3" class="table-cell-title">税费</el-col>
                <el-col :span="3" class="table-cell-title">运费</el-col>
            </el-row>
            <el-row>
                <el-col :span="3" class="table-cell">{{income.name}}</el-col>
                <el-col :span="3" class="table-cell">{{income.type}}</el-col>
                <el-col :span="3" class="table-cell">{{income.useType}}</el-col>
                <el-col :span="3" class="table-cell">{{income.useCondition}}</el-col>
                <el-col :span="3" class="table-cell">{{income.faceValue}}</el-col>
                <el-col :span="3" class="table-cell">{{income.endTime}}</el-col>
                <el-col :span="3" class="table-cell">{{income.faceValue}}</el-col>
                <el-col :span="3" class="table-cell">{{income.endTime}}</el-col>
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
                <el-table-column label="总销售额" prop="totalMoney" sortable  align="center">
                    <!-- <template slot-scope="scope">${{scope.row.totalMoney}}</template> -->
                </el-table-column> 
                <el-table-column label="seller销售额" prop="sellerMoney" sortable  align="center">
                    <!-- <template slot-scope="scope">${{scope.row.sellerMoney}}</template> -->
                </el-table-column> 
                <el-table-column label="商品成本" prop="cost" sortable width="160" align="center">
                    <!-- <template slot-scope="scope">${{scope.row.cost}}</template> -->
                </el-table-column>
                <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">       
                    <el-button
                        type="text"
                        size="mini"
                        @click="ProductCateDetail(scope.$index, scope.row)">详情
                    </el-button>                 
                </template>
            </el-table-column> 
            </el-table>
        </div>
        <div>
            <el-tag>单品排行：{{ createdTimes }}</el-tag>
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
                <el-table-column label="商品名称" width="120" prop="productSort" align="center">
                </el-table-column>
                <el-table-column label="总销量" prop="totalMoney" sortable  align="center">
                    <!-- <template slot-scope="scope">${{scope.row.totalMoney}}</template> -->
                </el-table-column> 
                 <el-table-column label="seller销量" prop="totalMoney" sortable  align="center">
                    <!-- <template slot-scope="scope">${{scope.row.totalMoney}}</template> -->
                </el-table-column> 
                <el-table-column label="总销售额" prop="totalMoney" sortable  align="center">
                    <!-- <template slot-scope="scope">${{scope.row.totalMoney}}</template> -->
                </el-table-column> 
                <el-table-column label="seller销售额" prop="sellerMoney" sortable  align="center">
                    <!-- <template slot-scope="scope">${{scope.row.sellerMoney}}</template> -->
                </el-table-column> 
                <el-table-column label="商品成本" prop="cost" sortable width="160" align="center">
                    <!-- <template slot-scope="scope">${{scope.row.cost}}</template> -->
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
        <!-- <el-table ref="productTable"
                size="small"
                highlight-current-row
                :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                :data="list"
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
        </el-table> -->
    </div>
<!--列表 E--> 
</template>
<script>
export default {
    data(){
        return{
            income:{},
            
            list:[
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
        }
    },
    methods:{

        ProductCateDetail(){
            this.$router.push({path:'/statistics/product/list_productCateDetail1'});
        },
    }
}
</script>
<style scoped>
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
</style>

