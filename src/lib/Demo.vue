<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="日期选择" prop="field101">
        <el-date-picker v-model="formData.field101" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
          :style="{width: '100%'}" placeholder="请选择日期选择" clearable></el-date-picker>
      </el-form-item>
      <el-form-item label="编辑器" prop="field102">
        <tinymce v-model="formData.field102" placeholder="请输入编辑器" :height="300"></tinymce>
      </el-form-item>
      <el-form-item size="small">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import {
  CustomPropMixins
}
from '@gundam/customprop-sdk'
export default {
  mixins: typeof(CustomPropMixins) === 'undefined' ? [] : [CustomPropMixins],
  components: {},
  props: [],
  data() {
    return {
      formData: {
        field101: "2022-09-29",
        field102: null,
      },
      rules: {
        field101: [{
          required: true,
          message: '请选择日期选择',
          trigger: 'change'
        }],
        field102: [{
          required: true,
          message: '请输入编辑器',
          trigger: 'blur'
        }],
      },
    }
  },
  computed: {},
  watch: {
    formData: {
      handler(newName, oldName) {
        console.log('watch----')
        console.log(newName, oldName)
        if (this.content) {
          this.content.value = {
            ...this.formData
          }
        }
      },
      deep: true
    },
  },
  created() {
    if (this.propInfo && this.content) {
      this.formData = {
        ...this.propInfo.defaultValue,
        ...this.content.value
      }
    }
  },
  mounted() {},
  methods: {
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return undefined
        // TODO 提交表单
        return undefined
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    handleValueChange(val) {
      console.log('NewDemo prop - Value is change to ', val)
    },
    check() {
      return new Promise((resolve, reject) => {
        this.$refs['elForm'].validate((valid, e) => {
          valid ? resolve(valid) : reject(valid)
          return valid
        })
      })
    },
  }
}

</script>
<style>
</style>
