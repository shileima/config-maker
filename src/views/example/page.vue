<template>
  <div>
    <el-form
      ref="elForm"
      :model="formData"
      :rules="rules"
      size="medium"
      label-width="100px"
    >
      <el-form-item label="单行文本" prop="mobile">
        <el-input
          v-model="formData.mobile"
          placeholder="请输入手机号"
          :maxlength="11"
          show-word-limit
          prefix-icon="el-icon-mobile"
          :style="{width: '100%'}"
        />
      </el-form-item>

      <el-form-item label="开关" prop="switch" required>
        <el-switch v-model="formData.switch" active-color="#B74848" />
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
import { Component, Prop, Vue } from 'vue-property-decorator'

export default {
  components: {},
  mixins: [],
  props: [],
  data () {
    return {
      formData: {
        mobile: '123123213',
        switch: true
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            pattern: /^1(3|4|5|7|8|9)\d{9}$/,
            message: '手机号格式错误',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {
    formData: {
      handler (newName, oldName) {
        console.log('watch----')
        console.log(newName, oldName)
        this.content.value = {
          ...this.formData
        }
      },
      deep: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    submitForm () {
      this.$refs.elForm.validate(valid => {
        if (!valid) return undefined
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
