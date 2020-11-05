<!--
 * @Date: 2020-06-02 14:58:47
 * @LastEditors  : joker_yjc
 * @LastEditTime : 2020-11-05 17:43:27
 * @Desciption: 图片上传组件——支持图片尺寸大小校验，拖拽改变图片位置
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
          <a-icon type="plus" style="font-size:24px" />
        </span>
      </a-spin>
    </draggable>
    <input type="file" v-if="multiple" multiple accept="image/*" ref="fileInput" @change="fileChange" style="display:none" />
    <input type="file" v-else accept="image/*" ref="fileInput" @change="fileChange" style="display:none" />
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import { commonUploadImgUrl } from '@/utils/const'
import { http } from '@/utils/http'
export default {
  name: 'dragUploadImage',
  data() {
    return {
      fileLists: [...this.value],
      loading: false
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
    multiple: {
      default: false,
      type: Boolean
    },
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
    dragChange() {
      this.$emit('input', this.fileLists)
    },
    clickInput() {
      let fileInput = this.$refs.fileInput
      fileInput.click()
    },
    async fileChange(e) {
      let files = Array.from(e.target.files)
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
      for (let i = 0; i < files.length; i++) {
        await proFun(files, i)
      }
      this.$refs.fileInput.value = ''
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
