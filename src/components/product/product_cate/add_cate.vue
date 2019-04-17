<template>
<!--添加商品分类 S----------------------------------------------------------------->
        <el-dialog                    
            title="添加商品分类"
            :before-close="handleClose"
            :center="true"

            :visible.sync="dialogAddCateVisible"  width="35%" height="100%">
            <el-form :model="AddProductCate" :inline="true" size="small"
                ref="AddProductCateForm" label-width="100px">
                <el-form-item label="所属分类：" >
                    <el-cascader
                        style="width:203px"
                        placeholder="please selete"
                        expand-trigger="click"
                        clearable
                        v-model="AddProductCate.parentId"
                        :options="productCateOptions"
                        change-on-select>
                    </el-cascader>
                </el-form-item>
                <el-form-item label="分类名称：">
                    <el-input v-model="AddProductCate.categoryName" style="width: 203px"></el-input>
                </el-form-item>
                <el-form-item label="是否显示：">
                <!-- <el-table-column label="是否显示" width="100" align="center"> -->
                    <template>
                        <el-switch
                            @change="handleShowStatusChange(scope.$index, scope.row)"
                            :active-value="1"
                            :inactive-value="0"
                            v-model="AddProductCate.categoryStatus">
                        </el-switch>
                    </template>
                <!-- </el-table-column>  -->
                </el-form-item>
                <!-- <el-form-item label="属性值：">
                    <el-input v-model="AddProductCate.attrValue" style="width: 203px"></el-input>
                    <el-button type="primary" size="mini" style="margin-left:10px;" @click="handleAddProductAttrValue()">添加</el-button>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogAddCateVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="handleAddProductCateConfirm" size="mini">保 存</el-button>
            </span>
        </el-dialog>
<!--添加商品属性名称 E--------------------------------------------------------->
</template>
<script>

//商品分类
const defaultAddProductCate = {
    //分类名称
    categoryName:null,
    //分类父分类id
    parentId:null,
    //本分级别
    categoryLevel:null,
    //是否显示在导航栏
    categoryStatus:null,
};

export default {
    data(){
        return{
            dialogAddCateVisible:false,
            AddProductCate: Object.assign({}, defaultAddProductCate),
            productCateOptions:[],
        }
    },
    methods:{
        //显示商品分类
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

        handleAddProductCateConfirm(){},

        //处理和父级的关系---------------------------------------------------------
        return_back(){
            //冒泡传递事件到上层组件，同步visible
            this.$emit("closeDialog","add");
        },
        handleClose(done) {
            var _this=this;
            this.$confirm('确认关闭？')
            .then(_ => {
                this.return_back();
                //done();
            })
            .catch(_ => {});
        },
        //----------------------------------------------------------------------

    },
}
</script>

<style scoped>

</style>

