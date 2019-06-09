<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never" style="background:#f2f2f2;">
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="120px">
          <el-form-item label="商品名称：">
            <el-input  v-model="listQuery.productName" style="width: 203px" placeholder="All"></el-input>
          </el-form-item>
          <el-form-item label="商品编号：">
            <el-input v-model="listQuery.spu" style="width: 203px"  placeholder="All"></el-input>
          </el-form-item>
          <!-- <el-form-item label="商品品牌：">
            <el-select v-model="listQuery.brandId" placeholder="请选择品牌" clearable>
              <el-option
                v-for="item in brandOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="上架状态：">
            <el-select v-model="listQuery.publishStatus" style="width:203px" placeholder="All" clearable>
              <el-option
                v-for="item in publishStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="审核状态：">
            <el-select v-model="listQuery.auditStatus" style="width:203px" placeholder="全部" clearable>
              <el-option
                v-for="item in verifyStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="商品分类：">
              <el-cascader
                  style="width:203px"
                  placeholder="All"
                  expand-trigger="click"
                  clearable
                  v-model="listQuery.id"
                  :options="productCateOptions"
                  :show-all-levels="false">
              </el-cascader>
          </el-form-item>
          <el-button
          style="float:right;margin-right: 10px"
          @click="handleAddProduct()"
          size="small"
          type="primary">
          添加
        </el-button>
        <el-button
          style="float: right;margin-right: 10px"
          @click="handleResetSearch()"
          type="primary"
          size="small">
          重置
        </el-button>
        <el-button
          style="float: right;margin-right: 10px"
          @click="handleSearchList()"
          type="primary"
          size="small">
          查询
        </el-button>
        </el-form>
      </div>
    </el-card>
    <!-- @selection-change="handleSelectionChange" -->
    <div class="table-container">
      <el-table ref="productTable"
          highlight-current-row
          :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
          :data="list"
          
          v-loading="listLoading"
          border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column type="index" label="编号" width="60" align="center"></el-table-column>
        <el-table-column label="商品编号" width="140" align="center">
          <template slot-scope="scope">{{scope.row.spu}}</template>
        </el-table-column>
        <el-table-column label="商品名称" width="200" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.productName}}</p>
            <!-- <p>品牌：{{scope.row.brandName}}</p> -->
          </template>
        </el-table-column>
        <el-table-column label="商品图片" width="200" align="center">
          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.mainImage"></template>
        </el-table-column>
        <el-table-column label="标签" width="180" align="center">
          <template slot-scope="scope">
            <div>
              <span style="float:left; width:90px;">上架：</span>
              <el-switch
                @change="handlePublishStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.publishStatus">
              </el-switch>
            </div>
            <div>
              <span style="float:left; width:90px;">推荐：</span>
              <el-switch
                @change="handleRecommendStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.recommandStatus">
              </el-switch>
            </div>
            <div>
              <span style="float:left; width:90px;">可用优惠券：</span>
              <el-switch
                @change="handleNewStatusChange(scope.$index, scope.row)"
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.newStatus">
              </el-switch>
            </div>
            <!-- </p> -->
          </template>
        </el-table-column>
        <!-- <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column> -->
        <el-table-column label="SKU库存" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="handleShowSkuEditDialog(scope.$index, scope.row)" circle></el-button>
          </template>
        </el-table-column>
        <el-table-column label="折扣比率" sortable width="140" align="center">
          <template slot-scope="scope">{{scope.row.discountRate}}%</template>
        </el-table-column>
        <el-table-column label="商品评分" sortable width="140" align="center">
          <template slot-scope="scope">{{scope.row.score}}</template>
        </el-table-column>
        <el-table-column label="商品库存" sortable width="140" align="center">
          <template slot-scope="scope">{{scope.row.stock}}</template>
        </el-table-column>
        <!--销量、被收藏次数、加购物车次数、需要统计出来！！！！！！！！！！！！！！！！！！！！！！-->
        <!-- <el-table-column label="销量" sortable width="100" align="center">
          <template slot-scope="scope">{{scope.row.sale}}</template>
        </el-table-column>
        <el-table-column label="被收藏次数" sortable width="120" align="center">
          <template slot-scope="scope">{{scope.row.sale}}</template>
        </el-table-column>
        <el-table-column label="加购物车次数" sortable width="130" align="center">
          <template slot-scope="scope">{{scope.row.sale}}</template>
        </el-table-column> -->
        <!-- <el-table-column label="审核状态" width="100" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.auditStatus}}</p>
            <p>{{scope.row.auditStatus | auditStatusFilter}}</p>
            <p>
              <el-button
                type="text"
                @click="handleShowVerifyDetail(scope.$index, scope.row)">审核详情
              </el-button>
            </p>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                type="text"
                @click="handleView(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini"
                type="text"
                @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small">
        确定
      </el-button>
    </div>
    <!-- <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div> -->
    <el-dialog
      title="编辑货品信息"
      :visible.sync="editSkuInfo.dialogVisible"
      width="70%">
      <span>商品货号：</span>
      <span>{{editSkuInfo.productSn}}</span>
      <el-input placeholder="按sku编号搜索" v-model="editSkuInfo.keyword" size="small" style="width: 50%;margin-left: 20px">
        <el-button slot="append" icon="el-icon-search" @click="handleSearchEditSku"></el-button>
      </el-input>
      <el-table style="width: 100%;margin-top: 20px"
                :data="editSkuInfo.stockList"
                border>
        <el-table-column
          label="SKU编号"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.skuCode"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item,index) in editSkuInfo.productAttr"
          :label="item.name"
          :key="item.id"
          align="center">
          <template slot-scope="scope">
            {{getProductSkuSp(scope.row,index)}}
          </template>
        </el-table-column>
        <el-table-column
          label="销售价格"
          width="80"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="商品库存"
          width="80"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stock"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="库存预警值"
          width="100"
          align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.lowStock"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editSkuInfo.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditSkuConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {fetchListLevel,fetchListChildrenLevel} from '@/api/productCate'
