<template>
    <div class="app-container">
        <el-card shadow="never" style="background:#f2f2f2;">
            <svg-icon icon-class="Smoney" class="S-icon"></svg-icon>
            <span class="title-font">商品统计</span>
            <div class="pro-form">
                <el-form :inline="true" :model="listQuery" style="margin-top:10px; margin-bottom:0px;"  size="small" label-width="100px" ref="productCateFrom">
                    <el-form-item label="商品分类：" style="margin-bottom:0px;">
                        <el-cascader
                            style="width:203px;"
                            placeholder="please selete"
                            expand-trigger="click"
                            clearable
                            v-model="listQuery.id"
                            :options="productCateOptions"
                            change-on-select>
                        </el-cascader>
                        <el-button 
                            type="primary" 
                            style="margin-left:10px;" 
                            @click="handleSearchList"
                            size="small">
                            查询
                        </el-button>
                    </el-form-item>
                </el-form> 
            </div>
        </el-card>
<!--列表 S-->
        <div class="table-container">
            <el-table ref="productTable"
                    highlight-current-row
                    
                    :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                    :data="list"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"  
                    v-loading="listLoading"
                    fixed
                    show-summary
                    :summary-method="getSummaries"
                    border>     
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="No." width="60" type="index" align="center">
                    <!-- <template slot-scope="scope">{{scope.row.managerInfoId}}</template> -->
                </el-table-column>
                <el-table-column label="商品名称"  align="center">
                    <template slot-scope="scope">{{scope.row.userLogin.productName}}</template>
                </el-table-column>
                <el-table-column label="销量" sortable  width="160"  align="center">
                    <template slot-scope="scope">{{scope.row.userLogin.Quantity }}</template>
                </el-table-column>
                <el-table-column label="销售额" sortable width="180" align="center">
                    <template slot-scope="scope">{{scope.row.money}}</template>
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
</template>
    
<script>
import {fetchListLevel,fetchListChildrenLevel} from '@/api/productCate'
import {fetchProductList,} from '@/api/statistics'
const defaultListQuery = {
    pageindex: 0,
    pagesize: 20,
    id:null
};
export default {
    created() {
        this.getList();
        this.getProductCateList();
    },

    data(){
        return{
            listQuery: Object.assign({}, defaultListQuery),
            productCateOptions:[],
            list:null,
            listLoading:false,
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

        //初始化数据
        getList(){
            //this.listLoading=true;
            fetchProductList(this.listQuery).then(response => {
                this.listLoading = false;
                this.list = response.data;
            });
        },

        //
        handleSearchList(){
            //this.listLoading=true;
            fetchProductList(this.listQuery.id).then(response => {
                this.listLoading = false;
                this.list = response.data;
            });
        },

        //求和
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                        return prev + curr;
                    } else {
                        return prev;
                    }
                    }, 0);
                    sums[index] += ' 元';
                } else {
                    sums[index] = '';
                }
            });
            return sums;
        },

    },
}
</script>

<style scoped>

/* .home-container{
    padding: 20px;
    background-color: #f2f2f2;
} */
</style>
    