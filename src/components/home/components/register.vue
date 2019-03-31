<template>
  <ve-bar :data="chartData"></ve-bar>
</template>

<script>
  export default {
    data () {
      return {
        chartData: {
          columns: ['日期', '注册会员', '注册seller' ],
          rows: [
            { '日期': '1/1', '注册会员': 1393, '注册seller': 1093, },
            { '日期': '1/2', '注册会员': 3530, '注册seller': 3230, },
            { '日期': '1/3', '注册会员': 2923, '注册seller': 2623, },
            { '日期': '1/4', '注册会员': 1723, '注册seller': 1423, },
            { '日期': '1/5', '注册会员': 3792, '注册seller': 3492, },
            { '日期': '1/6', '注册会员': 4593, '注册seller': 4293, }
          ]
        }
      }
    }
  }
</script>