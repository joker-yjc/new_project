<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <a-spin :spinning="loading" style="height: 100%" size="large" :tip="tip" id="centerLoading">
        <a-icon slot="indicator" type="loading" style="font-size: 24px; position: fixed" spin />
        <router-view @pageLoading="changeLoading" />
      </a-spin>
    </div>
  </a-config-provider>
</template>
<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  data() {
    return {
      locale: zhCN,
      loading: false,
      tip: '数据加载中...'
    }
  },
  provide() {
    return {
      pageLoading: this.changeLoading
    }
  },
  watch: {
    '$route.path': {
      handler() {
        this.loading = false
      }
    }
  },
  created() {
    // console.log(process.env)
  },
  methods: {
    changeLoading(flag = { status: false, tip: '数据加载中...' }) {
      console.log(flag)
      this.loading = !!flag.status || false
      this.tip = flag.tip || '数据加载中...'
    }
  }
}
</script>
<style lang="scss">
body,
html {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  #centerLoading {
    .ant-spin {
      max-height: 100% !important;
    }
    .anticon-loading {
      & + .ant-spin-text {
        position: fixed;
      }
    }
  }
}
</style>
