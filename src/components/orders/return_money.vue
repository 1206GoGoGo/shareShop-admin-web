<template> 
    <div class="app-container">
        <el-card class="filter-container" shadow="never" style="background:#f2f2f2;">
            <!-- <div>
                <el-button
                    style="float:right"
                    type="primary"
                    @click="handleSearchList()"
                    size="small">
                    查询搜索
                </el-button>
                <el-button
                    style="float:right;margin-right: 15px"
                    @click="handleResetSearch()"
                    size="small">
                    重置
                </el-button>
            </div> -->
            <div>
                <el-form :inline="true" :model="listQuery" size="small" label-width="100px">
                <el-form-item label="订单编号：">
                    <el-input v-model="listQuery.id" class="input-width" style="width:183px" placeholder="All"></el-input>
                </el-form-item>
                <el-form-item label="退货状态：">
                    <el-select v-model="listQuery.status" placeholder="All"  style="width:183px" clearable class="input-width">
                    <el-option v-for="item in statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请时间：">
                    <el-date-picker
                    class="input-width"
                    v-model="listQuery.createTime"
                    value-format="yyyy-MM-dd"
                    type="date"
                    style="width:183px"
                    placeholder="请选择时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="操作人员：">
                    <el-input v-model="listQuery.handleMan" placeholder="All" class="input-width" style="width:183px"></el-input>
                </el-form-item>
                <el-form-item label="退货用户：">
                    <el-input v-model="listQuery.handleMan" class="input-width" style="width:183px" placeholder="All"></el-input>
                </el-form-item>
                <el-form-item label="处理时间：">
                    <el-date-picker
                    class="input-width"
                    v-model="listQuery.handleTime" 
                    value-format="yyyy-MM-dd"
                    type="date"
                    style="width:183px"
                    placeholder="请选择时间">
                    </el-date-picker>
                </el-form-item>
                </el-form>
                <el-button
                    style="float:right;margin-left: 10px; margin-left: 10px"
                    @click="handleResetSearch()"
                    size="small">
                    重置
                </el-button>
                <el-button
                    style="float:right;margin-left: 10px;margin-bottom:10px;"
                    type="primary"
                    @click="handleSearchList()"
                    size="small">
                    查询
                </el-button>
            </div>
        </el-card>
        <div class="table-container">
            <el-table ref="returnApplyTable"
                        highlight-current-row
                        :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                        :data="list"
                        style="width: 100%;"
                        @selection-change="handleSelectionChange"
                        v-loading="listLoading" border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="订单编号" width="180" align="center">
                <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="用户名称" align="center">
                <template slot-scope="scope">{{scope.row.memberUsername}}</template>
                </el-table-column>
                <el-table-column label="申请时间" width="180" align="center">
                <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
                </el-table-column>
                <el-table-column label="退货金额" width="100" align="center">
                <template slot-scope="scope">￥{{scope.row.money | formatReturnAmount}}</template>
                </el-table-column>
                <el-table-column label="申请状态" width="140" align="center">
                <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
                </el-table-column>
                <el-table-column label="操作" width="120" align="center">
                <template slot-scope="scope">
                    <p style="margin-bottom:10px;">
                        <el-button
                        size="mini"
                        @click="handleViewDetail(scope.$index, scope.row)"> Detail </el-button>
                    </p>
                    <p>
                        <el-button
                        size="mini"
                        @click="handleReturn(scope.$index, scope.row)">Handle</el-button>
                    </p>                
                </template><!--需要退货详情页面-->
                </el-table-column>
            </el-table>
        </div>
        <!-- <div class="batch-operate-container">
            <el-select
                size="small"
                v-model="operateType" placeholder="批量操作">
                <el-option
                v-for="item in operateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button
                style="margin-left: 20px"
                class="search-button"
                @click="handleBatchOperate()"
                type="primary"
                size="small">
                确定
            </el-button>
        </div> -->
<!--分页 S-->
        <!-- <div class="pagination-container">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :current-page.sync="listQuery.pageNum"
                :page-size="listQuery.pageSize"
                :page-sizes="[5,10,15]"
                :total="total">
            </el-pagination>
        </div> -->
<!--分页 E-->
    </div>
</template>

<script>
import {fetchList} from '@/api/orders'
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    status:null,
    createTime:null,
    money:null,
    handleMan:null,
    handleTime:null,
  };
export default {
    data(){
        return{
            listQuery: Object.assign({}, defaultListQuery),
            listLoading:false,
            //这个需要接口实现
            statusOptions:[
                {
                    value:0,
                    label:'申请退货',
                },
                {
                    value:1,
                    label:'退货失败',
                },
                {
                    value:2,
                    label:'完成退货',
                }
            ],
            list:[
                {
                    id:12323,
                    memberUsername:'zhahghan',
                    createTime:'2018-8-7',
                    money:1213,
                    status:'已退货',
                    handleTime:'2018-9-9',
                    handleman:'张安',                   
                },
                {
                    id:12323,
                    memberUsername:'zhahghan',
                    createTime:'2018-8-7',
                    money:1213,
                    status:'已退货',
                    handleTime:'2018-9-9',
                    handleman:'张安',
                },
                {
                    id:12323,
                    memberUsername:'zhahghan',
                    createTime:'2018-8-7',
                    money:1213,
                    status:'已退货',
                    handleTime:'2018-9-9',
                    handleman:'张安',
                }
            ],
        }
    },
    methods:{

        //重置
        handleResetSearch(){
            this.listQuery = Object.assign({}, defaultListQuery);
        },

        //获取搜索列表
        getSearchList(){
            this.listLoading=true;
            //this.listQuery即为搜索条件
            fetchList(this.listQuery).then(response => {
                this.listLoading = false;
                this.list = response.data.list;
                this.total = response.data.total;
            });
        },

        //获取搜索结果
        handleSearchList(val){
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;
            this.getSearchList();
        },
        
        //查看详情
        handleViewDetail(){
            this.$router.push({path:'/orders/return_detail'});
        },

        //处理退货
        handleReturn(){
            this.$router.push({path:'/orders/handle_return'});
        },

        handleSelectionChange(){},
        
        handleBatchOperate(){},
    }
}
</script>

<style scoped>
    .pagination-container{
        float:right;
    }
    .batch-operate-container{
        display: inline-block;
    }
</style>
