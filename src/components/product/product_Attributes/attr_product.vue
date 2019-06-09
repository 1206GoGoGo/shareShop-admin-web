<template>
    <div class="app-container">
<!--条件查询/添加、按钮 S--------------------------------------------------------------------------->
        <!-- <el-card shadow="never"> -->
            <el-form :inline="true" size="small" label-width="90px" :model="productCate" :rules="rules" ref="productCateFrom" style="margin-bottom:0px;">
                <el-form-item label="商品分类：">
                    <!-- :props="props" -->
                    <el-cascader

                        style="width:203px"
                        placeholder="please selete"
                        expand-trigger="click"
                        clearable
                        v-model="productCate.id"
                        :options="productCateOptions"
                        :show-all-levels="false">
                    </el-cascader>
                </el-form-item>
                <el-button @click="handleSearchList('productCateFrom')" size="small" type="primary">Search</el-button>
                <el-button @click="refreshList()" size="small" type="primary">Refresh</el-button>  
                <el-button @click="handleAddAttrKey()" size="small" type="primary" class="btn-add">添加属性</el-button>
                <el-button @click="handleAddAttrValue()"  size="small" type="primary" class="btn-add" >添加属性值</el-button>
            </el-form> 
        <!-- </el-card> -->
<!--添加、按钮 E--------------------------------------------------------------------------->
        <!-- v-loading="listLoading"  @selection-change="handleSelectionChange"-->
        <div class="table-container">
            <el-table ref="productTable"
                highlight-current-row
                :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                :data="list"
                size="medium"
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
                    <!-- <template>
                        <el-table  :data="scope.row.attrValues" show-header="false">
                            <el-table-column prop="attrValue">
                                <template slot-scope="scope">
                                <span>{{scope.row.attrValue}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template> -->
                    <template :data="scope.row.attrValues" slot-scope="scope">
                        <!-- {{scope.row.attrValue}} -->
                        <template slot-scope="scope">
                            <el-tag type="success">{{scope.row.attrValue}}</el-tag>
                        </template>
                    </template>
                    <!-- <template :data="valueList" slot-scope="scope"><el-tag type="success">{{scope.row.attrValue}}</el-tag></template> -->
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
                        :show-all-levels="false">
                <!--change-on-select:选择即改变;这里不需要,因为商品的属性是在最高级别的里面创建的-->        
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
                <el-form-item label="属性名称：">
                    <el-select v-model="AddAttrValue.attrName" style="width: 203px" class="input-width" placeholder="All" clearable>
                        <el-option v-for="item in AttrNameOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
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
import {fetchListLevel,fetchListChildrenLevel,getCategoryById} from '@/api/productCate'
import {fetchAttrList,AddAttributeValue,AddAttributeKey,fetchAttrByCategoryId,fetchValueByKeyID,fetchAttrNameList} from '@/api/productAttr'
import {fetchListBycategoryId} from '@/api/statistics'
import {formatDate} from '@/utils/date';

//商品分类
const defaultProductCate = {
    pageindex:0,
    pagesize:20,
    id:null,
    name:null,
    categoryName:null,
    //productCategoryId:null,
    // attrName:null,
    // navStatus: null,
    // keyId: null,
    // updateTime: null,
    // productAttributeIdList: [],
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
    pageindex:0,
    pagesize:20,
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
    data(){
        return{
            dialogAddAttrKeyVisible:false,
            dialogAddAttrValueVisible:false,
            productCateOptions:[],
            //productCateValue:null,
            // props:{
            //     label:null,
            // },
            valueList:null,
            AttrNameOptions:[],
            productCate: Object.assign({}, defaultProductCate),
            AddAttrKey: Object.assign({}, defaultAddAttrKey),
            AddAttrValue: Object.assign({}, defaultAddAttrValue),
            selectProductCateList: [],
            rules: {
            attrName: [
                {required: true, message: '请输入分类名称', trigger: 'blur'},
                {min: 2, max: 14, message: '长度在 2 到 14 个字符', trigger: 'blur'}]  
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
        // if (this.isEdit) {
        //     getProductCate(this.categoryId).then(response => {
        //         this.productCate = response.data;
        //     });
        // } else {
        //     this.productCate = Object.assign({}, defaultProductCate);
        // }

        //this.getSelectProductCateList();
        //this.getProductAttrCateList();

        //显示商品分类
        this.getProductCateList();
        //初始化
        this.getList();

        ///this.resetcategoryId();
        //this.getAttrKeyList();
        this.getAttrValueList();
    },
    // watch: {
    //     $route(route) {
    //         this.resetcategoryId();
    //         this.getList();
    //     },
        //监视
        // productCateValue (newValue) {
        //     if (newValue != null && newValue.length == 2) {
        //         this.listQuery.productCategoryId = newValue[1];
        //     } else {
        //         this.listQuery.productCategoryId = 0;
        //     }
        // },
    // },
    filters:{
        dateFormatter(time){
            let date=new Date(time)
            return formatDate(date, 'MM.dd.yyyy hh:mm:ss')
        },
    },

    methods:{
        //初始化
        getList(){
            //获取一个默认的商品分类id的类别名称
            // getCategoryById(3).then(response => {
            //     //this.productCateOptions.label= response.data.categoryName;
            //     //this.props.label = response.data.categoryName;
            // })
            //根据商品分类id查询商品key值
            this.listLoading = true;
            fetchAttrByCategoryId(3).then(response => {
                this.listLoading = false;
                this.list = response.data;
                // this.list.attrName = response.data.attrName;
                // this.list.keyId=response.data.attrKeyId;

                //根据商品属性id查询商品value值   
                // fetchValueByKeyID(row.keyId).then(response => {
                //     //this.list.attrValue = response.data.attrValue;
                //     //this.valueList=response.data;
                //     this.list.attrValues.attrValue=response.data;

                //     // for(let i=0; i<response.data.attrValue.length; i++)
                //     // {
                //     //     this.list.attrValue=response.data.attrValue[i];
                //     // }
                // });
            });
            
           
        },
        //重置
        handleResetSearch(){
            this.productCate = Object.assign({}, defaultProductCate);
        },
        
        handleConfirm(){},

        //初始化 显示列表内容
        getAttrKeyList(){
            this.listLoading = true;
            //显示属性表全部的内容  不需要!
            fetchAttrList(this.productCate).then(response => {
                this.listLoading = false;
                this.list = response.data;
                // this.total = response.data.total;
            });
        },

        getAttrValueList(){

        },

        //显示商品分类 
        getProductCateList()
        {
            fetchListLevel().then(response => {                
                let list = response.data;
                for (let i = 0; i < list.length; i++) { 
                    // if (list[i].children != null && list[i].children.length > 0) {                                                                                          []                     
                    fetchListChildrenLevel(list[i].categoryId).then(response => {
                        //注意级联！！！
                        list[i].children = response.data;
                        // alert(list[i].label);
                        // if (list[i].children != null && list[i].children.length > 0) {
                            let children = [];
                            for (let j = 0; j < list[i].children.length; j++) 
                            {
                                children.push({label: list[i].children[j].categoryName, value: list[i].children[j].categoryId});
                                
                            }  
                            this.productCateOptions.push({label: list[i].categoryName, value: list[i].categoryId, children: children}); 
                        // }
                        // else
                        // {
                        //     this.productCateOptions.push({label: list[i].categoryName, value: list[i].categoryId}); 
                        // }
                        //最后添加有子分类的全部项
                          
                    }).catch(function(e){
                        this.$message({
                        message: '406',
                        type: 'warning',
                        duration: 1000
                        });
                        return
                    })
                // }else
                    // if (list[i].children == null || list[i].children.length == 0) {
                    //     this.productCateOptions.push({label: list[i].categoryName, value: list[i].categoryId});
                    // }
                    // let currentName=list[i].categoryName;

                    // for(let k= 0; k < list.length; k++)
                    // {
                    //     if(list[k].categoryName != currentName)
                    //     //this.productCateOptions.splice(k,1);
                    //     this.productCateOptions.push({label: list[i].categoryName, value: list[i].categoryId});
                    // }
                }
            });
        },

        //刷新
        refreshList(){
            this.productCate = Object.assign({}, defaultProductCate);
            this.getList();
        },

        //查询商品属性
        handleSearchList(){
            this.productCate.pageindex=null
            this.productCate.pagesize=null
            //alert(this.productCate.productCategoryId)
            //值为undefined

            //根据商品分类id查询商品key值
            fetchAttrByCategoryId(this.productCate.productCategoryId).then(response => {
                this.listLoading = false;
                this.list = response.data;
            });

        },

        //得到所有的属性名称
        getAllAttrName(){
            fetchAttrNameList(this.AddAttrValue).then(response =>{
                // let list = response.data.list;
                // for(let i=0;i<list.length;i++){
                    //为甚这里的属性名称显示不到下拉框里面呢???????????
                    // this.AttrNameOptions.push([
                    //     {
                    //         value:i,
                    //         label:list[i].attrName,
                    //     }
                    // ]);

                    //为什么这里的属性名称显示不到下拉框里面呢???????????
                    // this.AttrNameOptions = response.data;
            //     }
            });
        },
        
        //添加商品属性值
        handleAddAttrValue(){
            this.dialogAddAttrValueVisible=true;
            //得到所有的属性名称
            this.getAllAttrName();
        },
        
        //添加商品属性名称
        handleAddAttrKey(){
            this.dialogAddAttrKeyVisible=true;
            
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
            // this.$confirm('是否要删除该分类', '提示', {
            // confirmButtonText: '确定',
            // cancelButtonText: '取消',
            // type: 'warning'
            // }).then(() => {
            // deleteProductCate(row.categoryId).then(response => {
            //     this.$message({
            //     message: '删除成功',
            //     type: 'success',
            //     duration: 1000
            //     });
            //     //this.getList();
            // });
            // });
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
