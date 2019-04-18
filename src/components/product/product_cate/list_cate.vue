<template>
    <div class="app-container">
        <el-card shadow="never" style="background:#f2f2f2;">
<!--按钮（查询和重置） S-------------------------------------------------------------------------->
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
                    style="float: right;margin-right: 15px"
                    @click="handleResetSearch()"
                    size="small">
                    Reset
                </el-button>
            </div>
<!--按钮（查询和重置） E-------------------------------------------------------------------------->
<!--条件选择 S-------------------------------------------------------------------------->            
            <div style="margin-top: 20px">
                <el-form :inline="true" style="margin-left:60px;" size="small" label-width="140px" :model="productCate" :rules="rules" ref="productCateFrom">
                    <el-form-item>
                        <el-select v-model="search" style="width: 203px" @change="changesearch" placeholder="Please select condition">
                            <el-option
                                v-for="item in selectSearch"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-cascader
                            v-if="flag1"
                            style="width:203px"
                            placeholder="please selete"
                            expand-trigger="click"
                            clearable
                           
                            v-model="productCate.parentId"
                            :options="productCateOptions"
                            change-on-select>
                        </el-cascader>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-if="flag2" style="width: 203px" v-model="productCate.name" placeholder="请输入分类名称"></el-input>
                    </el-form-item>  
                </el-form> 
            </div>
<!--条件选择 E-------------------------------------------------------------------------->            
        </el-card>

<!--添加、按钮 S--------------------------------------------------------------------------->
        <el-card class="operate-container" shadow="never">
            <!-- <svg-icon icon-class="Add" class="side-icon"></svg-icon> -->
            <i class="el-icon-circle-plus-outline"></i>
            <span>商品分类</span>
            <el-button size="mini" type="primary" class="btn-add" @click="handleAddProductCate()">添加</el-button>
        </el-card>
<!--添加、按钮 E--------------------------------------------------------------------------->
<!--分类列表 S--------------------------------------------------------------------------->
        <div class="table-container">
            <el-table ref="productTable"
                    highlight-current-row
                    :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                    :data="list"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    v-loading="listLoading"
                    border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="编号" width="80" type="index" align="center">
                    <!-- <template slot-scope="scope">{{scope.row.categoryId}}</template> -->
                </el-table-column>
                <el-table-column label="分类名称"  align="center">
                    <template slot-scope="scope">{{scope.row.categoryName}}</template>
                </el-table-column>
                <el-table-column label="级别" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.categoryLevel}}</template>
                </el-table-column>
                <el-table-column label="导航栏" width="100" align="center">
                    <template slot-scope="scope">
                        <el-switch
                        @change="handleNavStatusChange(scope.$index, scope.row)"
                        :active-value="1"
                        :inactive-value="0"
                        v-model="scope.row.categoryStatus">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="260" align="center">
                    <!-- :disabled="scope.row.categoryLevel | disableNextLevel" -->
                    <template slot-scope="scope">
                        <el-button
                            size="mini"

                            v-if="flag3"
                            @click="handleShowNextLevel(scope.$index, scope.row)">查看下级
                        </el-button>
                        <el-button
                            size="mini"

                            v-if="flag4"
                            @click="handleShowFrontLevel(scope.$index, scope.row)">查看上级
                        </el-button>
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
<!--分类列表 E--------------------------------------------------------------------------->
<!--添加商品分类 S--------------------------------------------------------------------->
        <el-dialog                    
            title="添加商品分类"
            :center="true"
            
            :visible.sync="dialogAddCateVisible"  width="35%" height="100%">
            <el-form :model="AddProductCate" :inline="true" size="small"
                ref="AddProductCateForm" label-width="100px">
                <el-form-item label="所属分类：" >
                    <el-cascader
                        style="width:203px"
                        placeholder="please selete"
                        expand-trigger="click"
                        clearable
                        v-model="AddProductCate.parentId"
                        :options="productCateOptions"
                        change-on-select>
                    </el-cascader>
                </el-form-item>
                <el-form-item label="分类名称：">
                    <el-input v-model="AddProductCate.categoryName" style="width: 203px"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAddCateVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="handleAddProductCateConfirm" size="mini">保 存</el-button>
            </span>
        </el-dialog>