import {fetchList} from '@/api/product'

const defaultListQuery = {
    // keyword: null,
    pageNum: 0,
    pageSize: 20,
    productName:null, //商品名称
    publishStatus: null,  //上下架状态
    auditStatus: null,  //审核状态
    spu: null,  //商品编号
    discountRate:null,//折扣
    stock:null, //库存
    score:null,
    // sale:null,
    // pic:null,
    // price:null,
    // productCategoryId: null,
    // brandId: null
  };

export default {
    data(){
      return{
        editSkuInfo:{
          dialogVisible:false,
          productId:null,
          productSn:'',
          productAttributeCategoryId:null,
          stockList:[],
          productAttr:[],
          keyword:null
        },
        productCateOptions:[],
        listQuery: Object.assign({}, defaultListQuery),
        operateType:null,
        publishStatusOptions:[
          {
            label:"上架",
            value:0
          },
          {
            label:"下架",
            value:1
          }
        ],
        verifyStatusOptions:[
        {
          label:"已通过",
          value:0
        },
        {
          label:"未通过",
          value:1
        }
        ],
        operates:[
          {
            label:'全选',
            value:0
          },
          {
            label:'全部更改',
            value:1
          }
        ],
        list: [
          {
            productName:'帽子',
            publishStatus:'上架',
            auditStatus:'审核',
            productCode:'1212324',
            pic:'无',
            price:'123',
            sale:1232,
            productSn:212322
          }
        ],
        // total: null,
        listLoading: false,
        selectProductCateValue: null,
      }
    },
    
    created(){
      //获取商品信息
      this.getProductList();
      //获取商品分类
      this.getProductCateList();
    },

    watch: {
      selectProductCateValue: function (newValue) {
        if (newValue != null && newValue.length == 2) {
          this.listQuery.productCategoryId = newValue[1];
        } else {
          this.listQuery.productCategoryId = null;
        }

      }
    },
    methods:{
      //重置
      handleResetSearch() {
        this.selectProductCateValue = [];
        this.listQuery = Object.assign({}, defaultListQuery);
      },

      //查看商品信息
      getProductList()
      {
        fetchList(this.listQuery).then(response=>{
            this.list=response.data.indata;
        })
      },

      //查看详情
      handleView(index,row){
        this.$router.push({path:'/product/product_list/product_info',query: {id: row.productId}});
      },

      //显示商品分类 完整版
      getProductCateList()
      {
          fetchListLevel().then(response => {                
              let list = response.data;
              for (let i = 0; i < list.length; i++) {
                  //不管有没有子级别先列出来
                  this.productCateOptions.push({label: list[i].categoryName, value: list[i].categoryId});
                  fetchListChildrenLevel(list[i].categoryId).then(response => {
                      //注意级联！！！
                      list[i].children = response.data;
                      let children = [];
                      if (list[i].children != null && list[i].children.length > 0) {
                          for (let j = 0; j < list[i].children.length; j++) 
                          {
                              children.push({label: list[i].children[j].categoryName, value: list[i].children[j].categoryId});
                          }  
                      }
                      let currentName=list[i].categoryName;
                      //比较:如果有分类名称相同的,删除上面的父分类
                      for(let k= 0; k < list.length; k++)
                      {
                          if(list[k].categoryName==currentName)
                          this.productCateOptions.splice(k,1);
                      }
                      //最后添加有子分类的全部项
                      this.productCateOptions.unshift({label: list[i].categoryName, value: list[i].categoryId, children: children});   
                  })
                  
                  
              }
          });
      },

      handleAddProduct(){
        this.$router.push({path: '/product/add_product'})
      },
      
      //
      handleShowSkuEditDialog(index,row){
        this.editSkuInfo.dialogVisible=true;
        this.editSkuInfo.productId=row.id;
        this.editSkuInfo.productSn=row.productSn;
        this.editSkuInfo.productAttributeCategoryId = row.productAttributeCategoryId;
        this.editSkuInfo.keyword=null;
        fetchSkuStockList(row.id,{keyword:this.editSkuInfo.keyword}).then(response=>{
          this.editSkuInfo.stockList=response.data;
        });
        fetchProductAttrList(row.productAttributeCategoryId,{type:0}).then(response=>{
          this.editSkuInfo.productAttr=response.data.list;
        });
      },
    },
}
</script>

<style scoped>

</style>


