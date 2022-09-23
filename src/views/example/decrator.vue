<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="100px">
      <el-form-item label="单行文本" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入手机号" :maxlength="11" show-word-limit
                  prefix-icon="el-icon-mobile" :style="{width: '100%'}"
        />
      </el-form-item>
      <el-form-item label="开关" prop="switch" required>
        <el-switch v-model="formData.switch" active-color="#B74848" />
      </el-form-item>
      <el-form-item label="下拉选择" prop="field103">
        <el-select v-model="formData.field103" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">
          <el-option v-for="(item, index) in field103Options" :key="index" :label="item.label"
                     :value="item.value" :disabled="item.disabled"
          />
        </el-select>
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
        mobile: '123123213',
        switch: true,
        field103: undefined
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
        }],
        field103: [{
          required: true,
          message: '请选择下拉选择',
          trigger: 'change'
        }]
      },
      field103Options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }]
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
  created () {
    this.formData = {
      ...this.propInfo.defaultValue,
      ...this.content.value
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
.el-switch.is-checked .el-switch__core::after {
  left: 100%;
  margin-left: -17px;
}

.el-switch__core:after {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  border-radius: 100%;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  width: 16px;
  height: 16px;
  background-color: #fff;
}

</style>
