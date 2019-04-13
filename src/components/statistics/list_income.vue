<template>
    <div class="home-container">
        <div>
            <svg-icon icon-class="Smoney" class="S-icon"></svg-icon>
            <span class="title-font">一年内商城总的销售额-成本-支出统计</span>
        </div>
        <Mechart></Mechart>
        <div>
            <svg-icon icon-class="Smoney" class="S-icon"></svg-icon>
            <span class="title-font">一年内商城的商品分类统计</span>
            <div class="pro-form">
                <!-- :model="productCate" -->
                <el-form :inline="true"  size="small" label-width="140px" ref="productCateFrom">
                    <el-form-item label="商品分类：">
                        <el-cascader
                            placeholder="please selete"
                            expand-trigger="click"
                            clearable
                            v-model="CateId"
                            :options="productCateOptions"
                            change-on-select>
                        </el-cascader>
                    </el-form-item>
                    <el-button
                        style="float:right; margin-right:450px"
                        type="primary"
                        @click="handleSearchList()"
                        size="small">
                        查询
                    </el-button>
                </el-form> 
            </div>
            <!-- <productCate></productCate> -->
            <Mechart></Mechart>
        </div>
    </div>
</template>

<script>
//统计用户的销售额、成本、支出（税率）
import Mechart from './components/Mechart'
// import productCate from '@/components/Common/productCate'
import {fetchListLevel,fetchListChildrenLevel} from '@/api/productCate'
import {fetchListBycategoryId} from '@/api/statistics'

// const defaultproductCate = {
//     CateId:null,
//   };
export default{
    name:'income',
    components:{
        Mechart,
        // productCate
    },

    created() {
      //this.getList();
      this.getProductCateList();
    },

    watch: {
        CateId (newValue) {
            if (newValue != null && newValue.length == 2) {
                this.CateId = newValue[1];
            } else {
                this.CateId = 0;
            }
        }
    },

    data(){
        return{
            productCateOptions:[],
            CateId:null,
            //productCate: Object.assign({}, defaultproductCate),
            // productCate:[
            //     {
            //         CateId:null,
            //     }
            // ],
        }
    },
    methods:{
        //获得商品分类
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

        //获取搜索结果
        handleSearchList(){
            //根据用户登录名查询订单详情
            fetchListBycategoryId(this.CateId).then(response => {
                //这里写的有问题！！！！！！！！！！！！
                var list= response.data;
            });
        },
    },
}
</script>

<style scoped>
    .home-container{
        padding: 32px;
        background-color: #f2f2f2;
    }
    .title-font{
        font-size: 18px;
    }
    .S-icon{
        font-size: 25px;
        padding:1px 0px 0px 0px;
    }
    .pro-form{
        padding: 20px 0px 5px;
    }
    
</style>
