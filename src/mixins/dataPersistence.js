/*
 * @Date: 2020-06-08 15:08:36
 * @LastEditors: joker_yjc
 * @LastEditTime: 2020-09-26 15:33:24
 * @Desciption:搜索数据持久化
 */
export default {
  created() {
    if (this.$route.query.filter) {
      this.filter = JSON.parse(this.$route.query.filter)
    }
  },
  watch: {
    filter: {
      deep: true,
      handler(newValue) {
        // console.log(newValue)
        let filter = JSON.stringify(newValue)
        this.$router.replace({
          path: this.$route.Path,
          query: { filter }
        })
      }
    }
  }
}
