<template>
  <div class="error-page">
    <img src="@/assets/img/404.png" />
    <div class="error-text">
      <div>出错啦，尝试重新登录或刷新页面？</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'page404',
  data() {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.error-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    margin-top: -250px;
    width: 24%;
    height: 35%;
  }
  .error-text {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
