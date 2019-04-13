<template>
    <div class="home-container">
        <Userechart></Userechart>                                                                                                                                                                                                                                                                                                       
    </div>
</template>
<script>
// 用户页面:统计用户一年的注册人数，一个月、一年的网站访问量。
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


