<!--
 * @Date: 2020-06-02 14:58:47
 * @LastEditors  : joker_yjc
 * @LastEditTime : 2020-11-05 17:43:12
 * @Desciption: 图片上传组件——支持图片尺寸大小校验，拖拽改变图片位置，裁剪图片
-->
<template>
  <div class="uploadContainer">
    <draggable v-model="fileLists" draggable=".previewItem" style="display:flex;flex-wrap:wrap" @change="dragChange" v-viewer>
      <span class="previewItem" v-for="(item, index) in fileLists" :key="index">
        <img :src="item.uploadUrl || item.preview" ref="image" style="width: auto;height: auto;max-width: 100%;max-height: 100%;" />
        <span class="image-action">
          <a-icon type="eye" @click="(e) => preview(index)" />
          <a-icon v-if="!$attrs.disabled" type="delete" @click="(e) => deleteFile(index)" />
        </span>
      </span>
      <a-spin tip="上传中..." :spinning="loading">
        <span class="showUpload" @click="clickInput" v-if="fileLists.length < limit && !$attrs.disabled">
          <!-- <a-icon type="plus" style="font-size:24px" /> -->
          裁剪上传
        </span>
      </a-spin>
    </draggable>
    <input type="file" accept="image/*" ref="fileInput" @change="pickFile" style="display:none" />
    <!-- 图片裁剪的弹窗 -->
    <a-modal :visible="modalVisible" :maskClosable="false" @cancel="modalVisible = false" width="100%" :afterClose="afterClose" :footer="null" :dialogStyle="{ top: 0 }" :bodyStyle="{ padding: 0 }">
      <div style="position:relative;">
        <div style="max-width: 70%;margin:auto;">
          <img ref="clipImage" :src="imgData" />
        </div>
        <div class="p20" style="position: fixed;top:0">
          <div>
            <a-button @click="(e) => rotate(15)">顺时针旋转</a-button>
            <a-button @click="(e) => rotate(-15)">逆时针旋转</a-button>
          </div>
          <div class="mt10">
            <a-button type="primary" @click="(e) => uploadFile()">直接上传</a-button>
            <a-button type="primary" v-if="imgData" @click="getData">裁剪上传</a-button>
          </div>
          <div class="mb15 mt15">裁剪框宽度：<a-input-number v-model="cropStyle.width" :min="1" style="width:200px" @change="setWidth" /></div>
          <div>裁剪框高度：<a-input-number v-model="cropStyle.height" :min="1" style="width:200px" @change="setWidth" /></div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import { commonUploadImgUrl } from '@/utils/const'
