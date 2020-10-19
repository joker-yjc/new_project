import { Mscf } from 'nearby-common'

export let BASE_URL = process.env.VUE_APP_apiBaseUrl
// 网关
let commonApiBaseUrl = process.env.VUE_APP_VUE_APP_commonBaseUrl || process.env.VUE_APP_APIBASEURL

// 获取产品经理
export const getAllProductUrl = commonApiBaseUrl + '/common/positionUserSearch/getAllProductBranchAndGroup'
// 获取在职人员
export const getAllUserUrl = commonApiBaseUrl + '/common/positionUserSearch/getAllUser'
// 获取设计人员
export const getAllDesignUrl = commonApiBaseUrl + '/common/positionUserSearch/getAllDesign'
// 获取所有文案人员
export const getAllCopywritingUrl = commonApiBaseUrl + '/common/positionUserSearch/getAllCopywriting'
// 获取商城类型
export const getProductTypeUrl = commonApiBaseUrl + '/common/productType/getProductType'
// 通用上传图片
export const commonUploadImgUrl = commonApiBaseUrl + '/common/file/uploadFile'
// 获取自己职位对应的站点
export const getMyselfCityUrl = commonApiBaseUrl + '/common/location/getSingleList'
// 获取全部站点
export const getAllCityUrl = commonApiBaseUrl + '/common/location/getAllList'

export const mscf = new Mscf({
  role: 'child',
  token: 'nearby',
  name: process.env.VUE_APP_projectName
})
