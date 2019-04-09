<template>
    <!-- <div class="home-container"> -->
        <!-- <div>
            <svg-icon icon-class="Smoney" class="S-icon"></svg-icon>
            <span class="title-font">销售额-成本-支出统计</span>
        </div>
        <Mechart></Mechart> -->
        <!-- <div> -->
            <!-- <svg-icon icon-class="Smoney" class="S-icon"></svg-icon>
            <span class="title-font">商品分类统计</span> -->
            <div class="pro-form">
                <el-form :inline="true"  size="small" label-width="140px" ref="productCateFrom">
                    <el-form-item label="商品分类：">
                        <el-cascader
                            placeholder="please selete"
                            expand-trigger="click"
                            clearable
                            v-model="id"
                            :options="productCateOptions"
                            change-on-select>
                        </el-cascader>
                    </el-form-item>
                </el-form> 
            </div>
            <!-- <Mechart></Mechart> -->
        <!-- </div>
    </div> -->
</template>

<script>
// import Mechart from './components/Mechart'
// import {fetchListLevel,fetchListChildrenLevel} from '@/api/productCate'

export default{
    name:'productCate',
    
    created() {
      this.getProductCateList();
    },

    data(){
        return{
            productCateOptions:[],
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
        }
    },
}
</script>

<style scoped>
    /* .home-container{
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
    } */
    
</style>
