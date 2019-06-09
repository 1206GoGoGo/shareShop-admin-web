<template>
    <div>
        <div class="table-layout">
            <el-row><!--商品分类2级分类下的所有商品-->
                <el-col :span="8" class="table-cell-title">上级类别</el-col>
                <el-col :span="4" class="table-cell-title">总销售额</el-col>
                <el-col :span="4" class="table-cell-title">seller销售额</el-col>
                <el-col :span="4" class="table-cell-title">总销量</el-col>
                <el-col :span="4" class="table-cell-title">seller销量</el-col>
            </el-row>
            <el-row>
                <el-col :span="8" class="table-cell">{{income.name}}</el-col>
                <el-col :span="4" class="table-cell">{{income.type}}</el-col>
                <el-col :span="4" class="table-cell">{{income.useType}}</el-col>
                <el-col :span="4" class="table-cell">{{income.useCondition}}</el-col>
                <el-col :span="4" class="table-cell">{{income.faceValue}}</el-col>
            </el-row>
            <el-row>
                <el-col :span="4" class="table-cell-title">时间</el-col>
                <el-col :span="4" class="table-cell-title">商品成本</el-col>
                <el-col :span="4" class="table-cell-title">退款金额</el-col>
                <el-col :span="4" class="table-cell-title">seller佣金</el-col>
                <el-col :span="4" class="table-cell-title">税费</el-col>
                <el-col :span="4" class="table-cell-title">运费</el-col>
            </el-row>
            <el-row>
                <el-col :span="4" class="table-cell">{{income.name}}</el-col>
                <el-col :span="4" class="table-cell">{{income.type}}</el-col>
                <el-col :span="4" class="table-cell">{{income.useType}}</el-col>
                <el-col :span="4" class="table-cell">{{income.useCondition}}</el-col>
                <el-col :span="4" class="table-cell">{{income.faceValue}}</el-col>
                <el-col :span="4" class="table-cell">{{income.endTime}}</el-col>
            </el-row>
        </div>
        <el-tag>分类销售额：{{ createdTimes }}</el-tag>
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
            <el-table-column label="商品名称" prop="productSort" align="center">
            </el-table-column>
            <!-- <el-table-column label="级别" width="120" prop="productLevel" align="center">
            </el-table-column> -->
            <el-table-column label="总销售额" width="140" prop="totalMoney" sortable  align="center">
                <!-- <template slot-scope="scope">${{scope.row.totalMoney}}</template> -->
            </el-table-column> 
            <el-table-column label="seller销售额" width="140" prop="sellerMoney" sortable  align="center">
                <!-- <template slot-scope="scope">${{scope.row.sellerMoney}}</template> -->
            </el-table-column> 
            <el-table-column label="商品成本" width="140" prop="cost" sortable align="center">
                <!-- <template slot-scope="scope">${{scope.row.cost}}</template> -->
            </el-table-column>
            <!-- <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">       
                    <el-button
                        type="text"
                        size="mini"
                        @click="handleIncomeDetail(scope.$index, scope.row)">详情
                    </el-button>                 
                </template>
            </el-table-column>  -->
        </el-table>
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
            income:{},
            productCateList:[
                {
                    productSort:'帽子',
                    //productLevel:'2级',
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
                    //productLevel:'2级',
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
                    //productLevel:'2级',
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
                    //productLevel:'2级',
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
                    time:'2018-1',
                    //month:'1月',
                    totalSale:'3356',
                    sellerSale:'1545',
                    totalMoney:'343434',
                    sellerMoney:'45453',
                    cost:'34322'
               },
               {
                    time:'2018-2',
                    //month:'2月',
                    totalSale:'3456',
                    sellerSale:'1445',
                    totalMoney:'343434',
                    sellerMoney:'47453',
                    cost:'36322'
               }, 
               {
                    time:'2018-3',
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
            this.$router.push({path:'/statistics/income/list_incomeByDay'});
        },
        
    },
    
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
