<template>
  <div class="filter-item-container">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.filter-item-container {
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 10px;
}
</style>
<script>
export default {
  name: 'filterItem'
}
</script>
