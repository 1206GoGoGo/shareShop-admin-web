<template>
    <div class="app-container">
<!--条件搜索 S-->
        <el-card shadow="never" style="background:#f2f2f2;">
            <div>
                <i class="el-icon-search"></i>
                <span>条件搜索</span>
                <el-button
                    style="float: right"
                    @click="handleSearchList()"
                    type="primary"
                    size="small">
                    查询
                </el-button>
                <!--预留-->
                <!-- <el-button
                    style="float: right;margin-right: 15px"
                    @click="handleResetSearch()"
                    size="small">
                    重置
                </el-button> -->
            </div>
            <div style="margin-top: 10px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="登录名：">
                        <el-input style="width: 203px" v-model="listQuery.username" placeholder="登陆名"></el-input>
                    </el-form-item>
                    <!--预留根据时间查询！！！！！！！！！-->
                    <!-- <el-form-item label="查询时间：">
                        <el-date-picker
                        style="width: 373px"
                        v-model="listQuery.SearchDate"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions1">
                        </el-date-picker>
                    </el-form-item> -->
                </el-form> 
            </div>
        </el-card>
<!--条件搜索 E-->

<!--主表格 S-->            
        <el-table
        highlight-current-row
        :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
        :data="listRecord"
        style="width: 100%"
        @selection-change="handleSelectionChange">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand" label-width="100px">
                        <!-- <el-form-item label="真实姓名">
                            <span>{{ props.row.name }}</span>
                        </el-form-item> -->
                        <el-form-item label="消费商品">
                            <span>{{ props.row.poductName }}</span>
                        </el-form-item>
                        <el-form-item label="消费价格">
                            <span>￥{{ props.row.productPrice }}</span>
                        </el-form-item>
                        <el-form-item label="消费数量">
                            <span>{{ props.row.productQuantity }}</span>
                        </el-form-item>
                        <el-form-item label="消费金额">
                            <span>￥{{ props.row.orderMoeny }}</span>
                        </el-form-item>
                        <el-form-item label="订单状态">
                            <span>{{ props.row.orderStatus }}</span>
                        </el-form-item>
                        <el-form-item label="订单地址">
                            <span>{{ props.row.firstAddr }}</span>
                        </el-form-item>
                        <el-form-item label="消费时间">
                            <span>{{ props.row.createTime | dateFormatter}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <!-- <el-table-column
                type="selection"
                width="55">
            </el-table-column> -->
            <el-table-column
                label="用户编号"
                align='center'
                prop="userInfoId">
            </el-table-column>
            <el-table-column
                label="登录名"
                align='center'
                prop="username">
            </el-table-column>
            <el-table-column
                label="消费商品"
                align='center'
                prop="poductName">
            </el-table-column>
            <el-table-column
                label="订单号"
                align='center'
                prop="orderNumber">
            </el-table-column>
            <!-- <el-table-column
                label="用户等级"
                align='center'
                prop="level">
            </el-table-column> -->
            <!-- <el-table-column label="操作" width="160" align="center">
                <template slot-scope="scope">
                    <p>
                    <el-button
                        size="mini"
                        @click="handleUpdateUser(scope.$index, scope.row)">编辑
                    </el-button>
                    </p> 
                    <p>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                    </p>
                </template>
            </el-table-column> -->
        </el-table>
<!--主表格 E-->            
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
        <!-- <div class="Pagination" style="text-align: left;margin-top: 10px;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="20"
                layout="total, prev, pager, next"
                :total="count">
            </el-pagination>
        </div> -->
    </div>
</template>

<script>
import {fetchList} from '@/api/user'  //是否是从一个表里面查询到的member？？？？？？？？？
import {formatDate} from '@/utils/date';
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    
    // name:null,
    username:null,
    // phoneNumber:null,
    // identityCardNo:null,
    // level:null,
    SearchDate:null
    
  };

export default {

    //过滤器 格式化
    filters: {
        //日期转变
        dateFormatter(time) {
            let date = new Date(time);
            return formatDate(date, 'MM.dd.yyyy hh:mm:ss')
        },
    },    
    data(){
        return{
            listQuery: Object.assign({}, defaultListQuery),
            listRecord: [
                { 
                    userInfoId:'12323324',
                    username:'shdshdshdasd',
                    poductName:'黑色棒球帽',
                    createTime:'2010-8-7',
                    name:'张娜',
                    productPrice:'2000',
                    productQuantity:'3',
                    orderMoeny:'6000',
                    orderStatus:'已发货',
                    firstAddr:'dwudduygdyffffffffff',
                    orderNumber:'2343454646',
                },{
                    userInfoId:'12323324',
                    username:'shdshdshdasd',
                    poductName:'黑色棒球帽',
                    createTime:'2010-8-7',
                    name:'张娜',
                    productPrice:'2000',
                    productQuantity:'3',
                    orderMoeny:'6000',
                    orderStatus:'已发货',
                    firstAddr:'dwudduygdyffffffffff',
                    orderNumber:'2343454646',
                },
                {
                    userInfoId:'12323324',
                    username:'shdshdshdasd',
                    poductName:'黑色棒球帽',
                    createTime:'2010-8-7',
                    name:'张娜',
                    productPrice:'2000',
                    productQuantity:'3',
                    orderMoeny:'6000',
                    orderStatus:'已发货',
                    firstAddr:'dwudduygdyffffffffff',
                    orderNumber:'2343454646',
                }
            ],
            //listLoading: true,
            
            // offset: 0,
            // limit: 20,
            // count: 0,
            //currentPage: 1,

            pickerOptions1: {
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
            SearchDate:'',
        }
    },
    methods:{

        //重置
        // handleResetSearch(){
        //     this.listQuery = Object.assign({}, defaultListQuery);
        // },

        //获取搜索列表
        getSearchList(){
            this.listLoading=true;
            //需要参数吗？？？？？？？？this.listQuery
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
        
        //handleShowUser(){},
        //handleUpdateUser(){},
        //handleDelete(){},

        handleSelectionChange(){},

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
    }
}
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>




