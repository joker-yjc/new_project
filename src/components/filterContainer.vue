<template>
  <div class="filter">
    <div class="l">
      <slot name="l"></slot>
    </div>
    <div class="r">
      <slot name="r"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'filterContainer'
}
</script>
