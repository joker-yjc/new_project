import { getQueryString } from 'nearby-common'

export function getToken() {
  return process.env.NODE_ENV === 'development' ? 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2Jhc2VfaWQiOiI0ODN8MTYwMDgyNjEwMDE2NSJ9.b0Eb-OrYZb2d_XOYrk6575OjioXdkksm-GZCtZ5j6zY' : getQueryString('token')
}
export function isInFrame() {
  return window.self !== window.top
}

// 接受文件流并下载
export function getExcel(name, blobObj) {
  var elink = document.createElement('a')
  elink.download = name
  elink.style.display = 'none'
  elink.href = URL.createObjectURL(blobObj)
  document.body.appendChild(elink)
  elink.click()
  document.body.removeChild(elink)
  URL.revokeObjectURL(blobObj)
}
