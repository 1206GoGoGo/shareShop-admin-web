<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never" style="background:#f2f2f2;">
        <div>
            <i class="el-icon-search"></i>
            <span>条件查询</span>
            <el-button
            style="float:right"
            type="primary"
            @click="handleSearchList()"
            size="small">
            查询
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
            <el-form-item label="订单号：">
                <el-input v-model="listQuery.orderNumber" style="width: 203px" class="input-width" placeholder="订单编号"></el-input>
            </el-form-item>
            <el-form-item label="收货人：">
                <el-input v-model="listQuery.consigneeName" style="width: 203px" class="input-width" placeholder="收货人姓名/手机号码"></el-input>
            </el-form-item>
            <el-form-item label="订单状态：">
                <el-select v-model="listQuery.orderStatus" style="width: 203px" class="input-width" placeholder="全部" clearable>
                    <el-option v-for="item in statusOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="查询时间：">
                <el-date-picker
                  style="width: 363px"
                  v-model="listQuery.selectTime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
          </el-form>
        </div>
    </el-card>
    <!-- show-overflow-tooltip 当内容过长被隐藏时显示 tooltip!!!!!!!!!!!!!!!!!!!!!!!!!height="250"-->
    <div class="table-container">
      <el-table ref="orderTable"    
          highlight-current-row
          show-overflow-tooltip
          
          :data="list"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
          v-loading="listLoading" border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.orderId}}</template>
        </el-table-column>
        <el-table-column label="用户姓名" width="130" align="center">
          <template slot-scope="scope">{{scope.row.consigneeName}}</template>
        </el-table-column>
        <el-table-column label="订单号" width="180" align="center">
          <template slot-scope="scope">{{scope.row.orderNumber}}</template>
        </el-table-column>
        <el-table-column label="订单金额" width="120" align="center">
          <template slot-scope="scope">￥{{scope.row.paymentMoney}}</template>
        </el-table-column>
        <el-table-column label="提交时间" width="180" align="center">
          <template slot-scope="scope">{{scope.row.createTime | dateFormatter}}</template>
        </el-table-column>
        <el-table-column label="支付方式" width="120" align="center">
          <template slot-scope="scope">{{scope.row.paymentMode | typeFormatter}}</template>
        </el-table-column>
        <el-table-column label="订单状态" width="120" align="center">
          <template slot-scope="scope">{{scope.row.orderStatus | statusFormatter}}</template>
        </el-table-column>
        <el-table-column  label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleViewOrder(scope.$index, scope.row)"
            >查看订单</el-button>
            <el-button
              size="mini"
              @click="handleCloseOrder(scope.$index, scope.row)"
              v-show="scope.row.orderStatus===0">关闭订单</el-button><!--待付款-->
            <el-button
              size="mini"
              @click="handleDeliveryOrder(scope.$index, scope.row)"
              v-show="scope.row.orderStatus===1">订单发货</el-button><!--待发货-->
            <el-button
              size="mini"
              @click="handleViewLogistics(scope.$index, scope.row)"  
              v-show="scope.row.orderStatus===2||scope.row.orderStatus===3">订单跟踪</el-button><!--已发货、已完成-->
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteOrder(scope.$index, scope.row)"
              v-show="scope.row.orderStatus===4">删除订单</el-button><!--已完成-->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
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
    </div>
    <div class="pagination-container">
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
    </div>
   <el-dialog
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
    </el-dialog>
    <!-- <logistics-dialog v-model="logisticsDialogVisible"></logistics-dialog> -->

  </div> 
</template>
<script>
import {fetchList} from '@/api/orders'
import {formatDate} from '@/utils/date';
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    orderNumber: null,
    consigneeName:null,
    orderStatus:null,
    selectTime:null,
  };
export default {
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
          list: null,
          total: null,
          operateType:null,

          //数字还是字符串？？？？？？？？？？？？？？？？？？
          statusOptions:[
            {
              label:'Pending payment',//待付款
              value:0,
            },
            {
              label:'To be shipped',//待发货
              value:1,
            },
            {
              label:'Shipped',//已发货
              value:2,
            },
            {
              label:'Completed',//已完成
              value:'3',
            },
            {
              label:'Closed',//已关闭
              value:'4',
            },
            {
              label:'Returning',//退货中
              value:'5',
            },
            {
              label:'refunding',//退款中
              value:'6',
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
          list:[
            {
              orderId:'1231',
              orderNumber:'2323434',
              consigneeName:'张三张三张三张三张三张三张三张三张三张三张三',
              createTime:'2019-2-2',
              paymentMoney:'2000',
              paymentMode:'',
              orderStatus:0,

            },
            {
              orderId:'1231',
              orderNumber:'2323434',
              consigneeName:'张三',
              createTime:'2019-2-2',
              paymentMoney:'2000',
              paymentMode:'1',
              orderStatus:1,
            },
            {
              orderId:'1231',
              orderNumber:'2323434',
              consigneeName:'张三',
              createTime:'2019-2-2',
              paymentMoney:'2000',
              paymentMode:'0',
              orderStatus:2,
            },
            {
              orderId:'1231',
              orderNumber:'2323434',
              consigneeName:'张三',
              createTime:'2019-2-2',
              paymentMoney:'2000',
              paymentMode:'0',
              orderStatus:3,
            },
            {
              orderId:'1231',
              orderNumber:'2323434',
              consigneeName:'张三',
              createTime:'2019-2-2',
              paymentMoney:'2000',
              paymentMode:'1',
              orderStatus:4,
            },

          ],

          pickerOptions2: {
          shortcuts: [{
              text: '最近一周',
              onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
              }
          }, {
              text: '最近一个月',
              onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
              }
          }, {
              text: '最近三个月',
              onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
              }
          }]
          },
          selectTime:'',
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
            if(value === "0"){return '支付宝'} 
            else if(value === "1"){return '微信'}
            else {return 'Not claer'}
        },
        //状态转变
        statusFormatter(value)
        {
            if(value===0){return 'Pending payment'} //待付款
            else if(value===1){return 'To be shipped'} //待发货
            else if(value===2){return 'Shipped'}  //已收货
            else if(value===3){return 'Completed'}  //已完成
            else if(value===4){return 'Closed'}  //已关闭
            else if(value===5){return 'Returning'}  //退货中
            else if(value===6){return 'refunding'}  //退款中
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

      //获取搜索列表
      getSearchList(){
          this.listLoading=true;
          //this.listQuery即为搜索条件
          fetchList(this.listQuery).then(response => {
            this.listLoading = false;
            this.list = response.data.list;
            this.total = response.data.total;
          });
      },

      //获取搜索结果
      handleSearchList(val){
          this.listQuery.pageNum = 1;
          this.listQuery.pageSize = val;
          this.getSearchList();
      },

      //重置
      handleResetSearch(){
        this.listQuery = Object.assign({}, defaultListQuery);
      },

      handleBatchOperate(){},
      handleViewOrder(){},
      handleCloseOrder(index,row){
        this.closeOrder.dialogVisible=true;

      },
      handleSelectionChange(){},
      handleDeleteOrder(){},
      handleViewLogistics(){},
      handleDeliveryOrder(){},
      handleCloseOrderConfirm(){},
      handleCurrentChange(){},
      handleSizeChange(){},
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
