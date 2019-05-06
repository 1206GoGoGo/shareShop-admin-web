<template>
    <el-card class="form-container" shadow="never">
        <div style="width: 900px">
            <el-form :model="value" inline-message :rules="rules" ref="productInfoForm" style="width: 700px" label-width="120px" size="small">
                <el-form-item label="商品分类：" prop="productCategoryId">
                    <el-cascader
                        v-model="selectProductCateValue"
                        expand-trigger="click"
                        clearable
                        :options="productCateOptions"
                        change-on-select>
                    </el-cascader>
                </el-form-item>
                <el-form-item label="商品名称：" prop="name">
                    <el-input class="input-width" v-model="value.name"></el-input>
                </el-form-item>
                <el-form-item label="商品编号：" prop="productSn">
                    <el-input class="input-width" v-model="value.productSn"></el-input>
                </el-form-item>
                <el-form-item label="价格区间：">
                    <el-input style="width:200px" v-model="value.minPrice" placeholder="只能为正数"></el-input> -
                    <el-input style="width:200px" v-model="value.maxPrice" placeholder="只能为正数"></el-input>
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
                <el-form-item label="生产日期：">
                    <el-date-picker
                        style="width:203px"
                        v-model="time"
                        type="date"
                        placeholder="Please select time"
                        align="right"
                        format="MM - dd - yyyy"
                        :picker-options="pickerOptions">
                    </el-date-picker>
                </el-form-item>
                <!-- <el-form-item label="商品图片：">
                    <el-input class="input-width" v-model="value.pic"></el-input>
                </el-form-item> -->
                <el-form-item label="商品图片：">
                    <el-upload
                        class="avatar-uploader"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="商品规格：">
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
                </el-form-item>
                <!-- <el-form-item label="商品关键字：">
                    <el-input v-model="value.keywords"></el-input>
                </el-form-item> -->
                <el-form-item label="商品描述：">
                    <el-input v-model="value.html" type="textarea" :autoSize="true"></el-input>
                </el-form-item>
                <el-form-item style="text-align: center">
                    <el-button
                        size="small"
                        type="primary"
                        style="margin-top: 20px;"
                        @click="handleRefreshProductSkuList">保存
                    </el-button>
                    <el-button
                        size="small"
                        type="primary"
                        style="margin-top: 20px;"
                        @click="handleSyncProductSkuPrice">取消
                    </el-button>
                 </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>

<script>
import {fetchListLevel,fetchListChildrenLevel} from '@/api/productCate'
const defaultValue = {
    name: null,
    productSn:null,
    minPrice:null,
    maxPrice:null,
    originalPrice:null,
    stock:null,
    discountRate:0,
    //keywords:null,
    //note:null,
    productionDate:null,
    pic:null,
    html:null,
  };
export default {
    created(){
        //显示商品分类
        this.getProductCateList();
    },
    data(){
        return{
            value: Object.assign({}, defaultValue),
            productCateOptions:[],
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
                // productCategoryId: [{required: true, message: '请选择商品分类', trigger: 'blur'}],
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

