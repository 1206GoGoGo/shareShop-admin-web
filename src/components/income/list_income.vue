<template>
    <el-select v-model="value5" multiple placeholder="请选择">
        <el-option
                v-for="item in selectSearch"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
export default{
    data(){
    return {
        selectSearch:[
                {
                    label: "登录名",
                    value: 1
                },
                {
                    label: "真实姓名",
                    value: 2
                },
                {
                    label: "手机号",
                    value: 3
                },
                {
                    label: "证件号码",
                    value: 4
                },
                {
                    label: "邮箱",
                    value: 5
                },
                {
                    label: "用户级别",
                    value: 6
                },
            ],
        value5: []
        }
    },  
}

</script>