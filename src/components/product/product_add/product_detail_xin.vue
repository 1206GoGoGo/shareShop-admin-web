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
                <el-form-item label="商品成本："><!--这里的原价在另外一张表里面-->
                    <el-input class="input-width" v-model="value.originalPrice"></el-input>
                </el-form-item>
                <el-form-item label="商品数量：">
                    <el-input class="input-width" v-model="value.stock"></el-input>
                </el-form-item>
                <el-form-item label="商品折扣：">
                    <el-input class="input-width" v-model="value.discountRate"></el-input>
                </el-form-item>
                <el-form-item label="可使用优惠券：">
                    <!-- <span style="margin-left: 10px;margin-right: 10px">可使用优惠券</span> -->
                    <el-switch
                        v-model="value.couponOption"
                        :active-value="1"
                        :inactive-value="0">
                    </el-switch>
                </el-form-item>
                
                <!-- <el-form-item label="规格参数：">
                    <Editor id="tinymce" v-model="detailHtml" :init="editorInit"></Editor>
                </el-form-item> -->

                <!--做不出来先不管了-->
                <!-- <el-form-item label="规格参数：">
                    <tinymce :width="595" :height="300" v-model="value.detailHtml"></tinymce>
                </el-form-item> -->

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
                    <el-select v-model="value.productAttributeCategoryId" style="width: 203px" class="input-width" 
                    placeholder="All" clearable @change="handleProductAttrChange">
                        <el-option v-for="item in AttrNameOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="属性值：">
                    <!--!!!!!!!!!!!!!!!-->
                    <el-card shadow="never" class="cardBg">
                        <div><!--values是选中的多选框-->
                            <el-checkbox-group v-model="values">
                                <el-checkbox v-for="(item,key,index) in AttrValues" :key="index" :label="item.name" 
                                class="littleMarginLeft">{{item.name}}</el-checkbox>
                            </el-checkbox-group>                            
                        </div>
                    </el-card>
                    <el-button type="primary" style="margin-top: 20px" 
                        @click="handleRefreshProductSkuList">刷新列表</el-button>
                    <el-button type="primary" style="margin-top: 20px"
                        @click="handleSyncProductSkuPrice">同步价格</el-button>
                    
                    <el-table style="width: 100%;margin-top: 20px"
                            :data="value.skuStockList"
                            border>
                        <!-- <el-table-column
                            v-for="(item,index) in selectProductAttr"
                            :label="item.name"
                            :key="item.id"
                            align="center">
                            <template slot-scope="scope">
                            {{getProductSkuSp(scope.row,index)}}
                            </template>
                        </el-table-column> -->
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
                </el-form-item>

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
import {fetchKeyByCategoryID,fetchValueByKeyID} from '@/api/productAttr'
// import SingleUpload from '@/components/Upload/singleUpload'
// import MultiUpload from '@/components/Upload/multiUpload'
// import Tinymce from '@/components/Tinymce'

