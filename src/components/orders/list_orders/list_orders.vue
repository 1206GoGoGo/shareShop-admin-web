<template> 
<!--修改订单查询菜单-->
  <div class="app-container">
    <el-card shadow="never" style="background:#f2f2f2;">
        <div>
          <el-form :inline="true" :model="listQuery" size="small" label-width="90px">
            <el-form-item label="订单编号：">
                <el-input v-model="listQuery.orderNumber" style="width: 183px" class="input-width" placeholder="Order Number" clearable></el-input>
            </el-form-item>
            <el-form-item label="用户名称：">
                <el-input v-model="listQuery.username" style="width: 183px" class="input-width" placeholder="Login Name" clearable></el-input>
            </el-form-item>
            <el-form-item label="收货人：">
                <el-input v-model="listQuery.consignee" style="width: 183px" class="input-width" placeholder="consignee Name" clearable></el-input>
            </el-form-item>
            <el-form-item label="订单状态：">
                <el-select v-model="listQuery.status" style="width: 183px" class="input-width" placeholder="All" clearable>
                    <el-option v-for="item in statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="查询时间：">
              <el-date-picker
                  style="width:163px"
                  v-model="listQuery.timeBe"
                  type="date"
                  placeholder="Please select time"
                  align="right"
                  format="MM - dd - yyyy"
                  :picker-options="pickerOptions1">
              </el-date-picker>
              -
              <el-date-picker
                  v-model="listQuery.timeEn"
                  style="width:163px"
                  type="date"
                  placeholder="Please select time"
                  align="right"
                  format="MM - dd - yyyy"
                  :picker-options="pickerOptions1">
              </el-date-picker>
              <el-button
                  style="float:right;margin-left:10px"
                  type="primary"
                  @click="handleSearchList()"
                  size="small">
                  查询
                  </el-button>
                  <el-button
                  style="float:right;margin-left:10px"
                  @click="handleResetSearch()"
                  size="small">
                  重置
              </el-button>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <!-- show-overflow-tooltip 当内容过长被隐藏时显示 tooltip!!!!!!!!!!!!!!!!!!!!!!!!!height="250"-->
    <!--调整排序！！！！！！！！！！！！！！！！！！！！！-->
    <div class="table-container">
      <el-table ref="orderTable"    
          highlight-current-row
          :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
          show-overflow-tooltip
          :default-sort = "{prop: 'scope.row.createTime', order: 'descending'}"

          :data="list"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
          v-loading="listLoading"
          border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="80" type="index" align="center">
          <!-- <template slot-scope="scope">{{scope.row.orderId}}</template> -->
        </el-table-column>
        <el-table-column label="订单号" width="180" align="center">
          <template slot-scope="scope">{{scope.row.orderNumber}}</template>
        </el-table-column>
        <el-table-column label="下单时间" sortable width="180" align="center">
          <template slot-scope="scope">{{scope.row.createTime | dateFormatter}}</template>
        </el-table-column>
        <el-table-column label="收货人" width="130" align="center">
          <template slot-scope="scope">{{scope.row.consigneeName}}</template>
        </el-table-column>
        <el-table-column label="支付金额" width="120" align="center">
          <template slot-scope="scope">${{scope.row.paymentMoney}}</template>
        </el-table-column>
        <el-table-column label="支付方式" width="120" align="center">
          <template slot-scope="scope">{{scope.row.paymentMode | typeFormatter}}</template>
        </el-table-column>
        <el-table-column label="订单状态" width="200" align="center">
          <template slot-scope="scope">{{scope.row.orderStatus | statusFormatter}}</template>
        </el-table-column>
        <el-table-column  label="操作" width="220" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleViewOrder(scope.$index, scope.row)"
            >查看订单</el-button><!--1、待付款 bu 、2、付款失败(删除)、3、待发货（订单发货）、4、已发货、5、已完成、6、已关闭、7、退货中、8、退款中-->
            <el-button
              size="mini"
              @click="handleDeliveryOrder(scope.$index, scope.row)"
              v-show="scope.row.orderStatus===3">订单发货</el-button><!--待发货、已发货、已完成、已关闭-->
            <el-button
              size="mini"
              @click="handleViewLogistics(scope.$index, scope.row)"  
              v-show="scope.row.orderStatus===4">订单跟踪</el-button><!--已发货、已完成-->
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteOrder(scope.$index, scope.row)"
              v-show="scope.row.orderStatus===2||scope.row.orderStatus===5||scope.row.orderStatus===6">删除订单</el-button><!--已完成-->
            <el-button
              size="mini"
              @click="handleDeliveryOrder(scope.$index, scope.row)"
              v-show="scope.row.orderStatus===7||scope.row.orderStatus===8">订单发货</el-button><!--待发货、已发货、已完成、已关闭-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="batch-operate-container">
      <el-select
        size="small"
        v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operateOptions"
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
    </div> -->
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
    <div class="Pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="20"
            layout="total, prev, pager, next"
            :total="count">
        </el-pagination>
    </div>
   <!-- <el-dialog
      title="关闭订单"
      :visible.sync="closeOrder.dialogVisible" width="30%">
      <span style="vertical-align: top">操作备注：</span>
      <el-input
        style="width: 80%"
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="closeOrder.content">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeOrder.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCloseOrderConfirm">确 定</el-button>
      </span>
    </el-dialog> -->
    <!-- <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog> -->

  </div> 
