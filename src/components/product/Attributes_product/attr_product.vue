<template>
    <div class="app-container">
        <el-card shadow="never" style="background:#f2f2f2;">
            <div>
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
                    style="float: right; margin-right: 15px"
                    @click="handleResetSearch()"
                    size="small">
                    Reset
                </el-button>
            </div>
            <div style="margin-top: 10px">
                <el-form :inline="true"  size="small" label-width="140px" :model="productCate" :rules="rules" ref="productCateFrom">
                    <el-form-item label="商品分类：">
                        <el-cascader
                            style="width:203px"
                            placeholder="please selete"
                            expand-trigger="click"
                            clearable
                            v-model="productCateValue"
                            :options="productCateOptions"
                            change-on-select>
                        </el-cascader>
                    </el-form-item>
                </el-form> 
            </div>
        </el-card>

        <!--添加-->
        <el-card class="operate-container" shadow="never">
            <!-- <svg-icon icon-class="Add" class="side-icon"></svg-icon> -->
            <i class="el-icon-circle-plus-outline"></i>
            <span>添加商品属性</span>
            <el-button  size="mini" type="primary" class="btn-add" @click="handleAddAttrValue()">添加属性值</el-button>
            <el-button style="margin-right:20px;" size="mini" type="primary" class="btn-add" @click="handleAddAttrKey()">添加属性</el-button>
        </el-card>

        <!-- v-loading="listLoading"  @selection-change="handleSelectionChange"-->
        <div class="table-container">
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
                <!-- <el-table-column label="商品分类名称" align="center">
                    <template slot-scope="scope">{{scope.row.categoryName}}</template>
                </el-table-column> -->
                <el-table-column label="属性名称" width="160" align="center">
                    <template slot-scope="scope"><el-tag type="primary">{{scope.row.attrName}}</el-tag></template>
                </el-table-column>
                <el-table-column label="属性值" align="center">
                    <template slot-scope="scope"><el-tag type="success">{{scope.row.attrName}}</el-tag></template>
                </el-table-column>
                <!-- <el-table-column label="创建时间" width="200" align="center">
                    <template slot-scope="scope">{{scope.row.updateTime | dateFormatter}}</template>
                </el-table-column> -->
                <!-- <el-table-column label="" width="100" align="center">
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
        
<!--添加商品属性名称 S----------------------------------------------------------------->
        <el-dialog                    
            title="添加商品属性"
            
            :visible.sync="dialogAddAttrKeyVisible"  width="35%" height="100%">
            <el-form :model="AddAttrKey" :inline="true" size="small"
                ref="DetailForm" label-width="100px">
                <el-form-item label="商品分类：" >
                    <el-cascader
                        style="width:203px"
                        placeholder="please selete"
                        expand-trigger="click"
                        clearable
                        v-model="AddAttrKey.categoryId"
                        :options="productCateOptions"
                        change-on-select>
                    </el-cascader>
                </el-form-item>
                <el-form-item label="属性名称：">
                    <el-input v-model="AddAttrKey.attrName" style="width: 203px"></el-input>
                </el-form-item>
                <!-- <el-form-item label="属性值：">
                    <el-input v-model="AddAttrKey.attrValue" style="width: 203px"></el-input>
                    <el-button type="primary" size="mini" style="margin-left:10px;" @click="handleAddProductAttrValue()">添加</el-button>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAddAttrKeyVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="handleAddAttrKeyConfirm" size="mini">保 存</el-button>
            </span>
        </el-dialog>
