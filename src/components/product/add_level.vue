<template>
    <div class="app-container">
        <el-card shadow="never">
            <div>
                <el-form :inline="true"  size="small" label-width="140px">
                    <!-- <el-form-item label="新增商品级别：">
                        <el-select v-model="listQuery.recommendStatus" placeholder="全部" clearable class="input-width">
                        <el-option v-for="item in recommendOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="新增商品级别：">
                        <el-input style="width: 203px"  placeholder="商品级别"></el-input>
                    </el-form-item>
                    <el-button
                    style="float:right; margin-right:20px"
                    
                    type="primary"
                    size="small">
                    保存
                    </el-button>
                </el-form> 
            </div>
        </el-card>
        <!-- v-loading="listLoading" -->
        <div class="table-container">
            <el-table ref="productTable"
                        highlight-current-row
                        :data="list"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        
                        border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="编号" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="商品级别" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <p>
                        <el-button
                            size="mini"
                            @click="handleShowUser(scope.$index, scope.row)">查看
                        </el-button>
                        <el-button
                            size="mini"
                            @click="handleUpdateUser(scope.$index, scope.row)">编辑
                        </el-button>
                        </p>
                        <p>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                        </p>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            list: null,
            //listLoading: true,
            offset: 0,
            limit: 20,
            count: 0,
            currentPage: 1,
        }
    },
    methods:{
        handleSizeChange(val){
                console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1)*this.limit;
            //this.getUsers()
        },
        handleSelectionChange(){},
        handleShowUser(){},
        handleUpdateUser(){},
        handleDelete(){}
    }
}
</script>

<style scoped>
</style>


