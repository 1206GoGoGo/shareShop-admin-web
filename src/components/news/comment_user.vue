<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never" style="background:#f2f2f2;">
      <div>
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="商品名称：">
            <el-input v-model="listQuery.productName" class="input-width" style="width:203px" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品货号：">
            <el-input v-model="listQuery.productCode" class="input-width" style="width:203px" placeholder="商品货号"></el-input>
          </el-form-item>
          <el-form-item label="用户名称：">
            <el-input v-model="listQuery.userName" class="input-width" style="width:203px" placeholder="评论用户名称"></el-input>
          </el-form-item>
          <el-form-item label="用户评分：">
              <el-select v-model="listQuery.status" placeholder="All"  style="width:203px" clearable class="input-width">
              <el-option v-for="item in RateOptions"
                  
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
              </el-select>
          </el-form-item>
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
        </el-form>
      </div>
    </el-card>

    <el-table
    :data="list"
    highlight-current-row
    :header-cell-style="{background:'#f2f2f2',color:'#606266','border-bottom': '1px rgb(103, 194, 58) solid'}"
    style="width: 100%">
    <!--<el-table-column type="expand">
       <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand" label-width="100px">
           <el-form-item label="评论时间:">
            <span>{{ props.row.commentTime }}</span>
          </el-form-item>
          <el-form-item label="商品货号:">
            <span>{{ props.row.productCode }}</span>
          </el-form-item>
          <el-form-item label="评价用户:">
            <span>{{ props.row.userName }}</span>
          </el-form-item>
          <el-form-item label="评论内容:">
            <span>{{ props.row.content }}</span>
          </el-form-item>
          <el-form-item label="重复评论内容:">
            <span>{{ props.row.secondContent }}</span>
          </el-form-item>
          <el-form-item label="评论回复:">
            <span>{{ props.row.title }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column> -->
    <el-table-column label="商品名称/属性" align='center' width="240" prop="productName"></el-table-column>
    <el-table-column label="评价内容" align='center' prop="content"></el-table-column>
    <el-table-column label="操作" width="140" align="center">
        <template slot-scope="scope">
            <el-button
                size="mini"
                type="text"
                @click="handleShow(scope.$index, scope.row)">查看
            </el-button>  
            <el-button
                size="mini"
                type="text"
                style="color:#E6A23C;"
                @click="handleReplay(scope.$index, scope.row)">回复
            </el-button>
            <el-button
                size="mini"
                type="text"
                style="color:#F56C6C;"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
        </template>
    </el-table-column>
  </el-table>
  </div>        
</template>

<script>
import {fetchList,deleteComment} from '@/api/productComment'
const defaultListQuery = {
    pageNum: 1,
    pageSize: 10,
    user:null,
    productCode:null,
    productName:'',
  };

export default {
    data(){
      return {
        total: null,
        offset: 0,
        limit: 20,
        count: 0,
        currentPage: 1,
        listQuery: Object.assign({}, defaultListQuery),
        RateOptions:[
          {
            value:1,
            label:'5星好评'
          },
          {
            value:2,
            label:'4星好评以上'
          },
          {
            value:3,
            label:'3星好评以上'
          },
          {
            value:4,
            label:'2星好评以下'
          },
          {
            value:5,
            label:'差评'
          },
        ],
        list: [{
            productCode: '12987122',
            userName:'张三',
            productName:'帽子',
            title:'评论帽子荷兰优质淡奶，评论帽子荷兰优质淡奶评论帽子荷兰优质淡奶评论帽子荷兰优质淡奶评论帽子荷兰优质淡奶评论帽子荷兰优质',
            content: '荷兰优质淡奶，奶香荷兰优质淡奶，奶香荷兰优质淡奶，奶香荷兰优质淡奶，奶香荷兰优质淡奶，奶香荷兰优质淡奶，奶香荷兰优',
            secondContent: '好滋好味鸡',
            commentTime: '2010-9-9',
          },
          {
            productCode: '12987122',
            userName:'张三',
            productName:'帽子',
            title:'评论帽子',
            content: '荷兰优质淡奶，奶香',
            secondContent: '好滋好味鸡蛋仔',
            commentTime: '2010-9-9',
          }
        ],
      }
    },
    methods:{
      handleShow(){
        this.$router.push({path:'/'});
      },
      
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
      
      //删除管理员
      handleDelete(index, row){
          let ids=[];
          ids.push(row.commentId);
          this.deleteComment(ids);
      },
      
      //删除详细信息
      deleteComment(ids){
          this.$confirm('是否要进行该删除操作?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
              }).then(() => {
          //let params = new URLSearchParams(); //?????????????post 还是get??????
          //params.append("ids",ids);
          deleteComment(this.commentId).then(response=>{
              this.$message({
              message: '删除成功！',
              type: 'success',
              duration: 1000
              });
              this.listQuery.pageNum=1;
              // this.getList();
              });
          })
      },
      handleReplay(){

      },

    },
    
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


    