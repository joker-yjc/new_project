<template>
  <div class="dashboard" dashboard>
    <div v-if="isDebug">
      <p v-for="item in menus" :key="item.path">
        <router-link :to="item.path">{{ item.name }}</router-link>
      </p>
      12
    </div>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data() {
    return {
      isDebug: process.env.NODE_ENV === 'development',
      menus: []
    }
  }
}
</script>

<style scoped lang="scss">
.dashboard[dashboard] {
  padding: 10px 20px;
}
</style>
