<template>
    <div >
        <div>
            <div class="pro-form">
                <el-form :inline="true" size="small" ref="productCateFrom">
                    <el-form-item label="条件统计：">
                        <el-select v-model="publishStatus" style="width:133px" placeholder="全部" clearable>
                            <el-option
                                v-for="item in statisticsOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="年份：">
                        <el-select v-model="year" style="width:133px" placeholder="全部" clearable>
                            <el-option
                                v-for="item in yearOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="月份：">
                        <el-select v-model="month" style="width:133px" placeholder="全部" clearable>
                            <el-option
                                v-for="item in monthOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="周:">
                        <el-select v-model="week" style="width:133px" placeholder="全部" clearable>
                            <el-option
                                v-for="item in weekOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    
                    <el-button type="primary" style="margin-left:10px;" size="small" @click="handleSearchList">查询</el-button>
                    <el-button type="primary" style="margin-left:10px;" size="small" @click="handleSearchList">导出</el-button>
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
                </el-form> 
            </div>

            <!--列表 class="table-container" S  @selection-change="handleSelectionChange"  -->
        <div>
            <el-table ref="productTable"
                    size="medium"
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
                <el-table-column label="No." width="80" type="index" align="center">
                    <!-- <template slot-scope="scope">{{scope.row.managerInfoId}}</template> -->
                </el-table-column>
                <!-- <el-table-column label="商品名称"  align="center">
                    <template slot-scope="scope">{{scope.row.userLogin.productName}}</template>
                </el-table-column> -->
                <el-table-column label="时间" sortable  width="120"  align="center">
                    <template slot-scope="scope">{{scope.row.time }}</template>
                </el-table-column>
                <el-table-column label="总销售额" sortable  align="center">
                    <template slot-scope="scope">{{scope.row.money}}</template>
                </el-table-column> 
                <el-table-column label="seller销售额" sortable  align="center">
                    <template slot-scope="scope">{{scope.row.money}}</template>
                </el-table-column> 
                <el-table-column label="商品成本" sortable width="160" align="center">
                    <template slot-scope="scope">{{scope.row.number}}</template>
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
        </div>
<!--列表 E--> 

        </div>
    </div>
</template>

<script>
//统计用户的销售额、成本、支出（税率）
import Mechart from './components/Mechart'
import {fetchListLevel,fetchListChildrenLevel} from '@/api/productCate'
import {fetchListBycategoryId,statisticSales} from '@/api/statistics'

import moment from 'moment'
export default{

    created() {
        //this.getList();
        this.getProductCateList();

        let date = new Date();
        let nowYear = date.getFullYear();
        // let nowMonth = date.getMonth();
        // let nowWeek = date.getDay();
        for(let i=nowYear; i>=2018; i--)
        {
            this.yearOptions.push({label:i, value:i});
        }
        for(let i=1;i<=12;i++)
        {
            this.monthOptions.push({label:i,value:i});
        }
        for(let i=1;i<=4;i++)
        {
            this.weekOptions.push({label:i,value:i});
        }
    },

    data(){
        return{
            productCateOptions:[],
            yearOptions:[],
            monthOptions:[],
            weekOptions:[],
            year:null,
            month:null,
            week:null,
            CateId:null,
            publishStatus:null,
            statisticsOptions:[
                {
                    label:'按天统计',
                    value:0,
                },
                {
                    label:'按周统计',
                    value:1,
                },
                {
                    label:'按月统计',
                    value:2,
                },
                {
                    label:'按年统计',
                    value:3,
                },
            ],
            
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
    },
}
</script>

<style scoped>
    .home-container{
        padding: 20px;
        background-color: #f2f2f2;
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
