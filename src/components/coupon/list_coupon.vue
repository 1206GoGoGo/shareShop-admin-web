<template> 
  <div class="app-container">
    <!-- <el-card class="filter-container" shadow="never" style="background:#f2f2f2;">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="优惠券名称：">
            <el-input v-model="listQuery.name" class="input-width" placeholder="优惠券名称"></el-input>
          </el-form-item>
          <el-form-item label="优惠券类型：">
            <el-select v-model="listQuery.type" placeholder="全部" clearable class="input-width">
              <el-option v-for="item in typeOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card> -->
    <el-card shadow="never">
      <i class="el-icon-tickets"></i>
      <span>优惠券列表</span>
      <el-button size="mini" type="primary" style="float:right;"  @click="handleAdd()">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="couponTable"
                size="medium"
                highlight-current-row
                :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
                :data="list"
                style="width: 100%;"
                @selection-change="handleSelectionChange"
                v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="60" align="center">
          <template slot-scope="scope">{{scope.row.couponId}}</template>
        </el-table-column>
        <el-table-column label="优惠劵名称" width="130" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="优惠券类型" width="100" align="center">
          <template slot-scope="scope">{{scope.row.type | formatType}}</template>
        </el-table-column>
        <el-table-column label="可使用商品" width="100" align="center">
          <template slot-scope="scope">{{scope.row.useType | formatUseType}}</template>
        </el-table-column>
        <el-table-column label="使用门槛" width="140" align="center">
          <template slot-scope="scope">满{{scope.row.useCondition}}元可用</template>
        </el-table-column>
        <el-table-column label="发行量" width="80" align="center">
          <template slot-scope="scope">{{scope.row.amount}}</template>
        </el-table-column>
        <el-table-column label="剩余量" width="80" align="center">
          <template slot-scope="scope">{{scope.row.remainingQuantity}}</template>
        </el-table-column>
        <el-table-column label="面值" width="80" align="center">
          <template slot-scope="scope">{{scope.row.faceValue}}元</template>
        </el-table-column>
        <el-table-column label="图片" width="100" align="center">
          <template slot-scope="scope">{{scope.row.imageUrl | formatPlatform}}</template>
        </el-table-column>
        <el-table-column label="有效期" width="200" align="center">
          <template slot-scope="scope">{{scope.row.startTime|formatDate}}至{{scope.row.endTime|formatDate}}</template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
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
    <!-- <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageindex"
        :page-size="listQuery.pagesize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div> -->
    <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout=" prev, pager, next"
          :total="count">
        </el-pagination>
    </div>
  </div>
</template>
<script>
  import {fetchList,deleteCoupon} from '@/api/coupon';
  import {formatDate} from '@/utils/date';
  const defaultListQuery = {
    pageindex: 0,
    pagesize: 20,
    name: null,
    type: null
  };
  const defaultTypeOptions=[
    {
      label: '现金券',
      value: 0
    },
    {
      label: '满减券',
      value: 1
    },
    {
      label: '折扣券',
      value: 2
    },
    {
      label: '全场赠券',
      value: 3
    },
    {
      label: '会员赠券',
      value: 4
    },
    {
      label: '购物赠券',
      value: 5
    },
    {
      label: '注册赠券',
      value: 3
    }
  ];
  export default {
    name:'couponList',
    data() {
      return {
        listQuery:Object.assign({},defaultListQuery),
        typeOptions:Object.assign({},defaultTypeOptions),
        list:null,
        total:null,
        listLoading:false,
        multipleSelection:[]
      }
    },
    created(){
      this.getList();
    },
    filters:{
      formatType(type){
        for(let i=0;i<defaultTypeOptions.length;i++){
          if(type===defaultTypeOptions[i].value){
            return defaultTypeOptions[i].label;
          }
        }
        return '';
      },
      formatUseType(useType){
        if(useType===0){
          return '全场通用';
        }else if(useType===1){
          return '指定分类';
        }else{
          return '指定商品';
        }
      },
      formatDate(time){
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
      },
      formatStatus(endTime){
        let now = new Date().getTime();
        if(endTime>now){
          return '未过期'
        }else{
          return '已过期'
        }
      }
    },
    methods:{
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageindex = 0;
        this.listQuery.pagesize = 20;
        this.getList();
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.listQuery.pageindex = 0;
        this.listQuery.pagesize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageindex = val;
        this.getList();
      },
      handleAdd(){
        //this.$router.push({path: '/Coupon/info_Coupon'})  add_coupon , query: {id: row.id}
        this.$router.push({path: '/Coupon/add_coupon'})
      },
      handleView(index, row) {
        this.$router.push({path: '/Coupon/info_coupon', query: {id: row.couponId}})
      },
      handleUpdate(index, row) {
        this.$router.push({path: '/Coupon/update_coupon', query: {id: row.couponId}})
      },
      handleDelete(index, row) {
        this.$confirm('是否进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteCoupon(row.id).then(response=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getList();
          });
        })
      },
      getList(){
        this.listLoading=true;
        fetchList(this.listQuery).then(response=>{
          this.listLoading = false;
          this.list = response.data.indata;
          this.total = response.data.total;
        });
      }
    }
  }
</script>
<style scoped>
  .input-width {
    width: 203px;
  }
</style>


