<template>
    <el-card class="form-container" shadow="never">
        <div style="width: 900px">
            <el-form :model="value" inline-message :rules="rules" ref="productInfoForm" style="width: 700px" label-width="120px" size="small">
                <el-form-item label="商品分类：" prop="categoryId">
                    <el-cascader
                        @change="getAttribute"
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
                <!-- <el-form-item label="属性名称：">
                    <el-select v-model="value.productAttributeCategoryId" style="width: 203px" class="input-width" 
                    placeholder="All" clearable @change="handleProductAttrChange">
                        <el-option v-for="item in AttrNameOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item> getProductAttrList  @click="getProductAttrList()"-->
                <el-form-item label="商品规格：">
                    <el-card shadow="never" class="cardBg">
                        <div v-for="(item,idx) in AttrNameOptions" :key="idx">
                           <!-- <el-tag>  -->
                               <el-button
                                    type="text"
                                    v-model="value.productAttributeCategoryId">
                                    {{item.label}}:
                                </el-button>
                            <!-- </el-tag> -->
                            <div><!--values是选中的多选框-->
                                <el-checkbox-group v-model="values"><!--AttrValues[idx] idx是第几个属性里面的属性值，勿忘记！！！！-->
                                    <el-checkbox @change="showName" v-for="(item,key,index) in AttrValues[idx]" :key="index" :label="item.label" 
                                    class="littleMarginLeft">{{item.label}}</el-checkbox>
                                </el-checkbox-group>                            
                            </div>                                         
                        </div>  
                    </el-card>
                    <el-button type="primary" style="margin-top: 20px" 
                        @click="handleRefreshProductSkuList">刷新列表</el-button>
                    <el-button type="primary" style="margin-top: 20px"
                        @click="handleSyncProductSkuPrice">同步价格</el-button>
                    <el-table style="width: 100%;margin-top: 20px"
                            :data="value.skuStockList"
                            border>
                        <el-table-column
                            v-for="item in AttrNameOptions" :key="item.value"
                            :label="item.label" 
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
                            label="SKU编号"
                            align="center">
                            <template slot-scope="scope">
                            <el-input v-model="scope.row.skuCode"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            width="90"
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
import {fetchAttrByCategoryId,fetchValueByKeyID} from '@/api/productAttr'
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
            productAttributeCategoryId:null,
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

        //
        showName(value){
            if(value.checked==true)
            {
                
            }
        },

        getInputListArr(inputList) {
            return inputList.split(',');
        },
    
        //根据商品id查看商品属性名称
        getAttribute(){
            fetchAttrByCategoryId(this.selectProductCategeryId[this.selectProductCategeryId.length-1]).then(response=>{
                let list = response.data;
                //list.attributeValues=response.data.attributeValues;
                // alert(this.response.data.attributeValues.attrValue);
                this.AttrNameOptions=[];
                this.AttrValues =[];
                for (let i = 0; i < list.length; i++) {
                    this.AttrNameOptions.push({label: list[i].attrName, value: list[i].keyId});
                    //一个属性中多个属性值,使用循环
                    let AttrValue=[];
                    for (let j = 0; j < list[i].attributeValues.length; j++) {
                        AttrValue.push({label:list[i].attributeValues[j].attrValue,value:list[i].attributeValues[j].attrKeyId});
                    }
                    this.AttrValues.push(AttrValue);
                }
            })
        },

        //获取属性值并显示
        // getProductAttrList() {
        //     //this.value.productAttributeCategoryId 是一个商品属性key的id
        //     // alert(this.value.productAttributeCategoryId);
        //     fetchValueByKeyID(4).then(response=>{
        //         let list=response.data;
        //         this.AttrValues=[];
        //         for (let i = 0; i < list.length; i++) {
        //             this.AttrValues.push({
        //                 name:list[i].attrValue
        //             });
        //         }
        //     });
        // },

        //刷新列表
        handleRefreshProductSkuList() {
            this.$confirm('刷新列表将导致sku信息重新生成，是否要刷新', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                //显示图片信息
                //this.refreshProductAttrPics();
                //显示选择的属性信息
                this.refreshProductSkuList();
            });
        },

        //同步价格
        handleSyncProductSkuPrice(){

        },

        //
        refreshProductAttrPics() {
            
            this.selectProductAttrPics = [];
            if (this.AttrNameOptions.length >= 1) {
            let values = this.AttrNameOptions[0].value;
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

        getProductSkuSp(row, index) {
            if (index === 0) {
            return row.sp1;
            } else if (index === 1) {
            return row.sp2;
            } else {
            return row.sp3;
            }
        },

        //显示选择的表格(排列组合)   这里只有三种属性，限制！！！
        refreshProductSkuList() {
            //表格绑定的数据
            this.value.skuStockList = [];
            let skuList = this.value.skuStockList;
            //只有一个属性时（AttrNameOptions：属性的名称）
            if (this.AttrNameOptions.length === 1) {
                //let values = this.AttrNameOptions[0].value; //加s?
                //AttrValues：属性名称对应的值
                //alert(this.AttrValues);
                let values = this.AttrValues.label;
                for (let i = 0; i < values.length; i++) {
                    skuList.push({
                        sp1: values[i]
                    })
                }
            } else if (this.AttrNameOptions.length === 2) {
                //let values0 = this.AttrNameOptions[0].value;//加s?
                let values0 = this.AttrValues[0].label;
                //let values1 = this.AttrNameOptions[1].value;//加s?
                let values1 = this.AttrValues[1].label;
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
                let values0 = this.AttrValues[0].label;
                //let values0 = this.AttrNameOptions[0].value;
                let values1 = this.AttrValues[1].label;
                //let values1 = this.AttrNameOptions[1].value;
                let values2 = this.AttrValues[2].label;
                //let values2 = this.AttrNameOptions[2].value;
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

        
        
        //监听的函数
        handleEditCreated() {
            //根据商品属性分类id获取属性和参数
            if(this.value.productAttributeCategoryId!=null){
                this.handleProductAttrChange(this.value.productAttributeCategoryId);
            }
           // this.hasEditCreated=true;
        },

        //当属性值改变时的操作
        handleProductAttrChange(value){
            //this.getProductAttrList(value);
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
    /* width: 464px; */
    width:580px;
  }
</style>