<template>
  <el-table :data="list" size="small" border fit highlight-current-row style="width: 100%">
    <el-table-column
      v-loading="loading"
      align="center"
      label="NO."
      width="70"
      element-loading-text="请给我点时间！">
    
      <template slot-scope="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>

    <el-table-column width="180px" align="center" label="Date">
      <template slot-scope="scope">
        <span>{{ scope.row.date | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" label="Total Sales">
      <template slot-scope="{row}">
        <span>{{ row.totalSales }}</span>
      </template>
    </el-table-column>

    <el-table-column  align="center" label="Seller Sales">
      <template slot-scope="scope">
        <span>{{ scope.row.sellerSales }}</span>
      </template>
    </el-table-column>

    <!-- <el-table-column width="120px" align="center" label="Operate">
      <template slot-scope="scope">
        <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" />
      </template>
    </el-table-column> -->

    <!-- <el-table-column align="center" label="Readings" width="95">
      <template slot-scope="scope">
        <span>{{ scope.row.pageviews }}</span>
      </template>
    </el-table-column> -->

    <!-- <el-table-column class-name="status-col" label="Status" width="110">
      <template slot-scope="{row}">
        <el-tag :type="row.status | statusFilter">
          {{ row.status }}
        </el-tag>
      </template>
    </el-table-column> -->
  </el-table>
</template>

<script>
// import { fetchList } from '@/api/article'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  props: {
    type: {
      type: String,
      default: 'CN'
    }
  },
  data() {
    return {
      list: [
        {
          id:1,
          date:'2019-5-13',
          totalSales:2322,
          sellerSales:23224
        },
        {
          id:2,
          date:'2019-5-12',
          totalSales:2322,
          sellerSales:23224
        },
        {
          id:3,
          date:'2019-5-11',
          totalSales:2322,
          sellerSales:23224
        },
      ],
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sort: '+id'
      },
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.$emit('create') // for test
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.loading = false
      })
    }
  }
}
</script>

