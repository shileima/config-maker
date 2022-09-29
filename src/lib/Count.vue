<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="计数器" prop="field101">
        <el-input-number v-model="formData.field101" placeholder="计数器计数器" :step="1" />
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
        field101: undefined
      },
      rules: {
        field101: [{
          required: true,
          message: '计数器计数器',
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