//const AttrValues = [];
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
    // components: {SingleUpload, MultiUpload, Tinymce},
    created(){
        //显示商品分类
        this.getProductCateList();
    },

    watch: {
        
        //商品id?????????????????
        productId:function (newValue) {
            if(!this.isEdit)return;
            if(this.hasEditCreated)return;
            if(newValue===undefined||newValue==null||newValue===0)return;
            this.handleEditCreated();
        }
    },

    data(){
        return{
            //AttrValue: AttrValues,
            AttrValues:[],
            //选中的多选框
            values:[],
            //选中的商品参数
            selectProductParam: [],
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

        getInputListArr(inputList) {
            return inputList.split(',');
        },

        //获取属性值并显示
        getProductAttrList() {
            fetchValueByKeyID(this.value.productAttributeCategoryId).then(response=>{
                let list=response.data;
                this.AttrValues=[];
                for (let i = 0; i < list.length; i++) {
                    this.AttrValues.push({
                        name:list[i].attrValue
                    });
                }
            });
        },

        //刷新列表
        handleRefreshProductSkuList() {
            this.$confirm('刷新列表将导致sku信息重新生成，是否要刷新', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.refreshProductAttrPics();
            this.refreshProductSkuList();
            });
        },

        //
        refreshProductAttrPics() {
            this.selectProductAttrPics = [];
            if (this.selectProductAttr.length >= 1) {
            let values = this.selectProductAttr[0].values;
            for (let i = 0; i < values.length; i++) {
                let pic=null;
                if(this.isEdit){
                //编辑状态下获取图片
                pic=this.getProductSkuPic(values[i]);
                }
                this.selectProductAttrPics.push({name: values[i], pic: pic})
            }
            }
        },

        //
        refreshProductSkuList() {
            this.value.skuStockList = [];
            let skuList = this.value.skuStockList;
            //只有一个属性时
            if (this.selectProductAttr.length === 1) {
            let values = this.selectProductAttr[0].values;
            for (let i = 0; i < values.length; i++) {
                skuList.push({
                sp1: values[i]
                });
            }
            } else if (this.selectProductAttr.length === 2) {
            let values0 = this.selectProductAttr[0].values;
            let values1 = this.selectProductAttr[1].values;
            for (let i = 0; i < values0.length; i++) {
                if (values1.length === 0) {
                skuList.push({
                    sp1: values0[i]
                });
                continue;
                }
                for (let j = 0; j < values1.length; j++) {
                skuList.push({
                    sp1: values0[i],
                    sp2: values1[j]
                });
                }
            }
            } else {
            let values0 = this.selectProductAttr[0].values;
            let values1 = this.selectProductAttr[1].values;
            let values2 = this.selectProductAttr[2].values;
            for (let i = 0; i < values0.length; i++) {
                if (values1.length === 0) {
                skuList.push({
                    sp1: values0[i]
                });
                continue;
                }
                for (let j = 0; j < values1.length; j++) {
                if (values2.length === 0) {
                    skuList.push({
                    sp1: values0[i],
                    sp2: values1[j]
                    });
                    continue;
                }
                for (let k = 0; k < values2.length; k++) {
                    skuList.push({
                    sp1: values0[i],
                    sp2: values1[j],
                    sp3: values2[k]
                    });
                }
                }
            }
            }
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
                    })
                    // .catch(function(e){
                    //     this.$message({
                    //     message: '406',
                    //     type: 'warning',
                    //     duration: 1000
                    //     });
                    //     return
                    // })
                }
            });
        },

        //根据商品id查看商品属性名称
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
        
        //监听的函数
        handleEditCreated() {
            //根据商品属性分类id获取属性和参数
            if(this.value.productAttributeCategoryId!=null){
                this.handleProductAttrChange(this.value.productAttributeCategoryId);
            }
            this.hasEditCreated=true;
        },

        //当属性值改变时的操作
        handleProductAttrChange(value){
            this.getProductAttrList(value);
            //this.getProductAttrList(value);
            //this.getProductAttrList(1, value);
        },

        //获取属性的值
        getEditParamValue(id){
            for(let i=0;i<this.value.productAttributeValueList.length;i++){
                if(id===this.value.productAttributeValueList[i].productAttributeId){
                    return this.value.productAttributeValueList[i].value;
                }
            }
        },

        

        //获取属性值并显示
        // getProductAttrList() {
        //     fetchValueByKeyID(this.value.productAttributeCategoryId).then(response => {
        //         let list = response.data;
        //         this.selectProductParam = [];
        //         for (let i = 0; i < list.length; i++) {
        //             let value=null;
        //             if(this.isEdit){
        //                 //编辑模式下获取参数属性
        //                 value= this.getEditParamValue(list[i].id);
        //             }
        //             this.selectProductParam.push({
        //                 id: list[i].id,
        //                 name: list[i].name,
        //                 value: value,
        //                 inputType: list[i].inputType,
        //                 inputList: list[i].inputList
        //             });
        //         }
        //     });
        // },

        

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

  .littleMarginLeft {
    margin-left: 10px;
  }

  .cardBg {
    background: #F8F9FC;
  }
</style>