<!--添加商品属性名称 E--------------------------------------------------------->
<!--添加商品属性值 S----------------------------------------------------------->
        <el-dialog                    
            title="添加属性信息"
            
            :visible.sync="dialogAddAttrValueVisible"  width="35%" height="100%">
            <el-form :model="AddAttrValue" :inline="true" size="small"
                ref="DetailForm" label-width="100px">
                <!-- <el-form-item label="商品分类：" >
                    <el-cascader
                        style="width:203px"
                        placeholder="please selete"
                        expand-trigger="click"
                        clearable
                        v-model="AddAttrValue.categoryId"
                        :options="productCateOptions"
                        change-on-select>
                    </el-cascader>
                </el-form-item> -->
                <el-form-item label="属性名称：">
                    <el-select v-model="AddAttrValue.attrName" style="width: 203px" class="input-width" placeholder="All" clearable>
                        <el-option v-for="item in statusOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="属性名称：">
                    <el-input v-model="AddAttrValue.attrName" style="width: 203px"></el-input>
                </el-form-item> -->
                <el-form-item label="属性值：">
                    <el-input v-model="AddAttrValue.attrValue" style="width: 203px"></el-input>
                    <el-button type="primary" size="mini" style="margin-left:10px;" @click="handleAddProductAttrValue()">添加</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAddAttrValueVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="handleConfirm" size="mini">保 存</el-button>
            </span>
        </el-dialog>
<!--添加商品属性名称 E--------------------------------------------------------->
    </div>
</template>

<script>
import {fetchListLevel,fetchListChildrenLevel,fetchAttrList,fetchSearchingList} from '@/api/productCate'
import {AddAttributeValue,AddAttributeKey} from '@/api/productAttr'
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

//属性名称
const defaultAddAttrKey = {
    //商品分类
    categoryId:null,
    //分类名称
    attrName:null,
    attrKeyId:null,
    //属性值
    attrValue:null,
};

//属性值
const defaultAddAttrValue = {
    //商品分类
    // categoryId:null,

    //分类名称
    //attrName:null,

    //属性分类id
    attrKeyId:null,
    //属性值
    attrValue:null,
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
            dialogAddAttrKeyVisible:false,
            dialogAddAttrValueVisible:false,
            productCateOptions:[],
            productCateValue:null,

            productCate: Object.assign({}, defaultProductCate),
            AddAttrKey: Object.assign({}, defaultAddAttrKey),
            AddAttrValue: Object.assign({}, defaultAddAttrValue),
            selectProductCateList: [],
            rules: {
            attrName: [
                {required: true, message: '请输入分类名称', trigger: 'blur'},
                {min: 2, max: 14, message: '长度在 2 到 14 个字符', trigger: 'blur'}
            ]
            },
            list:null,
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

        handleSearchList(){},

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
        
        //添加商品属性值
        handleAddAttrValue(){
            this.dialogAddAttrValueVisible=true
        },
        
        //添加商品属性名称
        handleAddAttrKey(){
            this.dialogAddAttrKeyVisible=true
        },

        //保存商品属性名称
        handleAddAttrKeyConfirm(){
            if (this.AddAttrKey.attrName == null || this.AddAttrKey.attrName == '') {
                this.$message({
                    message: '属性名称不能为空',
                    type: 'warning',
                    duration: 1000
                });
                return
            }
            AddAttributeKey(AddAttrValue).then(response => {
                this.list = response.data;
                this.$message({
                    message: '添加成功',
                    type: 'success',
                    duration: 1000
                });
                return
            });
        },

        handleAddProductAttrValue() {
            // let options = this.selectProductAttr[idx].options;
            // if (this.addProductAttrValue == null || this.addProductAttrValue == '') {
            if (this.AddAttrValue.attrValue == null || this.AddAttrValue.attrValue == '') {
                this.$message({
                    message: '属性值不能为空',
                    type: 'warning',
                    duration: 1000
                });
                return
            }
            
            // if (options.indexOf(this.addProductAttrValue) !== -1) {
            //     this.$message({
            //         message: '属性值不能重复',
            //         type: 'warning',
            //         duration: 1000
            //     });
            //     return;
            // }
            //this.selectProductAttr[idx].options.push(this.addProductAttrValue);
            

            AddAttributeValue(this.AddAttrValue.categoryId,this.AddAttrValue.attrName).then(response => {
                this.list = response.data;
                // this.$message({
                //     message: '添加成功',
                //     type: 'success',
                //     duration: 1000
                // });
                // return
            });

            

            //这样做差点！！！
            //this.AddAttr.selectProductAttrValues.push(this.ProductAttrValue);
            this.AddAttrKey.ProductAttrValue = null;
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
.littleMarginLeft {
    margin-left: 10px;
}
</style>
