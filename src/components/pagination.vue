<!--
 * @Date: 2020-05-27 11:04:16
 * @LastEditors: joker_yjc
 * @LastEditTime: 2020-09-26 14:34:23
 * @Desciption: 
-->
<template>
  <div class="paging-container">
    <a-pagination
      :current="parseInt(current)"
      showQuickJumper
      :showTotal="(total) => `共 ${total} 条`"
      style="margin: 10px 0;"
      :total="parseInt(total)"
      :pageSize="parseInt(pageSize)"
      showLessItems
      @change="handleChange"
    />
  </div>
</template>
<script>
export default {
  name: 'pagination',
  data() {
    return {}
  },
  props: {
    total: {
      default: 0
    },
    pageSize: {
      default: 10
    },
    current: {
      default: 1
    }
  },
  methods: {
    // 页码改变的回调，参数是改变后的页码及每页条数
    handleChange(page, pageSize) {
      this.$emit('change', { pageIndex: page, pageSize })
    },
    // pagesize变化的回调
    showSizeChange(current, size) {
      this.$emit('change', { pageIndex: current, pageSize: size })
    }
  }
}
</script>
