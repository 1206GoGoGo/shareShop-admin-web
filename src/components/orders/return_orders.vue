<template> 
    <div class="app-container">
        <el-card class="filter-container" shadow="never">
            <div>
                <i class="el-icon-search"></i>
                <span>筛选搜索</span>
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
            </div>
            <div style="margin-top: 15px">
                <!-- :model="listQuery" -->
                <el-form :inline="true"       size="small" label-width="140px">
                <el-form-item label="输入搜索：">
                    <!-- v-model="listQuery.id" -->
                    <el-input        class="input-width" style="width:203px" placeholder="服务单号"></el-input>
                </el-form-item>
                <el-form-item label="处理状态：">
                    <!-- v-model="listQuery.status" -->
                    <el-select       placeholder="全部"  style="width:203px" clearable class="input-width">
                    <el-option v-for="item in statusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                    </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请时间：">
                    <!-- v-model="listQuery.createTime" -->
                    <el-date-picker
                    class="input-width"
                    
                    value-format="yyyy-MM-dd"
                    type="date"
                    style="width:203px"
                    placeholder="请选择时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="操作人员：">
                    <!-- v-model="listQuery.handleMan" -->
                    <el-input       class="input-width" style="width:203px" placeholder="全部"></el-input>
                </el-form-item>
                <el-form-item label="处理时间：">
                    <!-- v-model="listQuery.handleTime" -->
                    <el-date-picker
                    class="input-width"
                    
                    value-format="yyyy-MM-dd"
                    type="date"
                    style="width:203px"
                    placeholder="请选择时间">
                    </el-date-picker>
                </el-form-item>
                </el-form>
            </div>
        </el-card>
        <div class="table-container">
            <el-table ref="returnApplyTable"
                        :data="list"
                        style="width: 100%;"
                        @selection-change="handleSelectionChange"
                        v-loading="listLoading" border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="服务单号" width="180" align="center">
                <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="用户账号" align="center">
                <template slot-scope="scope">{{scope.row.memberUsername}}</template>
                </el-table-column>
                <el-table-column label="申请时间" width="180" align="center">
                <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
                </el-table-column>
                <el-table-column label="退款金额" width="180" align="center">
                <template slot-scope="scope">￥{{scope.row | formatReturnAmount}}</template>
                </el-table-column>
                <el-table-column label="申请状态" width="180" align="center">
                <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
                </el-table-column>
                <el-table-column label="处理人员" width="180" align="center">
                <template slot-scope="scope">{{scope.row.handleTime | formatTime}}</template>
                </el-table-column>
                <el-table-column label="处理时间" width="180" align="center">
                    <template slot-scope="scope">{{scope.row.handleTime | formatTime}}</template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleViewDetail(scope.$index, scope.row)">查看详情</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="batch-operate-container">
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
        </div>
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
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        handleSearchList(){},
        handleResetSearch(){},
        handleSelectionChange(){},
        handleViewDetail(){},
        handleBatchOperate(){},
    }
}
</script>

<style scoped>

</style>