import { http } from '@/utils/http'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { download } from '@/utils'
export default {
  name: 'clipDragUpload',
  data() {
    return {
      fileLists: [...this.value],
      loading: false,
      imgData: undefined,
      cropper: undefined,
      finalData: [],
      cropStyle: {
        width: 1,
        height: 1
      },
      modalVisible: false
    }
  },
  watch: {
    value() {
      this.fileLists = this.value
    }
  },
  components: {
    draggable
  },
  props: {
    imageLimit: {
      type: Object,
      default: () => {
        return {
          // 图片宽度
          width: undefined,
          // 图片高度
          height: undefined,
          // 图片的比例 宽/高
          scale: undefined,
          // 图片大小 b
          size: undefined
        }
      }
    },
    // 上传的地址
    action: {
      type: String,
      default: commonUploadImgUrl
    },
    isPoster: {
      type: Boolean,
      default: false
    },
    limit: {
      default: Infinity,
      type: Number
    },
    value: {
      default: function() {
        return []
      },
      type: Array
    }
  },
  methods: {
    afterClose() {
      console.log('剪切弹窗关闭')
      this.cropper && this.cropper.destroy()
      this.imgData = undefined
      this.finalData = []
      this.$refs.fileInput.value = ''
      // this.cropStyle = {
      //   width: 1,
      //   height: 1
      // }
    },
    // 预览图片
    openView() {
      this.modalVisible = true
    },
    //下载切图
    downloadImg(item) {
      download(item.originFile.name, item.clipBlob)
    },
    // 选择上传图片
    pickFile(e) {
      let files = Array.from(e.target.files)
      this.modalVisible = true
      let file = files[0]
      if (this.imgData) {
        this.cropper.destroy()
      }
      // 要等到图片加载完成才能创建裁剪实例
      let fr = new FileReader()
      fr.addEventListener('load', (e) => {
        this.imgData = e.target.result
        this.$refs.clipImage.onload = () => {
          this.init()
        }
      })
      fr.readAsDataURL(file)
    },
    // 创建裁剪实例
    init() {
      const clipImage = this.$refs.clipImage
      this.cropper = new Cropper(clipImage, {
        viewMode: 0,
        dragMode: 'move',
        // zoomable: false,
        crop: () => {
          let { width, height } = this.cropper.getCropBoxData()
          this.cropStyle = {
            width,
            height
          }
        },
        ready: () => {
          console.log('建裁剪图片实例创建成功')
        }
      })
      console.log(this.cropper)
    },
    rotate(edg) {
      this.cropper.rotate(edg)
    },
    // 获取剪切的图片信息
    getData() {
      this.cropper
        .getCroppedCanvas({
          width: this.cropStyle.width,
          height: this.cropStyle.height,
          imageSmoothingQuality: 'high'
        })
        // .toDataURL('image/jpeg')
        .toBlob((blob) => {
          // console.log(blob)
          const originFile = this.$refs.fileInput.files[0]
          console.log('原始图片的内容', originFile)
          let newFile = new File([blob], originFile.name, { type: originFile.type })
          // console.log(newFile)
          this.uploadFile(newFile)
        })
    },
    // 设置剪切框的大小
    setWidth() {
      this.cropper.setCropBoxData(this.cropStyle)
    },
    // 上传图片
    upload(fileObj) {
      let { action, isPoster } = this
      let fd = new FormData()
      fd.append('file', fileObj)
      isPoster ? fd.append('type', 0) : fd.append('type', 1)
      return http.post(action, fd)
    },
    // 判断图片的大小 尺寸 比例
    JudgeImageSize(url, fileSize, sizeObj = this.imageLimit) {
      /* eslint-disable  */
      return new Promise((resolve, reject) => {
        let image = new Image()
        image.src = url
        image.onload = () => {
          let width = image.width
          let height = image.height
          let size = fileSize
          let scale = Number((width / height).toFixed(1))
          if (size >= 1024 * 1024 * 20) {
            resolve({ flag: false, message: '图片最大不能超过20M' })
          }
          if (sizeObj.width && width !== sizeObj.width) {
            resolve({ flag: false, message: '图片尺寸不符要求' })
          }
          if (sizeObj.height && height !== sizeObj.height) {
            resolve({ flag: false, message: '图片尺寸不符要求' })
          }
          if (sizeObj.size && size > sizeObj.size) {
            resolve({ flag: false, message: '图片大小不符要求' })
          }
          if (sizeObj.scale && scale !== sizeObj.scale) {
            resolve({ flag: false, message: '图片比例不符要求' })
          }
          resolve({ flag: true })
        }
      })
    },
    dragChange(v) {
      this.$emit('input', this.fileLists)
    },
    clickInput() {
      let fileInput = this.$refs.fileInput
      fileInput.click()
    },
    // 上传图片
    async uploadFile(file) {
      // let files = Array.from(e.target.files)
      // this.modalVisible = false
      let files = file ? [file] : Array.from(this.$refs.fileInput.files)
      let selectLength = files.length
      if (this.limit < selectLength + this.fileLists.length) {
        this.$messageSend.warning(`图片上传数量限制为${this.limit}张`)
        return
      }
      let proFun = (files, i) => {
        return new Promise((resolve, reject) => {
          let fr = new FileReader()
          fr.readAsDataURL(files[i])
          fr.onload = async (e) => {
            let preview = e.target.result
            try {
              let result = await this.JudgeImageSize(preview, files[i].size, this.imageLimit)
              if (!result.flag) {
                this.$messageSend.warning(`图片---${files[i].name}，${result.message}`)
                return new Error('图片尺寸错误')
              }
              // 图片校验完成以前关闭弹窗上传
              this.modalVisible = false
              let uploadRes
              if (this.action) {
                this.loading = true
                uploadRes = await this.upload(files[i])
                this.loading = false
                this.fileLists.push({
                  originFileObj: files[i],
                  preview,
                  uploadUrl: (uploadRes && uploadRes.data && uploadRes.data.url) || ''
                })
                // 上传后清空value属性
                this.$refs.fileInput.value = ''
                this.$emit('input', this.fileLists)
              }
            } catch (error) {
              this.loading = false
              this.$messageSend.warning('图片上传失败，请重试！')
            } finally {
              resolve()
            }
          }
        })
      }
      // 此组件不支持一次选择多张图片
      for (let i = 0; i < files.length; i++) {
        await proFun(files, i)
      }
    },
    deleteFile(index) {
      this.$delete(this.fileLists, index)
      this.$emit('input', this.fileLists)
    },
    preview(index) {
      this.$refs.image[index].click()
    }
  }
}
</script>
<style scoped lang="scss">
.uploadContainer {
  display: inline-block;
}
.previewItem {
  list-style: none;
  border: 1px solid #d9d9d9;
  width: 104px;
  height: 104px;
  border-radius: 4px;
  display: inline-block;
  margin: 10px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 5px;
  &:hover {
    .image-action {
      display: flex;
    }
  }
  .image-action {
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: none;
    i {
      color: #fff;
      font-size: 20px;
      margin: 0 10px;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
}
.showUpload {
  display: inline-block;
  border: 1px dashed #d9d9d9;
  width: 104px;
  height: 104px;
  border-radius: 4px;
  margin: 10px;
  line-height: 104px;
  text-align: center;
  cursor: pointer;
}
</style>
