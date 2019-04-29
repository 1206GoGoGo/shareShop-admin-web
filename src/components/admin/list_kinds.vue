<template>
    <div class="app-container">
        <!-- <el-card shadow="never">
            <div>
                <i class="el-icon-circle-plus-outline"></i>
                <span>管理员分类</span>
                <el-button
                    style="float: right"
                    @click="handleSave()"
                    type="primary"
                    size="small">
                    保存
                </el-button>
            </div>
            <div style="margin-top: 10px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="管理员名称：">
                        <el-input style="width: 203px" v-model="listQuery.name" placeholder="例如：订单管理员"></el-input>
                    </el-form-item>
                    <el-form-item label="管理员级别：">
                        <el-input style="width: 203px" v-model="listQuery.level" placeholder="例如：订单管理员"></el-input>
                    </el-form-item>
                    <el-form-item label="功能描述：">
                        <el-input type="textarea" style="width: 303px" v-model="listQuery.describe" placeholder="请描述管理员的功能"></el-input>
                    </el-form-item>
                </el-form> 
            </div>
        </el-card> -->
        <!-- v-loading="listLoading" -->
        <!-- <div class="table-container"> -->
            <el-table ref="productTable"
                        highlight-current-row
                        :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                        :data="list"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        v-loading="listLoading"
                        border>
                <!-- <el-table-column type="selection" width="60" align="center"></el-table-column> -->
                <el-table-column label="编号" width="60" align="center">
                    <template slot-scope="scope">{{scope.row.categoryId}}</template>
                </el-table-column>
                <el-table-column label="名称" width="150" align="center">
                    <template slot-scope="scope">{{scope.row.name}}</template>
                </el-table-column>
                <el-table-column label="级别" width="150" align="center">
                    <template slot-scope="scope">{{scope.row.level | levelFormatter }}</template>
                </el-table-column>
                <el-table-column label="描述" align="center">
                    <template slot-scope="scope">
                        <el-input v-show="scope.row.edit" size="small" v-model="scope.row.description"></el-input>
                        <span v-show="!scope.row.edit">{{scope.row.description}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="编辑" width="140" align="center">
                    <template slot-scope="scope">
                        <el-button v-show="!scope.row.edit" size="mini" type="primary" @click='scope.row.edit=true' icon="el-icon-edit">编辑</el-button>
                        <el-button v-show="scope.row.edit" size="mini" type="success" @click="scope.row.edit=false" icon="el-icon-success">完成</el-button>

                        <!-- <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>   -->
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
        <!-- </div> -->
    </div>
</template>

<script>
import { getAdminCateInfo,AddManagerCate } from '@/api/admin';
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    
    name:null,
    level:null,
    describe:null
  };
export default {
    watch:{

    },
    data(){
        return{
            listQuery: Object.assign({}, defaultListQuery),
            list: null,
            //listLoading: true,
            offset: 0,
            limit: 20,
            count: 0,
            currentPage: 1,
        }
    },

    //过滤器
    filters: {

        //日期转变
        dateFormatter(time) {
            let date = new Date(time);
            return formatDate(date, 'MM.dd.yyyy hh:mm:ss')
        },
        //级别转换
        levelFormatter(value){
            if(value === 20){return 'Super Amin'} 
            else if(value === 11){return 'Gneral Amin'}
            else { return 'Not clear' }
        },

    },
    created(){
        this.getAdminCate();
    },
    methods:{
        handleSave(){
            AddManagerCate(this.listQuery).then(response=>{
                this.$message({
                  message: '添加成功！',
                  type: 'success',
                  duration:1000
                });
            });
            this.getAdminCate();
        },
        handleSizeChange(val){
            console.log(`每页 ${val} 条`)
            this.getAdminCate()
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1)*this.limit;
            this.getAdminCate()
        },
        //获取信息
        getAdminCate(){
            getAdminCateInfo().then(response=>{
                this.list=response.data;
            })
        },

        handleSelectionChange(){},
        // handleShowUser(){},
        // handleUpdateUser(){},
        // handleDelete(){}
    }
}
</script>

<style scoped>
.el-table{
    margin-top:0px !important; 
}
</style>


