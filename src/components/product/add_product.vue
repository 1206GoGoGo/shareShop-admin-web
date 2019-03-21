
<template> 
  <product_detail :is-edit='false'></product_detail>
</template>
<script>
  import product_detail from './product_add/product_detail'
  export default {
    name: 'productAdd',
    components: { product_detail }
  }
</script>
<style>
</style>

