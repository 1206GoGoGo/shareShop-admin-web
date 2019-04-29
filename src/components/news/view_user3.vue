<template>
  <div style="margin-top: 10px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="搜索条件：">
                        <el-select v-model="listQuery.search" multiple default-first-option @change="changesearch1" @remove-tag="changesearch2" style="width: 700px" placeholder="Please select one or more" clearable>
                            <el-option
                                v-for="item in selectSearch"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="登录名：" v-show="flag1">
                        <el-input style="width: 203px" v-model="listQuery.username" placeholder="登陆名"  clearable></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名：" v-if="flag2">
                        <el-input style="width: 203px" v-model="listQuery.name" placeholder="真实姓名" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="手机号：" v-if="flag3"> 
                        <el-input style="width: 203px" v-model="listQuery.phoneNumber" placeholder="手机号"  clearable></el-input>
                    </el-form-item>
                    <el-form-item label="证件号码：" v-if="flag4">
                        <el-input style="width: 203px"  v-model="listQuery.identityCardNo" placeholder="证件号码"  clearable></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：" v-if="flag5">
                        <el-input style="width: 203px" v-model="listQuery.email" placeholder="邮箱" clearable></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="用户级别：" v-if="flag6">
                        <el-select v-model="listQuery.level" placeholder="全部" style="width: 203px" clearable>
                            <el-option
                                v-for="item in selectlevel"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item> -->
                </el-form> 
            </div>
</template>

<script>
const defaultListQuery = {
    pageindex: 0,
    pagesize: 20,
    //search:null,
    search:[],

    id:null,
    name:null,
    username:null,
    phoneNumber:null,
    identityCardNo:null,
    email:null,
    //level:null,
    //status:null,
  };
  export default {
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),

        flag1:false,
        flag2:false,
        flag3:false,
        flag4:false,
        flag5:false,
        //flag6:false,


        selectSearch:[
                {
                    label: "登录名",
                    value: 1
                },
                {
                    label: "真实姓名",
                    value: 2
                },
                {
                    label: "手机号",
                    value: 3
                },
                {
                    label: "证件号码",
                    value: 4
                },
                {
                    label: "邮箱",
                    value: 5
                },
                // {
                //     label: "用户级别",
                //     value: 6
                // },
            ],

        //value: []
      }
    },
    created(){
        //this.getList();
    },

    methods:{
        changesearch1(search){
            this.search=search;
            // for(let i=1; i<6;i++){
            //     if(this.search==i)
            //     {
            //         let flag=this.flag1+i;
            //         this.flag1=true; 
            //     }
            // }
            if(this.search==1)
                {this.flag1=true; }
            if(this.search==2)
                {this.flag2=true; }
            if(this.search==3)
                {this.flag3=true; }
            if(this.search==4)
                {this.flag4=true; }
            if(this.search==5)
                {this.flag5=true; }
            // if(this.search==6)
            //     {this.flag6=true; }
        },

        // changesearch1(search){
        //     this.search=search;
        //     switch(this.search){
        //         case 1:
        //         {
        //             this.flag1=true; 
        //         }
        //         case 2:
        //         {
        //             this.flag2=true; 
        //         }
        //         case 3:
        //         {
        //             this.flag3=true; 
        //         }
        //         case 4:
        //         {
        //             this.flag4=true; 
        //         }
        //         case 5:
        //         {
        //             this.flag5=true; 
        //         }
        //         case 6:
        //         {
        //             this.flag6=true; 
        //         }
        //         default:{
        //             return;
        //         }

        //     }
        // },



        changesearch2(search){
            this.search=search;
            if(this.search==1)
                {this.flag1=false; }
            if(this.search===2)
                {this.flag2=false; }
            if(this.search===3)
                {this.flag3=false; }
            if(this.search===4)
                {this.flag4=false; }
            if(this.search===5)
                {this.flag5=false; }
            if(this.search===6)
                {this.flag6=false; }
        },
    },
  }
</script>

<style scoped>
.el-select{
    width:900px;
}
</style>
