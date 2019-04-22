<template> 
  <detail_coupon :isEdit="false"></detail_coupon>
</template>
<script>
  import detail_coupon from './coupon_detail/detail_coupon'
  export default {
    name: 'addCoupon',
    components: { detail_coupon }
  }
</script>
<style scoped>
</style>