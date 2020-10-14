<template>
  <div class="filter-item-container">
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.filter-item-container {
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>
<script>
export default {
  name: 'filterItem'
}
</script>
