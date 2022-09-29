<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="单行文本" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入手机号" :maxlength="11" show-word-limit clearable
                  prefix-icon="el-icon-mobile" :style="{width: '100%'}"
        />
      </el-form-item>
      <el-form-item size="small">
        <el-button type="primary" @click="submitForm">
          提交
        </el-button>
        <el-button @click="resetForm">
          重置
        </el-button>
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
  components: {},
  mixins: typeof (CustomPropMixins) === 'undefined' ? [] : [CustomPropMixins],
  props: [],
  data () {
    return {
      formData: {
        mobile: undefined
      },
      rules: {
        mobile: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }, {
          pattern: /^1(3|4|5|7|8|9)\d{9}$/,
          message: '手机号格式错误',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {},
  watch: {
    formData: {
      handler (newName, oldName) {
        console.log('watch----')
        console.log(newName, oldName)
        if (this.content) {
          this.content.value = {
            ...this.formData
          }
        }
      },
      deep: true
    }
  },
  created () {
    if (this.propInfo && this.content) {
      this.formData = {
        ...this.propInfo.defaultValue,
        ...this.content.value
      }
    }
  },
  mounted () {},
  methods: {
    submitForm () {
      this.$refs.elForm.validate(valid => {
        if (!valid) return undefined
        // TODO 提交表单
        return undefined
      })
    },
    resetForm () {
      this.$refs.elForm.resetFields()
    },
    handleValueChange (val) {
      console.log('NewDemo prop - Value is change to ', val)
    },
    check () {
      return new Promise((resolve, reject) => {
        this.$refs.elForm.validate((valid, e) => {
          valid ? resolve(valid) : reject(valid)
          return valid
        })
      })
    }
  }
}

</script>
<style>
</style>
