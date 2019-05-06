<template> 
  <!-- <coupon-detail :isEdit="true"></coupon-detail> -->
  <detail_coupon :isEdit="true"></detail_coupon>
</template>
<script>
  // import CouponDetail from './components/CouponDetail'
  import detail_coupon from './coupon_detail/detail_coupon'
  export default {
    name: 'update_coupon',
    components: { detail_coupon }
  }
</script>
<style scoped>
</style>
