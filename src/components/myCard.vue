<!--
 * @Description: 
 * @Author: Yao
 * @Date: 2020-04-16 09:39:18
 * @LastEditors: joker_yjc
 * @LastEditTime: 2020-09-26 14:27:42
 -->
<template>
  <div class="my_card">
    <div class="card_title">
      {{ $attrs.titles || $attrs.title }}
      <slot name="title"></slot>
    </div>
    <div class="card_content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'myCard'
}
</script>
<style lang="scss" scoped>
.my_card {
  background: #fff;
  .card_title {
    padding: 10px;
    &::before {
      content: '';
      border-left: 4px solid #0090ff;
      border-radius: 2px;
      margin-right: 10px;
    }
  }
  .card_content {
    padding: 10px 20px;
  }
}
</style>
