<template>
    <div class="app-container">
<!--条件查询/添加、按钮 S--------------------------------------------------------------------------->
        <!-- <el-card shadow="never"> -->
            <el-form :inline="true" size="small" label-width="90px" :model="productCate" :rules="rules" ref="productCateFrom">
                <el-form-item label="分类名称：">
                    <el-input style="width: 203px" clearable v-model="productCate.name" placeholder="请输入分类名称"></el-input>
                </el-form-item>  
                <el-button @click="handleSearchList('productCateFrom')" size="small" type="primary">Search</el-button>
                <el-button @click="refreshList()" size="small" type="primary">Refresh</el-button>  
                <el-button @click="handleAddProductCate()" size="small" type="primary" >添加分类</el-button>
            </el-form> 
        <!-- </el-card> -->
<!--添加、按钮 E--------------------------------------------------------------------------->
<!--分类列表 S--------------------------------------------------------------------------->
        <div class="table-container">
            <el-table ref="productTable"
                    highlight-current-row
                    :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                    :data="list"
                    @selection-change="handleSelectionChange"
                    v-loading="listLoading"
                    border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <el-table-column label="编号" width="80" type="index" align="center">
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
            :title="dialogTitle"
            :center="true"
            
            :visible.sync="dialogAddCateVisible"  width="35%" height="100%">
            <el-form :model="OperateProductCate" :inline="true" size="small"
                ref="OperateProductCateForm" label-width="140px">
                <!-- <el-select v-model="AdminDetail.identityCardType" placeholder="全部" style="width: 203px" clearable >
                    <el-option v-for="item in IDCardType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select> -->
                <el-form-item label="所属分类：" >
                    <el-select v-model="productCate.parentId" placeholder="please selete" style="width:203px" clearable>   
                        <el-option
                            v-for="item in productCateOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="所属分类：" >
                    <el-cascader
                        style="width:203px"
                        placeholder="please selete"
                        expand-trigger="click"
                        clearable
                        v-model="OperateProductCate.parentId"
                        :options="productCateOptions"
                        change-on-select>
                    </el-cascader>
                </el-form-item> -->
                <el-form-item label="分类名称：">
                    <el-input v-model="OperateProductCate.categoryName" style="width: 203px"></el-input>
                </el-form-item>
                <el-form-item label="导航栏处是否显示：">
                    <template>
                        <el-switch
                            @change="handleNavStatusChange(scope.$index, scope.row)"
                            :active-value="1"
                            :inactive-value="0"
                            v-model="OperateProductCate.categoryStatus">
                        </el-switch>
                    </template>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAddCateVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="handleOperateProductCateConfirm" size="mini">保 存</el-button>
            </span>
        </el-dialog>
<!--添加商品属性名称 E------------------------------------------------------------------>

        <!-- :visible.sync="dialogAddCateVisible"  :dialog-visible="dialogAddCateVisible"-->
        <!-- <add_cate :visible.sync="dialogAddCateVisible" @closeDialog="CloseAddCateDialog"></add_cate> -->
    </div>
</template>

<script>
import {fetchListLevel,fetchListChildrenLevel,fetchListParentLevel,getDetailByName,AddProductCate,getProductCate} from '@/api/productCate';
import { truncate, truncateSync, chown } from 'fs';
// import add_cate from "./add_cate.vue";
const defaultProductCate = {
    name:null,
    // productAttributeIdList: [],
    categoryId:null,
    //parentId:null,
    categoryStatus:1,
  };

//商品分类
const defaultOperateProductCate = {
    //分类名称
    categoryName:null,
    //分类父分类id
    parentId:0,
    //分类级别
    //categoryLevel:null,
    //是否显示在导航栏
    // categoryStatus:null,
    categoryStatus:1,
};

