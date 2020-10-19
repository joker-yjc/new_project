<!--
 * @Date: 2020-05-27 10:40:13
 * @LastEditors  : joker_yjc
 * @LastEditTime : 2020-09-29 10:47:12
 * @Desciption: 
-->
<template>
  <div class="bread breadcrumb-container">
    <a-breadcrumb>
      <a-breadcrumb-item>{{ moduleName }}</a-breadcrumb-item>
      <a-breadcrumb-item v-for="(nav, index) in navLists" :key="index">
        <router-link style="cursor: pointer" v-if="!nav.fn" :to="nav.url">{{ nav.label }}</router-link>
        <span style="cursor: pointer" v-else @click="nav.fn">{{ nav.label }}</span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>
<script>
export default {
  name: 'breadNav',
  props: {
    navLists: {
      type: Array
    },
    moduleName: {
      type: String,
      default: process.env.VUE_APP_moduleName
    }
  }
}
</script>
