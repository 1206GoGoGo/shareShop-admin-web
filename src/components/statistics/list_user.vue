<template>
    <div class="home-container">
        <div>
            <el-form :inline="true" size="small">
                <el-form-item>
                    <el-date-picker
                        style="width:203px"
                        v-model="beginTime1"
                        type="date"
                        placeholder="Please select time"
                        align="right"
                        format="yyyy-MM-dd 0:0:0"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                    -
                    <el-date-picker
                        v-model="endTime1"
                        style="width:203px"
                        type="date"
                        placeholder="Please select time"
                        align="right"
                        format="yyyy-MM-dd 0:0:0"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                    <el-button type="primary" style="margin-left:10px;" @click="handleSearchList">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-card class="box-card">
            <Userechart></Userechart>
        </el-card>
    </div>
</template>

<script>
//统计用户的销售额、成本、支出（税率）
import Userechart from './components/Userechart'
import {fetchListLevel,fetchListChildrenLevel} from '@/api/productCate'
import {fetchListBycategoryId,statisticSales} from '@/api/statistics'

import moment from 'moment'
// const defaultproductCate = {
//     CateId:null,
//   };
export default{

    mounted: function () {
        this.beginTime1 = moment().subtract(1, 'month').format('MM-DD-YYYY 00:00:00');
        //this.beginTime1 = moment().subtract(7, 'days').format('MM-DD-YYYY 00:00:00');
        this.endTime1 = moment().format('MM-DD-YYYY 00:00:00');
        this.beginTime2 = moment().subtract(1, 'month').format('MM-DD-YYYY 00:00:00');
        //this.beginTime2 = moment().subtract(7, 'days').format('MM-DD-YYYY 00:00:00');
        this.endTime2 = moment().format('MM-DD-YYYY 00:00:00');
        
        this.handleSearchList();
    },

    name:'income',
    components:{
        Userechart,
    },

    created() {
      //this.getList();
      this.getProductCateList();
    },

    //监听商品ID，有问题！！！
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
            //时间
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
            beginTime1: '',
            endTime1: '',
            beginTime2: '',
            endTime2: '',
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

        //初始化图表为空
        initDate() {
            let _this = this;
            // 时间
            _this.$refs.myEchart.xAxis.data = [];
            // 金额
            _this.$refs.myEchart.yAxis.data = [];
            // 总销售额
            _this.$refs.myEchart.series[0].data = [];
            // seller销售额
            _this.$refs.myEchart.series[1].data = [];
            // 成本
            _this.$refs.myEchart.series[2].data = [];
        },

        // 统计7天内的用户增长情况
        handleSearchList() {
            let params = monthUserNumsReq;
            if (null != this.beginTime1 && null != this.endTime1) {
                let starttime = moment(this.beginTime).format('MM-DD-YYYY 00:00:00');
                let endtime = moment(this.endTime).format('MM-DD-YYYY 00:00:00');

                params = Object.assign({'starttime': starttime, 'endtime': endtime}, params)
            }
            // if (this.mock) {
            //     params = Object.assign({'statFunc': 'handleSearchList', 'type': 0}, params)
            // }
            this.initDate();
            statisticSales(params).then(data => {
                //this.cycle_mix.legend.data = ['总销售额', 'seller销售额', '成本'];
                this.$refs.myEchart.legend.data = ['总销售额', 'seller销售额', '成本'];
                this.$refs.myEchart.series[0].name = '总销售额';
                this.$refs.myEchart.series[1].name = 'seller销售额';
                this.$refs.myEchart.series[2].name = '成本';

                let dateNum = moment(this.endTime).diff(moment(this.beginTime), 'days')

                for (let j = dateNum; j > 0; j--) {

                    let tododay = moment(this.endTime).subtract(j, 'days').format('MM-DD-YYYY');

                    this.$refs.myEchart.xAxis.data.push(tododay);

                    let WholeSaleNum = 0;
                    let SellerSaleNum = 0;
                    let CostNum = 0;
                    for (let i = data.length - 1; i >= 0; i--) {

                        let day = data[i]._id.day;
                        let deviceType = data[i]._id.deviceType;
                        let num = data[i].num;

                        if (day == tododay) {

                            if (1 == deviceType) {
                                WholeSaleNum = num;
                            } else if (2 == deviceType) {
                                SellerSaleNum = num;
                            } else if (3 == deviceType) {
                                CostNum = num;
                            }
                        }
                    }

                    // 总销售额
                    this.$refs.myEchart.series[0].data.push(WholeSaleNum);

                    // seller销售额
                    this.$refs.myEchart.series[1].data.push(SellerSaleNum);

                    // 成本
                    this.$refs.myEchart.series[2].data.push(CostNum);
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
        padding: 20px;
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
