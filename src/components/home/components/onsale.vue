<template>
    <div>
        <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
    </div>
</template>

<script>
  export default {
    data () {
      this.chartSettings = {
        limitShowNum: 5
      }
      return {
        chartData: {
          columns: ['Onsale', '访问用户'],
          rows: [
            { 'Onsale': '贝雷帽', '访问用户': 1393 },
            { 'Onsale': '蕾丝巾', '访问用户': 3530 },
            { 'Onsale': '鸭舌帽', '访问用户': 2923 },
            { 'Onsale': '格子巾', '访问用户': 1723 },
            { 'Onsale': '遮阳帽', '访问用户': 3792 }
          ]
        }
      }
    }
  }
</script>