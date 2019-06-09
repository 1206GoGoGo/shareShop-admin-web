<template>
    <el-card class="form-container" shadow="never">
        <div style="width: 900px">
            <el-form :model="value" inline-message :rules="rules" ref="productInfoForm" style="width: 700px" label-width="120px" size="small">
                <el-form-item label="商品分类：" prop="categoryId">
                    <el-cascader
                        @change="getAttrKey"
                        v-model="selectProductCategeryId"
                        expand-trigger="click"
                        clearable
                        :options="productCateOptions"
                        :show-all-levels="false">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="商品名称：" prop="name">
                    <el-input class="input-width" v-model="value.name"></el-input>
                </el-form-item>
                <el-form-item label="商品编号：" prop="productSn">
                    <el-input class="input-width" v-model="value.productSn"></el-input>
                </el-form-item>
                <el-form-item label="商品原价："><!--这里的原价在另外一张表里面-->
                    <el-input class="input-width" v-model="value.originalPrice"></el-input>
                </el-form-item>
                <el-form-item label="商品数量：">
                    <el-input class="input-width" v-model="value.stock"></el-input>
                </el-form-item>
                <el-form-item label="商品折扣：">
                    <el-input class="input-width" v-model="value.discountRate"></el-input>
                </el-form-item>

                <!-- <el-form-item label="规格参数：">
                    <Editor id="tinymce" v-model="detailHtml" :init="editorInit"></Editor>
                </el-form-item> -->

                <!--做不出来先不管了-->
                <el-form-item label="规格参数：">
                    <tinymce :width="595" :height="300" v-model="value.detailHtml"></tinymce>
                </el-form-item>

                <!-- :on-success="handleAvatarSuccess"  :before-upload="beforeAvatarUpload"-->
                <!-- <el-form-item label="商品图片：">
                    
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :limit="8">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item> -->
                <el-form-item label="属性名称：">
                    <el-select v-model="value.attrName" style="width: 203px" class="input-width" placeholder="All" clearable>
                        <el-option v-for="item in AttrNameOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
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
                            <div v-for="(item,index) in selectProductAttr[idx].options" style="display: inline-block"
                                class="littleMarginLeft" :key="index">
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
                        label="商品价格"
                        width="80"
                        align="center">
                        <template slot-scope="scope">
                        <el-input v-model="scope.row.price"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="商品数量"
                        width="80"
                        align="center">
                        <template slot-scope="scope">
                        <el-input v-model="scope.row.stock"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="预警值"
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


                <el-form-item label="商品描述：">
                    <el-input v-model="value.html" type="textarea" :autoSize="true"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button
                        size="small"
                        type="primary"
                        style="margin-top: 20px;"
                        @click="handleSaveList">保存
                    </el-button>
                    <el-button
                        size="small"
                        type="primary"
                        style="margin-top: 20px;"
                        @click="handleCancelList">取消
                    </el-button>
                 </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>

<script>
import {fetchListLevel,fetchListChildrenLevel} from '@/api/productCate'
import {fetchKeyByCategoryID} from '@/api/productAttr'
import SingleUpload from '@/components/Upload/singleUpload'
import MultiUpload from '@/components/Upload/multiUpload'
// import Tinymce from '@/components/Tinymce'

const defaultValue = {
    name: null,
    productSn:null,
    minPrice:null,
    maxPrice:null,
    originalPrice:null,
    stock:null,
    discountRate:0,
    detailHtml:null,
    //商品属性
    attrName:null,
    //keywords:null,
    //note:null,
    productionDate:null,
    pic:null,
    html:null,
  };
export default {
    components: {SingleUpload, MultiUpload, Tinymce},
    created(){
        //显示商品分类
        this.getProductCateList();
    },

    // mounted(){
    //     tinymce.init();
    // },

    data(){
        return{
            // editorInit: {
            //     language_url: '/static/tinymce4.7.5/zh_CN.js',
            //     language: 'zh_CN',
            //     skin_url: '/static/tinymce4.7.5/skins/lightgray',
            //     height: 300,
            // },
            value: Object.assign({}, defaultValue),
            productCateOptions:[],
            AttrNameOptions:[],
            selectProductCategeryId:null,
            time:'',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            rules: {
                name: [
                    {required: true, message: '请输入商品名称', trigger: 'blur'},
                    {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
                ],
                description: [{required: true, message: '请输入商品描述', trigger: 'blur'}],
                // categoryId: [{required: true, message: '请选择商品分类', trigger: 'blur'}],
                brandId: [{required: true, message: '请选择商品品牌', trigger: 'blur'}],
                productSn: [{required: true, message: '请输入商品编号', trigger: 'blur'}],
                requiredProp: [{required: true, message: '该项为必填项', trigger: 'blur'}]
            }
        }
    },
    methods:{
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
                    }).catch(function(e){
                        this.$message({
                        message: '406',
                        type: 'warning',
                        duration: 1000
                        });
                        return
                    })
                }
            });
        },

        //根据商品id查看商品属性
        getAttrKey(){
            //需要清空!!!!
            fetchKeyByCategoryID(this.selectProductCategeryId[this.selectProductCategeryId.length-1]).then(response=>{
                let list = response.data;
                this.AttrNameOptions=[];
                for (let i = 0; i < list.length; i++) {
                    //alert(list[i].attrName);
                    this.AttrNameOptions.push({label: list[i].attrName, value: list[i].keyId});
                }
            })
        },

        handleSaveList(){},
        handleCancelList(){},
       
        


    },
}
</script>
<style scoped>
.input-width{
    width: 80%;
}
.avatar-uploader .el-upload {
    /* border: 1px dashed #d9d9d9; */
    border: 10px dashed #f00;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }
  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }
</style>