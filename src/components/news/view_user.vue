<template> 
    <div style="margin-top: 15px;">
        <el-select v-model="search" style="width: 203px" @change="changesearch" placeholder="Please select">
            <el-option
                v-for="item in selectSearch"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-cascader
            v-if="flag1"
            label="商品分类"
            style="width:203px"
            placeholder="please selete"
            expand-trigger="click"
            clearable
            v-model="productCateValue"
            :options="productCateOptions"
            change-on-select>
        </el-cascader>
        <el-input v-if="flag2" style="width: 203px" v-model="productCate" clearable></el-input>
    </div>     
</template>

<script>
import {fetchListLevel,fetchListChildrenLevel,fetchList,createProductCate,getProductCate} from '@/api/productCate';
export default {
    data(){
        return {
            input3: '',
            select: '',
            productCateValue:null,
            productCateOptions:[],
            flag1:false,
            selectSearch:[
                {
                    label: "商品分类：",
                    value: 1
                },
                {
                    label: "分类名称：",
                    value: 2
                }
            ],

        }
    },
    methods:{
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
            });
        },
        changesearch(value)
        {
            if(value===1)
                {this.flag1=true;this.flag2=false; }
            if(value===2)
                {this.flag2=true;this.flag1=false; }

        },
    }
}
</script>
<style scoped>
    .el-select .el-input {
        width: 130px;
    }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>  