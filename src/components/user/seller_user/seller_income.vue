<template>
    <div class="app-container">
        <el-card shadow="never">
            <div>
                <i class="el-icon-search"></i>
                <span>条件搜索</span>
                <el-button
                    style="float: right"
                    @click="getSearchList()"
                    type="primary"
                    size="small">
                    查询
                </el-button>
            </div>
            <div style="margin-top: 10px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="seller登陆名：">
                        <el-input style="width: 203px" v-model="listQuery.username"  placeholder="seller登陆名"></el-input>
                    </el-form-item>
                    <el-form-item label="查询时间：">
                        <el-date-picker
                        style="width: 363px"
                        v-model="listQuery.querytime"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <!-- v-loading="listLoading" -->
        <div class="table-container">
            <el-table ref="productTable"
                        highlight-current-row
                        :data="list"
                        style="width: 100%"
                        @selection-change="handleSelectionChange"
                        
                        border>
                <el-table-column type="selection" width="60" align="center"></el-table-column>
                <!-- <el-table-column label="编号" width="100" align="center">
                    <template slot-scope="scope">{{scope.row.yieldId}}</template>
                </el-table-column> -->
                <!-- <el-table-column label="商品名称"  align="center">
                    <template slot-scope="scope">{{scope.row.poductName}}</template>
                </el-table-column>
                <el-table-column label="商品数量" width="80" align="center">
                    <template slot-scope="scope">{{scope.row.productQuantity}}</template>
                </el-table-column>
                <el-table-column label="订单金额" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.orderMoeny}}</template>
                </el-table-column>
                <el-table-column label="支付金额" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.paymentMoney}}</template>
                </el-table-column> -->
                <!-- <el-table-column label="收益金额" width="120" align="center">
                    <template slot-scope="scope">{{scope.row.yieldMoney}}</template>
                </el-table-column>
                <el-table-column label="收益时间" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.createTime}}</template>
                </el-table-column> -->
                <el-table-column label="交易时间" align="center">
                    <template slot-scope="scope">{{scope.row.createTime | dateFormatter}}</template>
                </el-table-column>
                <el-table-column label="交易类型" width="180" align="center">
                    <template slot-scope="scope">{{scope.row.type | typeFormatter}}</template>
                </el-table-column>
                <el-table-column label="交易金额" width="160" align="center">
                    <template slot-scope="scope">￥{{scope.row.money}}</template>
                </el-table-column>
                <el-table-column label="余额" width="160" align="center"><!--从哪里获得？？？？？？？？？？？？？-->
                    <template slot-scope="scope">￥{{scope.row.userMoney}}</template>
                </el-table-column>
                <el-table-column label="操作" width="160" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleGetDetail(scope.$index, scope.row)">获取详情
                        </el-button>
                        <!-- <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button> -->
                    </template>
                </el-table-column>
            </el-table>
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
        </div>
    </div>
</template>


<script>
import {fetchListIncome} from '@/api/user'
import {formatDate} from '@/utils/date';
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    
    username:null,
    querytime:null,
    
  };
export default {
    data(){
        return{
            listQuery: Object.assign({}, defaultListQuery),
            //listLoading: true,
            list: [
                {
                    createTime:'2017-8-8',
                    type:'0',
                    money:'30000',
                    userMoney:'20'
                },
                {
                    createTime:'2013-8-8',
                    type:'1',
                    money:'30000',
                    userMoney:'200'
                },
                {
                    createTime:'2017-8-8',
                    type:'1',
                    money:'30000',
                    userMoney:'200'
                },
            ],
            

            // offset: 0,
            // limit: 20,
            // count: 0,
            // currentPage: 1,

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

        }
    },

    filters:{
        //日期转换
        dateFormatter(time){
            let date=new Date(time)
            return formatDate(date,'MM.dd.yyyy hh:mm:ss')
        },
        //交易类型转换
        typeFormatter(value){
            if(value === '0') {return 'In'} 
            else if(value === '1') {return 'Out'}
            else {return 'Not clear'}
        },
    },

    methods:{

        //获取搜索列表
        getSearchList(){
            this.listLoading=true;
            fetchListIncome(this.listQuery).then(response => {
                this.listLoading = false;
                this.list = response.data;
                this.total = response.data.total;
            });
        },

        //获取收益详情
        handleGetDetail(){
            
        },


        //获取页码
        handleSizeChange(val){
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;
            // this.getList();       ?????????????????
        },
        //获取当前页
        handleCurrentChange(val) {
            this.listQuery.pageNum = val;
            // this.getList();        ????????????????????
        },

        handleSelectionChange(){},
    }
}
</script>

<style scoped>
</style>




