<template>
    <div class="home-container">
        <div>
            <el-tag>按天统计：{{ createdTimes }}</el-tag>
            <el-table ref="productTable"
                    size="small"
                    highlight-current-row
                    :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                    :data="daylist"
                    style="width: 100%; margin-bottom:20px;"
                    
                    v-loading="listLoading"
                    fixed
                    
                    border>
                <el-table-column label="No." width="70" type="index" align="center">
                    <!-- <template slot-scope="scope">{{scope.row.managerInfoId}}</template> -->
                </el-table-column>
                <el-table-column label="时间" sortable  width="120" prop="dayTime" align="center">
                    
                </el-table-column>
                <el-table-column label="总销售额" prop="dayTotalMoney" sortable  align="center">
                    
                </el-table-column> 
                <el-table-column label="seller销售额" prop="daySellerMoney" sortable  align="center">
                   
                </el-table-column> 
                <el-table-column label="商品成本" prop="dayCost" sortable width="160" align="center">
                   
                </el-table-column>
                <el-table-column label="操作" width="100" align="center">
                    <template slot-scope="scope">       
                        <el-button
                            type="text"
                            size="mini"
                            @click="handleIncomeDayDetail(scope.$index, scope.row)">详情
                        </el-button>                 
                    </template>
                </el-table-column> 
            </el-table>
        </div>
        <div>
            <el-tag>按年统计：{{ createdTimes }}</el-tag>
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
                <el-table-column label="年份" sortable  width="120" prop="year" align="center">
                    
                </el-table-column>
                <el-table-column label="总销售额" prop="totalMoney" sortable  align="center">
                    
                </el-table-column> 
                <el-table-column label="seller销售额" prop="sellerMoney" sortable  align="center">
                   
                </el-table-column> 
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
<!--列表 E--> 
        
<!--列表 E--> 
    </div>
</template>

<script>
//统计用户的销售额、成本、支出（税率）
// import Mechart from './components/Mechart'
import {fetchListLevel,fetchListChildrenLevel} from '@/api/productCate'
import {fetchListBycategoryId,statisticSales} from '@/api/statistics'

// import moment from 'moment'
export default{

    created() {
        //this.getList();
        this.getProductCateList();
    },

    data(){
        return{
            productCateOptions:[],
            CateId:null,
            time:null,
            listLoading:false,
            currentPage:null,
            count:null,
            handleSizeChange:null,
            list:[
               {
                   year:'2019年',
                   totalSale:'3456',
                   sellerSale:'1545',
                   totalMoney:'343434',
                   sellerMoney:'45453',
                   cost:'34322'
               },
               {
                   year:'2018年',
                   totalSale:'3456',
                   sellerSale:'1545',
                   totalMoney:'343434',
                   sellerMoney:'45453',
                   cost:'34322'
               }, 
               {
                   year:'2017年',
                   totalSale:'3456',
                   sellerSale:'1545',
                   totalMoney:'343434',
                   sellerMoney:'45453',
                   cost:'34332'
               }, 
            ],
            daylist:[
                {
                    dayTime:'2019-5-9',
                    dayTotalSale:'3469',
                    daySellerSale:'1575',
                    dayTotalMoney:'33434',
                    daySellerMoney:'4453',
                    dayCost:'3432'
                }
            ],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            }
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
        //
        handleIncomeDetail(){
            this.$router.push({path:'/statistics/income/list_incomeByMonth'});
        },
        handleIncomeDayDetail(){
            this.$router.push({path:'/statistics/income/list_income_product'});
        },
        handleSearchList(){},
    },
    
}
</script>

<style scoped>
    .home-container{
        padding-bottom: 20px;
        /* background-color: #f2f2f2; */
    }
    .title-font{
        font-size: 18px;
    }
    .S-icon{
        font-size: 25px;
        padding:1px 0px 0px 0px;
    }
    .bottom-form{
        margin-top:20px;
    }
    
</style>
