import { getQueryString } from 'nearby-common'

// 获取token
export function getToken() {
  return process.env.NODE_ENV === 'development' ? process.env.VUE_APP_token : getQueryString('token')
}

// 判断是否被嵌入在iframe中
export function isInFrame() {
  return window.self !== window.top
}

// 接受文件流并下载
export function download(name, blobObj) {
  var elink = document.createElement('a')
  elink.download = name
  elink.style.display = 'none'
  elink.href = URL.createObjectURL(blobObj)
  document.body.appendChild(elink)
  elink.click()
  document.body.removeChild(elink)
  URL.revokeObjectURL(blobObj)
}