<!--添加商品属性名称 E------------------------------------------------------------------>

        <!-- :visible.sync="dialogAddCateVisible"  :dialog-visible="dialogAddCateVisible"-->
        <!-- <add_cate :visible.sync="dialogAddCateVisible" @closeDialog="CloseAddCateDialog"></add_cate> -->
    </div>
</template>

<script>
import {fetchListLevel,fetchListChildrenLevel,getDetailByName,AddProductCate,getProductCate} from '@/api/productCate';
import { truncate, truncateSync } from 'fs';
// import add_cate from "./add_cate.vue";
const defaultProductCate = {
    name:null,
    
    // navStatus: null,
    // categorys: null,
    // productAttributeIdList: [],
    parentId:null,
  };

//商品分类
const defaultAddProductCate = {
    //分类名称
    categoryName:null,
    //分类父分类id
    parentId:0,
    //本分级别
    //categoryLevel:null,
    //是否显示在导航栏
    // categoryStatus:null,
};

export default {
    //components: {add_cate},
    data(){
        return{
            search:null,
            //查询条件
            flag1:false,
            flag2:false,
            //上/下级别按钮
            flag3:true,
            flag4:false,
            //添加的对话框
            dialogAddCateVisible:false,
            AddProductCate: Object.assign({}, defaultAddProductCate),
            productCate: Object.assign({}, defaultProductCate),
            selectProductCateList: [],
            productCateOptions:[],
            //productCateValue:null,
            parentId:null,
            rules: {
            categoryName: [
                {required: true, message: '请输入分类名称', trigger: 'blur'},
                {min: 2, max: 14, message: '长度在 2 到 14 个字符', trigger: 'blur'}
            ]
            },
            list:null,
            selectSearch:[
                {
                    label: "商品分类",
                    value: 1
                },
                {
                    label: "分类名称",
                    value: 2
                }
            ],
            
            //listLoading: true,
            offset: 0,
            limit: 20,
            count: 0,
            currentPage: 1,
        }
    },

    //监视
    // productCateValue (newValue) {
    //     if (newValue != null && newValue.length == 2) {
    //         this.listQuery.productCategoryId = newValue[1];
    //     } else {
    //         this.listQuery.productCategoryId = 0;
    //     }
    // },

    created() {
        // if (this.isEdit) {
        //     getProductCate(this.categoryId).then(response => {
        //         this.productCate = response.data;
        //     });
        // } else {
        //     this.productCate = Object.assign({}, defaultProductCate);
        // }


        //this.getSelectProductCateList();
        // this.getProductAttrCateList();
        this.getProductCateList();


        //this.resetcategoryId();
        this.getList();
    },
    // watch: {
    //   $route(route) {
    //     this.resetcategoryId();
    //     this.getList();
    //   }
    // },
    methods:{
        changesearch(value)
        {
            if(value===1)
                {this.flag1=true;this.flag2=false; }
            if(value===2)
                {this.flag2=true;this.flag1=false; }

        },

        //添加分类
        handleAddProductCate(){
            this.dialogAddCateVisible=true;
        },
        //添加分类表单提交    需要验证！！！！！！！！！！！！！！！！
        handleAddProductCateConfirm(){
            this.dialogAddCateVisible = false
            AddProductCate(this.AddProductCate).then(response =>{
                this.$message({
                  message: '添加成功！',
                  type: 'success',
                  duration:1000
                  });
            })
            this.$router.push({path: '/product/product_cate/list_cate'})  
        },

        //添加组件
        // CloseAddCateDialog(msg){
        //     if(msg=="add")
        //     {
        //         this.dialogAddCateVisible=false;
        //         this.getList();
        //     }
        // },

        //重置
        handleResetSearch(){
            this.productCate = Object.assign({}, defaultProductCate);
            this.flag1=false;
            this.flag2=false;
            this.productCate.search="";
        },

        //初始化 显示列表内容
        getList() {
            this.listLoading = true;
            fetchListLevel(0,20).then(response => {
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
                    //这里有问题！！！！！！！！！！！！
                    if(list[i] != null && list[i].length > 0){
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
                    else{
                        this.productCateOptions.push({label: list[i].categoryName, value: list[i].categoryId});
                    }
                }
                if(this.label=="所属分类")
                {
                    this.productCateOptions.unshift({label:'无上级分类', value:0 });
                    //this.productCateOptions.unshift({categoryId: 0, categoryName: '无上级分类'});
                }
            });
        },

        //显示商品分类
        // resetcategoryId(){
        //     if (this.$route.query.categoryId != null) {
        //     this.categoryId = this.$route.query.categoryId;
        //     } else {
        //     this.categoryId = 0;
        //     }
        // },
        getProductAttributeIdList() {
            //获取选中的筛选商品属性
            let productAttributeIdList = [];
            for (let i = 0; i < this.filterProductAttrList.length; i++) {
                let item = this.filterProductAttrList[i];
                if (item.value !== null && item.value.length === 2) {
                    productAttributeIdList.push(item.value[1]);
                }
            }
            return productAttributeIdList;
        },

        //查看上级
        handleShowFrontLevel(){
            this.flag4=false;
            this.flag3=true;
            this.getList();
        },
        //查看下级
        handleShowNextLevel(index, row) {
            this.flag3=false;
            this.flag4=true;
            this.listLoading = true;
            fetchListChildrenLevel(row.categoryId).then(response => {
                this.listLoading = false;
                this.list = response.data;
                // this.total = response.data.total;
            });
            //this.$router.push({path: '/product/product_cate/list_cate', categoryId: row.categoryId})
        },
        
        handleSearchList(){
            //根据分类名称查询商品列分类表
            this.listLoading = true;
            getDetailByName(this.productCate).then(response =>{
                this.listLoading = false;
                this.list = response.data;
            })
        },
        

        //编辑
        // handleUpdate(index, row) {
        //     getProductCate(this.categoryId).then(response => {
        //         this.productCate = response.data;
        //     });
        //     // this.$router.push({path:'/product/product_cate/add_cate',id:row.id});
        //     // this.$router.push({path: '/product/product_cate/add_cate', query: {categoryId: row.id}})
        // },

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

        //初始化商品分类
        // getSelectProductCateList(){
        //     fetchList(1, {pageSize: 100, pageNum: 1}).then(response => {
        //     this.selectProductCateList = response.data.list;
        //     this.selectProductCateList.unshift({id: 0, name: '无上级分类'});
        //     });
        // },
        handleSizeChange(val){
                console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.offset = (val - 1)*this.limit;
            //this.getUsers()
        },

        //添加分类
        // handleAddProductCate(){
        //     this.dialogAddCateVisible=true;

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
    //     onSubmit(formName) {
    //     this.$refs[formName].validate((valid) => {
    //       if (valid) {
    //         this.$confirm('是否提交数据', '提示', {
    //           confirmButtonText: '确定',
    //           cancelButtonText: '取消',
    //           type: 'warning'
    //         }).then(() => {
    //           if (this.isEdit) {
    //             this.productCate.productAttributeIdList = this.getProductAttributeIdList();
    //             updateProductCate(this.$route.query.id, this.productCate).then(response => {
    //               this.$message({
    //                 message: '修改成功',
    //                 type: 'success',
    //                 duration: 1000
    //               });
    //               this.$router.back();
    //             });
    //           } else {
    //             this.productCate.productAttributeIdList = this.getProductAttributeIdList();
    //             createProductCate(this.productCate).then(response => {
    //               this.$refs[formName].resetFields();
    //               this.resetForm(formName);
    //               this.$message({
    //                 message: '提交成功',
    //                 type: 'success',
    //                 duration: 1000
    //               });
    //             });
    //           }
    //         });

    //       } else {
    //         this.$message({
    //           message: '验证失败',
    //           type: 'error',
    //           duration: 1000
    //         });
    //         return false;
    //       }
    //     });
    //   },
    handleSelectionChange(){},
    },
    filters: {
      disableNextLevel(value) {
        if (value === 1) {
          return false;
        } else {
          return true;
        }
      }
    }

}
</script>

<style scoped>

</style>


