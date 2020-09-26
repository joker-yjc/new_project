/*
 * @Date: 2020-06-18 14:58:36
 * @LastEditors: joker_yjc
 * @LastEditTime: 2020-09-26 14:25:21
 * @Desciption:
 */
import Vue from 'vue'
import { dateFormat } from 'nearby-common'

// 格式时间戳 年-月-日
Vue.filter('formatDate', (timeStamp, format = 'YYYY-MM-DD HH:mm:ss') => {
  if (!timeStamp) {
    return '无'
  }
  return dateFormat(timeStamp, format)
})

// 格式化展示RMB ?
Vue.filter('formatRMB', (value) => {
  if (value || value === 0) {
    return '¥ ' + value
  } else {
    return '无'
  }
})

// 格式化 无值填充为无
Vue.filter('fillWu', (value) => {
  if (value || value === 0) {
    return value
  }
  return '无'
})
