<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never" style="background:#f2f2f2;">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
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
          <!-- :model="listQuery" -->
        <el-form :inline="true"      size="small" label-width="140px">
          <el-form-item label="商品名称：">
            <!-- v-model="listQuery.productName" -->
            <el-input      class="input-width" placeholder="商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品货号：">
            <!-- v-model="listQuery.productName" -->
            <el-input      class="input-width" placeholder="商品货号"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-table
    :data="tableData5"
    highlight-current-row
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <!-- <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item> -->
          <el-form-item label="商品货号">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <!-- <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item> -->
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <!-- <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item> -->
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="商品货号"
      prop="id">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="简单描述"
      prop="desc">
    </el-table-column>
    <el-table-column label="操作" width="160" align="center">
        <template slot-scope="scope">
            <!-- <p>
            <el-button
                size="mini"
                @click="handleShowUser(scope.$index, scope.row)">查看
            </el-button>
            <el-button
                size="mini"
                @click="handleUpdateUser(scope.$index, scope.row)">编辑
            </el-button>
            </p> -->
            <p>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
            </p>
        </template>
    </el-table-column>
  </el-table>
  </div>        
</template>

<script>
export default {
    data(){
        return {
            tableData5: [{
            id: '12987122',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            // address: '上海市普陀区真北路',
            // shop: '王小虎夫妻店',
            // shopId: '10333'
            },
            {
            id: '12987126',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            // address: '上海市普陀区真北路',
            // shop: '王小虎夫妻店',
            // shopId: '10333'
            }]
        }
    },
    methods(){},
    
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


    