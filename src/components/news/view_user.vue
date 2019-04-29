<template>
  <div class="components-container">
    <el-select v-model="value" style="width:500px;" multiple placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>

    <div style="margin-top:30px;">
      <el-tag v-for="item of value" :key="item" style="margin-right:15px;">
        {{ item }}
      </el-tag>
    </div>
    <!-- <el-form-item label="登录名：" v-show="flag1">
        <el-input style="width: 203px" v-model="listQuery.username" placeholder="登陆名"  clearable></el-input>
    </el-form-item> -->
  </div>
</template>

<script>
// import ElDragSelect from '@/components/DragSelect' // base on element-ui

export default {
  name: 'DragSelectDemo',
//   components: { ElDragSelect },
  data() {
    return {
      value: ['Apple', 'Banana', 'Orange'],
      options: [
        // {
        //     value: 'Apple',
        //     label: 'Apple'
        // }, {
        //     value: 'Banana',
        //     label: 'Banana'
        // }, {
        //     value: 'Orange',
        //     label: 'Orange'
        // }, {
        //     value: 'Pear',
        //     label: 'Pear'
        // }, {
        //     value: 'Strawberry',
        //     label: 'Strawberry'
        // }
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
      ]
    }
  }
}
</script>