</template>
<script>
import {fetchProductList,fetchListByorderNo,fetchListByproductId,fetchListByuserName,fetchListByStatus} from '@/api/orders'
import {formatDate} from '@/utils/date'
const defaultListQuery = {
    pageindex: 0,
    pagesize: 20,
    status:0,
    orderNumber: null,
    username:null,
    consignee:null,
    timeBe:"2019-02-01",
    timeEn:"2019-05-10",
  };
export default {
    created() {
        this.getList();
    },

    data(){
        return{
          listQuery: Object.assign({}, defaultListQuery),
          closeOrder:[
            {
              dialogVisible:false,
              content:null,
            }
          ],
          //改为true
          listLoading: false,
          list: [],
          total: null,
          operateType:null,
          //分页
          currentPage: 1,
          offset: 0,
          limit: 20,
          count: 0,

          statusOptions:[
            {
              label:'All',//待付款
              value:0,
            },
            {
              label:'Pending payment',//待付款
              value:1,
            },
            {
              label:'Payment Fail',//付款失败（只有超时才会导致付款失败？）
              value:2,            
            },
            {
              label:'To be shipped',//待发货
              value:3,
            },
            {
              label:'Shipped',//已发货
              value:4,
            },
            {
              label:'Completed',//已完成
              value:5,
            },
            {
              label:'Closed',//已关闭
              value:6,
            },
            {
              label:'Returning',//退货中
              value:7,
            },
            {
              label:'refunding',//退款中
              value:8,
            }
          ],
          operateOptions:[
            {
              label:'关闭订单',
              value:'0',
            },
            {
              label:'删除订单',
              value:'1',
            },
          ],
          pickerOptions1: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = moment().subtract(1, 'days').format('MM-DD-YYYY 00:00:00');
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '7天前',
                    onClick(picker) {
                        const date = moment().subtract(7, 'days').format('MM-DD-YYYY 00:00:00');
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '30天前',
                    onClick(picker) {
                        const date = moment().subtract(30, 'days').format('MM-DD-YYYY 00:00:00');
                        picker.$emit('pick', date);
                    }
                }]
            },
          // pickerOptions2: {
          // shortcuts: [{
          //     text: '最近一周',
          //     onClick(picker) {
          //     const end = new Date();
          //     const start = new Date();
          //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          //     picker.$emit('pick', [start, end]);
          //     }
          //     }, {
          //     text: '最近一个月',
          //     onClick(picker) {
          //     const end = new Date();
          //     const start = new Date();
          //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          //     picker.$emit('pick', [start, end]);
          //     }
          //     }, {
          //     text: '最近三个月',
          //     onClick(picker) {
          //     const end = new Date();
          //     const start = new Date();
          //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          //     picker.$emit('pick', [start, end]);
          //     }
          // }]
          // },
          // selectTime:'',
        }
    },

    //过滤器 格式化
    filters: {
        //日期转变
        dateFormatter(time) {
            let date = new Date(time);
            return formatDate(date, 'MM.dd.yyyy hh:mm:ss')
        },
        //支付方式格式
        typeFormatter(value){
            if(value === 0){return '支付宝'} 
            else if(value === 1){return '微信'}
            else {return 'Not claer'}
        },
        //状态转变
        statusFormatter(value)
        {
            if(value===0){return 'All'} //待付款
            else if(value===1){return 'Pending payment'} //待付款
            else if(value===2){return 'Payment Fail'} //付款失败
            else if(value===3){return 'To be shipped'} //待发货
            else if(value===4){return 'Shipped'}  //已收货
            else if(value===5){return 'Completed'}  //已完成
            else if(value===6){return 'Closed'}  //已关闭
            else if(value===7){return 'Returning'}  //退货中
            else if(value===8){return 'refunding'}  //退款中
            else {return 'Not claer'}
        },
        // defaultFormatter(value)
        // {
        //     if(value === "0"){return 'Default'} 
        //     else if(value === "1"){return 'Undefault'}
        //     else {return 'Not claer'}
        // },
    },

    methods:{
      getList(){
        fetchProductList(this.listQuery).then(response => {
            this.listLoading = false;
            this.list = response.data;
            // this.total = response.data.total;
          });
      },

      //获取搜索结果
      handleSearchList(){
          this.getList();
      },

      //重置
      handleResetSearch(){
        this.listQuery = Object.assign({}, defaultListQuery);
      },

      //查看订单
      handleViewOrder(index,row){
        this.$router.push({path:'/orders/detail_orders', query: {id: row.orderId}});
      },

      handleBatchOperate(){},

      handleCloseOrder(index,row){
        this.closeOrder.dialogVisible=true;

      },

      handleSizeChange(val){
        console.log(`每页 ${val} 条`);
      },
        
      handleCurrentChange(val){
          this.currentPage = val;
          this.offset = (val - 1)*this.limit;
          // this.getList()
      },

      handleSelectionChange(){},
      handleDeleteOrder(){},
      handleViewLogistics(){},
      handleDeliveryOrder(){},
      handleCloseOrderConfirm(){},
    }
}
</script>

<style scoped>
  .pagination-container{
    float:right;
  }
  .batch-operate-container{
    display: inline-block;
  }
  
</style>
