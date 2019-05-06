<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" ref="productInfoForm" style="width: 600px" label-width="120px" size="small">
      <!-- prop="productCategoryId" -->
      <el-form-item label="商品分类：" prop="productCategoryId">
        <el-cascader
          v-model="selectProductCateValue"
          expand-trigger="click"
          clearable
          :options="productCateOptions"
          change-on-select>
        </el-cascader>
      </el-form-item>
      <el-form-item label="商品名称：" style="margin-bottom:18px" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="商品编号：" style="margin-bottom:18px" prop="productSn">
        <el-input v-model="value.productSn"></el-input>
      </el-form-item>
      <el-form-item label="商品售价：">
        <el-input v-model="value.price"></el-input>
      </el-form-item>
      <el-form-item label="商品原价：">
        <el-input v-model="value.originalPrice"></el-input>
      </el-form-item>
      <el-form-item label="商品数量：">
        <el-input v-model="value.stock"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {fetchListLevel,fetchListChildrenLevel} from '@/api/productCate'
  const defaultValue = {
    name: null,
    productSn:null,
    price:null,
    originalPrice:null,
    stock:null
  };
export default {
    name: "product_detail",
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    created(){
      if(this.isEdit){
        getProduct(this.$route.query.id).then(response=>{
          this.productParam=response.data;
        });
      }
    },

    data() {
      return {
        value: Object.assign({}, defaultValue),
        hasEditCreated:false,
        CateId:null,
        //选中商品分类的值
        selectProductCateValue: [],
        productCateOptions: [],
        brandOptions: [],
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
      };
    },
    created() {
      this.getProductCateList();
      //this.getBrandList();
    },
    computed:{
      //商品的编号
      productId(){
        return this.value.id;
      }
    },
    watch: {
    //   productId:function(newValue){
    //     if(!this.isEdit)return;
    //     if(this.hasEditCreated)return;
    //     if(newValue===undefined||newValue==null||newValue===0)return;
    //     this.handleEditCreated();
    //   },

      CateId (newValue) {
          if (newValue != null && newValue.length == 2) {
              this.CateId = newValue[1];
          } else {
              this.CateId = 0;
          }
      },
      selectProductCateValue: function (newValue) {
        if (newValue != null && newValue.length === 2) {
          this.value.productCategoryId = newValue[1];
          this.value.productCategoryName= this.getCateNameById(this.value.productCategoryId);
        } else {
          this.value.productCategoryId = '';
          this.value.productCategoryName='';
        }
      }
    },
    methods: {
      //处理编辑逻辑
    //   handleEditCreated(){
    //     if(this.value.productCategoryId!=null){
    //       this.selectProductCateValue.push(this.value.cateParentId);
    //       this.selectProductCateValue.push(this.value.productCategoryId);
    //     }
    //     this.hasEditCreated=true;
    //   },

    // getProductCateList() {
    //   fetchListWithChildren().then(response => {
    //     let list = response.data;
    //     this.productCateOptions = [];
    //     for (let i = 0; i < list.length; i++) {
    //       let children = [];
    //       if (list[i].children != null && list[i].children.length > 0) {
    //         for (let j = 0; j < list[i].children.length; j++) {
    //           children.push({label: list[i].children[j].name, value: list[i].children[j].id});
    //         }
    //       }
    //       this.productCateOptions.push({label: list[i].name, value: list[i].id, children: children});
    //     }
    //   });
    // },

    //显示商品分类 完整版
    // getProductCateList()
    // {
    //   fetchListLevel().then(response => {                
    //       let list = response.data;
    //       for (let i = 0; i < list.length; i++) {
    //           //不管有没有子级别先列出来
    //           this.productCateOptions.push({label: list[i].categoryName, value: list[i].categoryId});
    //           fetchListChildrenLevel(list[i].categoryId).then(response => {
    //               //注意级联！！！
    //               list[i].children = response.data;
    //               let children = [];
    //               if (list[i].children != null && list[i].children.length > 0) {
    //                   for (let j = 0; j < list[i].children.length; j++) {
    //                       children.push({label: list[i].children[j].categoryName, value: list[i].children[j].categoryId});
    //                   }
    //                   let currentName=list[i].categoryName;
    //                   //比较:如果有分类名称相同的,删除上面的父分类
    //                   for(let k=0; k<list.length; k++)
    //                   {
    //                       if(list[k].categoryName==currentName)
    //                       this.productCateOptions.splice(k,1);
    //                   }
    //                   //最后添加有子分类的全部项
    //                   this.productCateOptions.unshift({label: list[i].categoryName, value: list[i].categoryId, children: children});
    //               }
    //           }) 
    //       }
    //   });
    // },

    // getProductCateList1()
    // {
    //   fetchListLevel().then(response => {                
    //       let list = response.data;
    //       for (let i = 0; i < list.length; i++) {
    //           //不管有没有子级别先列出来
    //           this.productCateOptions.push({label: list[i].categoryName, value: list[i].categoryId});
    //           fetchListChildrenLevel(list[i].categoryId).then(response => {
    //               //注意级联！！！
    //               list[i].children = response.data;
    //               let children = [];
    //               if (list[i].children != null && list[i].children.length > 0) {
    //                   for (let j = 0; j < list[i].children.length; j++) {
    //                       children.push({label: list[i].children[j].categoryName, value: list[i].children[j].categoryId});
    //                   }
    //                   let currentName=list[i].categoryName;
    //                   //比较:如果有分类名称相同的,删除上面的父分类
    //                   for(let k=0; k<list.length; k++)
    //                   {
    //                       if(list[k].categoryName==currentName)
    //                       this.productCateOptions.splice(k,1);
    //                   }
    //                   //最后添加有子分类的全部项
    //                   this.productCateOptions.unshift({label: list[i].categoryName, value: list[i].categoryId, children: children});
    //               }
    //           }) 
    //       }
    //   });
    // },
    
    getProductCateList() {
        fetchListLevel().then(response => {
          let list1 = response.data;
          this.productCateOptions = [];
          for (let i = 0; i < list1.length; i++) {
            fetchListChildrenLevel(list1[i].categoryId).then(response => {
              let list2 = response.data;
              let children = [];
              if (list2 != null && list2.length > 0) {
                for (let j = 0; j < list2.length; j++) {
                  children.push({label: list2[j].categoryName, value: list2[j].categoryId});
                }
              }
              this.productCateOptions.push({label: list1[i].categoryName, value: list1[i].categoryId, children: children});
            }).catch(function(error){
              console.log(error);
              //alert(error);
            })
          }
        });
      },


    // getBrandList() {
    // fetchBrandList({pageNum: 1, pageSize: 100}).then(response => {
    //     this.brandOptions = [];
    //     let brandList = response.data.list;
    //     for (let i = 0; i < brandList.length; i++) {
    //     this.brandOptions.push({label: brandList[i].name, value: brandList[i].id});
    //     }
    // });
    // },

    //根据id得到商品名称
    getCateNameById(id){
      let name=null;
      for(let i=0;i<this.productCateOptions.length;i++){
        for(let j=0;i<this.productCateOptions[i].children.length;j++){
          if(this.productCateOptions[i].children[j].value===id){
            name=this.productCateOptions[i].children[j].label;
            return name;
          }
        }
      }
      return name;
    },

    //
    handleNext(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('nextStep');
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration:1000
          });
          return false;
        }
      });
    },
    
    // handleBrandChange(val) {
    // let brandName = '';
    // for (let i = 0; i < this.brandOptions.length; i++) {
    //     if (this.brandOptions[i].value === val) {
    //     brandName = this.brandOptions[i].label;
    //     break;
    //     }
    // }
    // this.value.brandName = brandName;
    // },
    }
  }
</script>

<style scoped>
</style>
