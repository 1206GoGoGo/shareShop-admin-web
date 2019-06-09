<template> 
  <div class="app-container">
    <div class="table-layout">
      <el-row>
        <el-col :span="6" class="table-cell-title">商品编号</el-col>
        <el-col :span="18" class="table-cell-title">商品名称</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="table-cell">{{product.spu}}</el-col>
        <el-col :span="18" class="table-cell">{{product.productName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="table-cell-title">评分</el-col>
        <el-col :span="6" class="table-cell-title">销量</el-col>
        <el-col :span="6" class="table-cell-title">收藏数</el-col>
        <el-col :span="6" class="table-cell-title">加购物车数</el-col>
      </el-row>
      <el-row>
        <el-col :span="6" class="table-cell" style="font-size: 13px">{{product.score}}</el-col>
        <el-col :span="6" class="table-cell">{{product.sales}}</el-col>
        <el-col :span="6" class="table-cell">{{product.collect}}</el-col>
        <el-col :span="6" class="table-cell">{{product.cart}}</el-col>
      </el-row>
    </div>
    <el-card class="filter-container" shadow="never">
      <div>
        <el-form :inline="true" :model="listQuery" size="small" label-width="90px">
          <el-form-item label="用户评分：">
              <el-select v-model="listQuery.status" placeholder="All"  style="width:203px" clearable class="input-width">
              <el-option v-for="item in RateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="用户名称：">
            <el-input v-model="listQuery.userName" class="input-width" placeholder="用户名称"></el-input>
          </el-form-item>
          <el-button
            type="primary"
            @click="handleSearchList()"
            size="small">
            查询评价
        </el-button>
        </el-form>
      </div>
    </el-card>
    <div class="table-container">
      <el-table ref="productHistoryTable"  
            highlight-current-row
            :data="list"
            style="width: 100%; margin-top:20px;"
            v-loading="listLoading" border>
        <el-table-column label="用户名称" width="160" align="center">
          <template slot-scope="scope">{{scope.row.memberNickname}}</template>
        </el-table-column>
        <el-table-column label="用户评价" width="180" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="重复评价" width="140" align="center">
          <template slot-scope="scope">{{scope.row.Status | formatproductHistoryUseType}}</template>
        </el-table-column>
        <el-table-column label="评价时间" width="180" align="center">
          <template slot-scope="scope">{{scope.row.time | formatTime}}</template>
        </el-table-column>
        <el-table-column label="回复" align="center">
          <template slot-scope="scope">{{scope.row.orderNumber===null?'N/A':scope.row.orderNumber}}</template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                type="text"
                @click="handleView(scope.$index, scope.row)">查看</el-button>
            <el-button size="mini"
                type="text"
                @click="handleUpdate(scope.$index, scope.row)"></el-button>
            <el-button size="mini"
                type="text"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div> -->
  </div>
</template>
<script>
  import {formatDate} from '@/utils/date';
  import {getProductInfo} from '@/api/product';
  const defaultListQuery = {
    pageNum: 0,
    pageSize: 20,
    status: null,
    userName: null,
    productId: null
  };
  const defaultRateOptions= [
    {
      label: "五星好评",
      value: 0
    },
    {
      label: "差评",
      value: 1
    }
  ];
  export default {
    //name: 'productHistoryList',
    data() {
      return {
        product: { },
        listQuery: Object.assign({}, defaultListQuery),
        RateOptions:Object.assign({},defaultRateOptions),
        list:null,
        total:null,
        listLoading:false,
      }
    },
    created() {
      getProductInfo(this.$route.query.id).then(response => {
        this.product = response.data;
      });
      this.listQuery.productId=this.$route.query.id;
      this.getList();
    },
    filters: {
      formatDate(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'MM/dd/yyyy')
      },
      formatTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
    },
    methods: {
      // getList(){
      //   //this.listLoading=true;
      //   fetchListByProductId(this.listQuery.productId).then(response=>{
      //     this.listLoading=false;
      //     this.list=response.data;
      //   });
      // },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
        this.listQuery.productId=this.$route.query.id;
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      }
    }
  }
</script>
<style scoped>
  .app-container {
    width: 100%;
    margin: 0px auto;
  }

  .filter-container {
    margin-top: 20px;
  }

  .table-layout {
    /*margin-top: 20px;*/
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
  }

  .table-cell {
    height: 60px;
    line-height: 40px;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    font-size: 14px;
    color: #606266;
    text-align: center;
    overflow: hidden;
  }

  .table-cell-title {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
    /* background: #F2F6FC; */
    background:#f2f2f2;
    text-align: center;
    font-size: 14px;
    color: #303133;
  }
</style>


