<template>
  <div class="upload-container">
    <el-upload
      :data="dataObj"
      :multiple="false"
      :show-file-list="false"
      :on-success="handleImageSuccess"
      class="image-uploader"
      drag
      action="https://httpbin.org/post"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
    </el-upload>
    <div class="image-preview image-app-preview">
      <div
        v-show="imageUrl.length>1"
        class="image-preview-wrapper"
      >
        <img :src="imageUrl">
        <div class="image-preview-action">
          <i
            class="el-icon-delete"
            @click="rmImage"
          />
        </div>
      </div>
    </div>
    <div class="image-preview">
      <div
        v-show="imageUrl.length>1"
        class="image-preview-wrapper"
      >
        <img :src="imageUrl">
        <div class="image-preview-action">
          <i
            class="el-icon-delete"
            @click="rmImage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator'
import CustomPropMixins from '../CustomPropMixins.ts'

@Component
export default class UploadImage extends Vue {
  @Prop() value = ''

  @Prop({ default: '' }) tempUrl = ''

  @Prop({ default: '' }) dataObj = { token: '', key: '' }

  get imageUrl () {
    return this.value
  }

  emitInput (value) {
    this.$emit('input', value)
  }

  rmImage () {
    this.emitInput('')
  }

  handleImageSuccess (res) {
    this.emitInput(res.files.file)
  }
}
</script>