export default {
    //components: {add_cate},
    data(){
        return{
            search:null,
            dialogTitle:'',
            //上/下级别按钮
            flag3:true,
            flag4:false,
            //添加的对话框
            dialogAddCateVisible:false,
            OperateProductCate: Object.assign({}, defaultOperateProductCate),
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

        //商品分类
        //this.getProductCateList1();
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

        //添加分类
        handleAddProductCate(){
            this.OperateProductCate = Object.assign({}, defaultOperateProductCate);
            this.dialogAddCateVisible=true;
            this.dialogTitle = "添加商品分类";
        },
        //添加分类表单提交    需要验证！！！！！！！！！！！！！！！！
        handleOperateProductCateConfirm(){
            this.dialogAddCateVisible = false;
            
            AddProductCate(this.OperateProductCate).then(response =>{
                this.$message({
                  message: '添加成功！',
                  type: 'success',
                  duration:1000
                  });
            })
            console.log(this.OperateProductCate.parentId);
            this.$router.push({path: '/product/product_cate/list_cate'});  
            this.getList();
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

        //编辑里面的商品所属分类
        getProductCateList()
        {
            fetchListLevel().then(response => {                
                let list = response.data;
                this.productCateOptions=[];
                for (let i = 0; i < list.length; i++) {
                    //alert(list[i].categoryName);
                    this.productCateOptions.push({label: list[i].categoryName, value: list[i].categoryId});
                }
                this.productCateOptions.unshift({label:'无上级分类', value:0 });
            });
        },

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

        //查看上级 (根据子分类id查询父分类信息)
        handleShowFrontLevel(index, row){
            this.listLoading=true;
            fetchListParentLevel(row.categoryId).then(response=>{
                this.listLoading=false;
                this.list=response.data;
                //this.list.categoryName=response.data.categoryName;
            });
            this.flag4=false;
            this.flag3=true;
        },

        //查看下级
        handleShowNextLevel(index, row) {
            this.listLoading = true;
            fetchListChildrenLevel(row.categoryId).then(response => {
                this.listLoading = false;
               this.list = response.data;
            //    let code=response.code;
            //     if(code==406){
            //         this.$message({
            //             message: '无上级分类!',
            //             type: 'warning',
            //             duration: 1000
            //         });
            //         return;
            //     }
            //     else
            //     {this.list = response.data;}
            })

            this.flag3=false;
            this.flag4=true;

            // .catch(response => {
            //     if(response.data.code==406){
            //         this.$message({
            //             message: '无上级分类!',
            //             type: 'warning',
            //             duration: 1000
            //         });
            //         return;
            //     }
            // });
        },
        
        //查询-----------------------------------------------------------------
        handleSearchList(){
            //这里需要判断是否为空!
            if(this.productCate.name==null)
            {
                this.$message({
                message: '请输入分类名称!',
                type: 'warning',
                duration: 1000
                });
                return;
            }
            //根据分类名称查询商品列分类表
            this.listLoading = true;
            getDetailByName(this.productCate).then(response =>{
                this.listLoading = false;
                this.list = response.data;
                if(this.list==null)
                {
                    this.$message({
                    message: '没有查到相关信息',
                    type: 'warning',
                    duration: 1000
                    });
                    return;
                }
            })
        },

        //刷新
        refreshList(){
            this.productCate = Object.assign({}, defaultProductCate);
            this.getList();
        },
        
        //编辑
        handleUpdate(index, row){
            this.dialogAddCateVisible=true;
            this.dialogTitle = "修改商品分类";
            this.OperateProductCate = Object.assign({},row);
            this.productCateOptions.label=row.categoryName;
            this.productCateOptions.value=row.categoryId;
            //this.OperateProductCate.categoryName=row.categoryName;
            // this.productCateOptions=[
            //     {
            //         label:row.categoryName,
            //         value:row.categoryId,
            //     }
            // ]

            // if(this.OperateProductCate.parentId==0)
            // {
            //     this.productCateOptions.label="无上级分类";
            // }
            // getProductCate(row.categoryId).then(response => {
            //     this.OperateProductCate = response.data;
            //     this.OperateProductCate.unshift({id: 0, name: '无上级分类'});
            //     // this.OperateProductCate.productCateOptions = response.data.categoryName;
            // });
        },

        // this.selectProductCateList = response.data.list;
        // this.selectProductCateList.unshift({id: 0, name: '无上级分类'});

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


