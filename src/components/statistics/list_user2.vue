<template>
    <div class="home-container">
        <Userechart></Userechart>                                                                                                                                                                                                                                                                                                       
    </div>
</template>
<script>
//用户页面:统计用户/seller的注册人数/网站访问量。
//seller:统计销量
import Userechart from './components/Userechart'
export default {
    name:'user',
    components:{
        Userechart,
    },
}
</script>
<style scoped>

</style>


