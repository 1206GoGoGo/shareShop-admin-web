<!--退货信息：商品信息、退货信息、操作信息-->
<template>
    <div>
        <div class="table-container">
            <el-table ref="returnApplyTable"
                        highlight-current-row
                        :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                        :data="list"
                        style="width: 100%;"
                        @selection-change="handleSelectionChange"
                        v-loading="listLoading" border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="退货状态" width="180" align="center">
                    <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
                </el-table-column>
                <el-table-column label="商品名称" width="180" align="center">
                <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
                </el-table-column>
                <el-table-column label="价格/货号" width="100" align="center">
                <template slot-scope="scope">￥{{scope.row.money | formatReturnAmount}}</template>
                </el-table-column>
                <el-table-column label="属性" width="140" align="center">
                    <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
                </el-table-column>
                <el-table-column label="数量" width="140" align="center">
                    <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
                </el-table-column>
                <el-table-column label="总计" width="100" align="center">
                    <template slot-scope="scope">￥{{scope.row.money | formatReturnAmount}}</template>
                </el-table-column>
                <el-table-column label="操作" width="120" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini"
                        @click="handleViewDetail(scope.$index, scope.row)">处理退货</el-button>
                    </template>     
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:null,
            listLoading:false,
        }
    },
    methods:{
        handleSelectionChange(){},
        handleViewDetail(){},
    },
}
</script>
<style scoped>

</style>

