<template>
    <div class="home-container">
        <div>
            <!-- <svg-icon icon-class="Smoney" class="S-icon"></svg-icon>
            <span class="title-font">一年内商城总销售额-seller销售额-成本统计</span> -->
            <el-form :inline="true">
                <el-form-item>
                    <el-date-picker
                        style="width:203px"
                        v-model="beginTime"
                        type="date"
                        placeholder="Please select time"
                        align="right"
                        format="yyyy-MM-dd 0:0:0"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                    -
                    <el-date-picker
                        v-model="endTime"
                        style="width:203px"
                        type="date"
                        placeholder="Please select time"
                        align="right"
                        format="yyyy-MM-dd 0:0:0"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                    <el-button type="primary" style="margin-left:10px;" @click="cycleUserNumsStat">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- <el-card class="box-card" style="margin-bottom:20px;">
            <Mechart></Mechart>
        </el-card> -->
        <el-card class="box-card" style="margin-bottom:20px;">
            <div class="mix-echarts">
                <IEcharts :option="cycle_mix"></IEcharts>
            </div>
        </el-card>
        <div>
            <svg-icon icon-class="Smoney" class="S-icon"></svg-icon>
            <span class="title-font">一年内商城的商品分类统计</span>
            <div class="pro-form">
                <!-- :model="productCate" -->
                <el-form :inline="true"  size="small" label-width="140px" ref="productCateFrom">
                    <el-form-item label="商品分类：">
                        <el-cascader
                            placeholder="please selete"
                            expand-trigger="click"
                            clearable
                            v-model="CateId"
                            :options="productCateOptions"
                            change-on-select>
                        </el-cascader>
                    </el-form-item>
                    <el-button
                        style="float:right; margin-right:450px"
                        type="primary"
                        @click="handleSearchList()"
                        size="small">
                        查询
                    </el-button>
                </el-form> 
            </div>
            <el-card class="box-card">
                <!-- <productCate></productCate> -->
                <!-- <Mechart></Mechart> -->
            </el-card>
        </div>
    </div>
</template>

<script>
//统计用户的销售额、成本、支出（税率）
import Mechart from './components/Mechart'
// import productCate from '@/components/Common/productCate'
import {fetchListLevel,fetchListChildrenLevel} from '@/api/productCate'
import {fetchListBycategoryId} from '@/api/statistics'


import IEcharts from 'vue-echarts-v3/src/full.js';
    // import {aggregate}  from '../../api';

    // import {aggregate} from 'api/aggregate';
    // import monthUserNumsReq from 'static/requestList/cycleUserNum.json';
    // 时间处理
import moment from 'moment';

// const defaultproductCate = {
//     CateId:null,
//   };
export default{
    name:'income',
    components:{
        //Mechart,
        // productCate
        IEcharts
    },

    created() {
      //this.getList();
      this.getProductCateList();
    },

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
            //productCate: Object.assign({}, defaultproductCate),
            // productCate:[
            //     {
            //         CateId:null,
            //     }
            // ],
            pickerOptions1: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = moment().subtract(1, 'days').format('YYYY-MM-DD 0:0:0');
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '7天前',
                        onClick(picker) {
                            const date = moment().subtract(7, 'days').format('YYYY-MM-DD 0:0:0');
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '30天前',
                        onClick(picker) {
                            const date = moment().subtract(30, 'days').format('YYYY-MM-DD 0:0:0');
                            picker.$emit('pick', date);
                        }
                    }]
            },
            beginTime: '',
            endTime: '',
            cycle_mix: {
                color: ["#13CE66", "#20a0ff", "#F7BA2A"],
                title: {
                    text: "Total Sales / seller's Sales / Cost",
                    x: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                toolbox: {
                    feature: {
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                legend: {
                    data: []
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: [
                    {
                        name: "",
                        type: "bar",
                        data: []
                    },
                    {
                        name: "",
                        type: "bar",
                        data: []
                    },
                    {
                        name: "",
                        type: "bar",
                        data: []
                    },
                ]
            }
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
    }
    /* .box-card{
        border: 1px solid #d1dbe5;
        border-radius: 4px;
        background-color: #fff;
        overflow: hidden;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    } */
    
    .mix-echarts {
        width: 100%;
        height: 300px;
    }
</style>
