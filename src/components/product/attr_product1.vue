<template>
    <div class="app-container">
        <el-card shadow="never" style="background:#f2f2f2;">
            <div>
                <i class="el-icon-circle-plus-outline"></i>
                <span>商品属性</span>
                <el-button
                    style="float: right"
                    @click="handleSaveList('productCateFrom')"
                    type="primary"
                    size="small">
                    Add
                </el-button>
                <el-button
                    style="float: right;margin-right: 15px"
                    @click="handleResetSearch()"
                    size="small">
                    Reset
                </el-button>
            </div>
            <div style="margin-top: 10px">
                <el-form :inline="true"  size="small" label-width="140px" :model="productCate" :rules="rules" ref="productCateFrom">
                    <el-form-item label="商品分类：">
                        <el-cascader
                            placeholder="please selete"
                            expand-trigger="click"
                            clearable
                            v-model="CateId"
                            :options="productCateOptions"
                            change-on-select>
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="属性名称：">
                        <el-input style="width: 203px" v-model="productCate.categoryName" placeholder="属性名称"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="是否显示：">
                        <el-radio-group  v-model="productCate.navStatus">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item> -->
                </el-form> 
            </div>
        </el-card>
        <!-- v-loading="listLoading" -->
        <div class="table-container">
            <el-table ref="productTable"
                        highlight-current-row
                        :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                        :data="list"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        
                        border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="编号" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.categoryId}}</template>
                </el-table-column>
                <el-table-column label="商品名称" width="250" align="center">
                    <template slot-scope="scope">{{scope.row.categoryName}}</template>
                </el-table-column>
                <el-table-column label="属性名称" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.categoryLevel}}</template>
                </el-table-column>
                <el-table-column label="创建时间" width="180" align="center">
                    <template slot-scope="scope">{{scope.row.showStatus | dateFormatter}}</template>
                </el-table-column>
                <el-table-column label="修改时间" width="180" align="center">
                    <template slot-scope="scope">{{scope.row.showStatus | dateFormatter}}</template>
                </el-table-column>
                <!-- <el-table-column label="导航栏" width="100" align="center">
                    <template slot-scope="scope">
                        <el-switch
                        @change="handleNavStatusChange(scope.$index, scope.row)"
                        :active-value="1"
                        :inactive-value="0"
                        v-model="scope.row.navStatus">
                        </el-switch>
                    </template>
                </el-table-column> -->
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleUpdate(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
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
import {fetchList,createProductCate,getProductCate} from '@/api/productCate';
import {fetchListLevel,fetchListChildrenLevel} from '@/api/productCate'
import {fetchListBycategoryId} from '@/api/statistics'
import {formatDate} from '@/utils/date';
const defaultProductCate = {
    categoryName:'',
    navStatus: null,
    categoryId: null,
    
    showStatus: null,

    productAttributeIdList: [],
  };
export default {
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data(){
        return{
            productCateOptions:[],
            CateId:null,

            productCate: Object.assign({}, defaultProductCate),
            selectProductCateList: [],
            rules: {
            categoryName: [
                {required: true, message: '请输入分类名称', trigger: 'blur'},
                {min: 2, max: 14, message: '长度在 2 到 14 个字符', trigger: 'blur'}
            ]
            },
            list: [
                {
                    categoryId:'0001',
                    categoryName:'外套',
                    categoryLevel:'颜色',
                    showStatus:'2018-8-8'
                },{
                    categoryId:'0001',
                    categoryName:'外套',
                    categoryLevel:'颜色',
                    showStatus:'2018-8-8'
                },{
                    categoryId:'0001',
                    categoryName:'外套',
                    categoryLevel:'颜色',
                    showStatus:'2018-8-8'
                },
            ],
            //listLoading: true,
            offset: 0,
            limit: 20,
            count: 0,
            currentPage: 1,
        }
    },

    created() {
        if (this.isEdit) {
            getProductCate(this.categoryId).then(response => {
                this.productCate = response.data;
            });
        } else {
            this.productCate = Object.assign({}, defaultProductCate);
        }
        //this.getSelectProductCateList();
        // this.getProductAttrCateList();
        this.getProductCateList();

        ///this.resetcategoryId();
        this.getList();
    },
    watch: {
        $route(route) {
            this.resetcategoryId();
            this.getList();
        },
        CateId (newValue) {
            if (newValue != null && newValue.length == 2) {
                this.CateId = newValue[1];
            } else {
                this.CateId = 0;
            }
        },
    },
    filters:{
        dateFormatter(time){
            let date=new Date(time)
            return formatDate(date, 'MM.dd.yyyy hh:mm:ss')
        },
    },

    methods:{
        //重置
        handleResetSearch(){
            this.productCate = Object.assign({}, defaultProductCate);
        },

        //初始化 显示列表内容
        getList() {
            this.listLoading = true;
            fetchList(this.categoryId, this.productCate).then(response => {
                this.listLoading = false;
                this.list = response.data.list;
                this.total = response.data.total;
            });
        },

        //显示商品分类
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

        //显示商品分类
        resetcategoryId(){
            if (this.$route.query.categoryId != null) {
            this.categoryId = this.$route.query.categoryId;
            } else {
            this.categoryId = 0;
            }
        },
        // getProductAttributeIdList() {
        //     //获取选中的筛选商品属性
        //     let productAttributeIdList = [];
        //     for (let i = 0; i < this.filterProductAttrList.length; i++) {
        //     let item = this.filterProductAttrList[i];
        //     if (item.value !== null && item.value.length === 2) {
        //         productAttributeIdList.push(item.value[1]);
        //     }
        //     }
        //     return productAttributeIdList;
        // },

        //查看下级
        handleShowNextLevel(index, row) {
            this.$router.push({path: '/product/product_cate/add_cate', categoryId: row.id})
        },

        //编辑
        handleUpdate(index, row) {
            getProductCate(this.categoryId).then(response => {
                this.productCate = response.data;
            });
            // this.$router.push({path:'/product/product_cate/add_cate',id:row.id});
            // this.$router.push({path: '/product/product_cate/add_cate', query: {categoryId: row.id}})
        },

        //删除该分类
        handleDelete(index, row) {
            this.$confirm('是否要删除该分类', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            deleteProductCate(row.categoryId).then(response => {
                this.$message({
                message: '删除成功',
                type: 'success',
                duration: 1000
                });
                this.getList();
            });
            });
        },

        
        handleSizeChange(val){
                console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1)*this.limit;
            //this.getUsers()
        },
        //添加分类
        handleSaveList(){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$confirm('是否提交数据', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                this.productCate.productAttributeIdList = this.getProductAttributeIdList();
                createProductCate(this.productCate).then(response => {
                    this.$refs[formName].resetFields(); 
                    this.resetForm(formName);
                    this.$message({
                        message: '提交成功',
                        type: 'success',
                        duration: 1000
                        });
                    });
                });
            } 
            else {
                this.$message({
                message: '验证失败',
                type: 'error',
                duration: 1000
                });
                return false;
            }
        });  
        },
    
    }
}
</script>

<style scoped>
</style>
