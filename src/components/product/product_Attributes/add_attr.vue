<template>
    <div class="app-container">
        <el-card shadow="never" style="background:#f2f2f2;">
            <!-- <div>
                el-icon-circle-plus-outline
                <i class="el-icon-search"></i>
                <span>Conditional Search</span>
                <el-button
                    style="float: right"
                    @click="handleSearchList('productCateFrom')"
                    type="primary"
                    size="small">
                    Search
                </el-button>
                <el-button
                    style="float: right;margin-right: 15px"
                    @click="handleResetSearch()"
                    size="small">
                    Reset
                </el-button>
            </div> v-model="productCate.username" -->
            <div style="margin-top: 10px">
                <el-form :inline="true"  size="small" label-width="140px" :model="productCate" :rules="rules" ref="productCateFrom">
                    <el-form-item label="商品分类：">
                        <el-cascader
                            placeholder="please selete"
                            expand-trigger="click"
                            clearable
                            style="width: 203px"
                            v-model="productCateValue"
                            :options="productCateOptions"
                            change-on-select>
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="商品属性：">
                        <el-input style="width: 203px"  placeholder="Login Name for Seller" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="属性值：">
                        <el-input style="width: 203px"  placeholder="Login Name for Seller" clearable></el-input>
                    </el-form-item>

                    <!--商品属性-->
                    <!-- <el-form-item label="商品规格：">
                        <el-card shadow="never" class="cardBg">
                        <div v-for="(productAttr,idx) in selectProductAttr" :key="idx">
                            {{productAttr.name}}：
                            <el-checkbox-group v-if="productAttr.handAddStatus===0" v-model="selectProductAttr[idx].values">
                            <el-checkbox v-for="item in getInputListArr(productAttr.inputList)" :label="item" :key="item"
                                class="littleMarginLeft"></el-checkbox>
                            </el-checkbox-group>
                            <div v-else>
                            <el-checkbox-group v-model="selectProductAttr[idx].values">
                                <div v-for="(item,index) in selectProductAttr[idx].options" :key="item" style="display: inline-block"
                                    class="littleMarginLeft">
                                <el-checkbox :label="item" :key="item"></el-checkbox>
                                <el-button type="text" class="littleMarginLeft" @click="handleRemoveProductAttrValue(idx,index)">删除
                                </el-button>
                                </div>
                            </el-checkbox-group>
                            <el-input v-model="addProductAttrValue" style="width: 160px;margin-left: 10px" clearable></el-input>
                            <el-button class="littleMarginLeft" @click="handleAddProductAttrValue(idx)">增加</el-button>
                            </div>
                        </div>
                        </el-card>
                        <el-table style="width: 100%;margin-top: 20px"
                            :data="value.skuStockList"
                            border>
                        <el-table-column
                            v-for="(item,index) in selectProductAttr"
                            :label="item.name"
                            :key="item.id"
                            align="center">
                            <template slot-scope="scope">
                            {{getProductSkuSp(scope.row,index)}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="销售价格"
                            width="80"
                            align="center">
                            <template slot-scope="scope">
                            <el-input v-model="scope.row.price"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="商品库存"
                            width="80"
                            align="center">
                            <template slot-scope="scope">
                            <el-input v-model="scope.row.stock"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="库存预警值"
                            width="80"
                            align="center">
                            <template slot-scope="scope">
                            <el-input v-model="scope.row.lowStock"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="SKU编号"
                            align="center">
                            <template slot-scope="scope">
                            <el-input v-model="scope.row.skuCode"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="80"
                            align="center">
                            <template slot-scope="scope">
                            <el-button
                                type="text"
                                @click="handleRemoveProductSku(scope.$index, scope.row)">删除
                            </el-button>
                            </template>
                        </el-table-column>
                        </el-table>
                        <el-button
                        type="primary"
                        style="margin-top: 20px"
                        @click="handleRefreshProductSkuList">刷新列表
                        </el-button>
                        <el-button
                        type="primary"
                        style="margin-top: 20px"
                        @click="handleSyncProductSkuPrice">同步价格
                        </el-button>
                    </el-form-item> -->
                </el-form> 
            </div>
        </el-card>

        <!-- <div class="table-container">
            <el-table ref="productTable"
                        highlight-current-row
                        :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                        :data="list"
                        style="width: 100%"
                        
                        border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="编号" width="60" align="center">
                    <template slot-scope="scope">{{scope.row.keyId}}</template>
                </el-table-column>
                <el-table-column label="属性名称" width="160" align="center">
                    <template slot-scope="scope"><el-tag type="primary">{{scope.row.attrName}}</el-tag></template>
                </el-table-column>
                <el-table-column label="属性值" align="center">
                    <template slot-scope="scope"><el-tag type="success">{{scope.row.attrName}}</el-tag></template>
                </el-table-column>
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
        </div> -->
    </div>
</template>

<script>
// import {fetchList,createProductCate,getProductCate} from '@/api/productCate';
import {fetchListLevel,fetchListChildrenLevel} from '@/api/productCate'
import {fetchAttrList} from '@/api/productAttr'
import {fetchListBycategoryId} from '@/api/statistics'
import {formatDate} from '@/utils/date';
const defaultProductCate = {
    pageindex:0,
    pagesize:20,
    productCategoryId:null,
    attrName:null,
    navStatus: null,
    keyId: null,
    updateTime: null,
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
            productCateValue:null,

            productCate: Object.assign({}, defaultProductCate),
            selectProductCateList: [],
            rules: {
            attrName: [
                {required: true, message: '请输入分类名称', trigger: 'blur'},
                {min: 2, max: 14, message: '长度在 2 到 14 个字符', trigger: 'blur'}
            ]
            },
            list: [
                {
                    keyId:'0001',
                    attrName:'外套',
                    categoryLevel:'颜色',
                    createTime:'2018-8-8'
                },{
                    keyId:'0001',
                    attrName:'外套',
                    categoryLevel:'颜色',
                    createTime:'2018-8-8'
                },{
                    keyId:'0001',
                    attrName:'外套',
                    categoryLevel:'颜色',
                    createTime:'2018-8-8'
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
        //this.getProductAttrCateList();
        this.getProductCateList();

        ///this.resetcategoryId();
        this.getList();
    },
    watch: {
        $route(route) {
            this.resetcategoryId();
            this.getList();
        },
        //监视
        productCateValue (newValue) {
            if (newValue != null && newValue.length == 2) {
                this.listQuery.productCategoryId = newValue[1];
            } else {
                this.listQuery.productCategoryId = 0;
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
        getList(){
            this.listLoading = true;
            fetchAttrList(this.productCate).then(response => {
                this.listLoading = false;
                this.list = response.data;
                // this.total = response.data.total;
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

        //查询商品属性
        handleSearchList(){
            this.productCate.pageindex=null
            this.productCate.pagesize=null
            //alert(this.productCate.productCategoryId)
            //值为undefined
            fetchSearchingList(this.productCate.productCategoryId).then(response => {
                this.listLoading = false;
                this.list = response.data;
            });

        },

        handleAdd(){
            this.$router.push({path: '/add_product'})
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
        // handleSaveList(){
        //     this.$refs[formName].validate((valid) => {
        //     if (valid) {
        //         this.$confirm('是否提交数据', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //         }).then(() => {
        //         this.productCate.productAttributeIdList = this.getProductAttributeIdList();
        //         createProductCate(this.productCate).then(response => {
        //             this.$refs[formName].resetFields(); 
        //             this.resetForm(formName);
        //             this.$message({
        //                 message: '提交成功',
        //                 type: 'success',
        //                 duration: 1000
        //                 });
        //             });
        //         });
        //     } 
        //     else {
        //         this.$message({
        //         message: '验证失败',
        //         type: 'error',
        //         duration: 1000
        //         });
        //         return false;
        //     }
        // });  
        // },
    
    }
}
</script>

<style scoped>
</style>
