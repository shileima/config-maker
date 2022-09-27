<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="100px">
      <el-form-item label="单行文本" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入手机号" :maxlength="11" show-word-limit clearable
                  prefix-icon="el-icon-mobile" :style="{width: '100%'}"
        />
      </el-form-item>
      <el-form-item label="下拉选择" prop="field102">
        <el-select v-model="formData.field102" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">
          <el-option v-for="(item, index) in field102Options" :key="index" :label="item.label"
                     :value="item.value" :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="级联选择" prop="field103">
        <el-cascader v-model="formData.field103" :options="field103Options" :props="field103Props"
                     :style="{width: '100%'}" placeholder="请选择级联选择" clearable
        />
      </el-form-item>
      <el-form-item label="日期选择" prop="field104">
        <el-date-picker v-model="formData.field104" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                        :style="{width: '100%'}" placeholder="请选择日期选择" clearable
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
        mobile: undefined,
        field102: undefined,
        field103: [],
        field104: null
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
        field102: [{
          required: true,
          message: '请选择下拉选择',
          trigger: 'change'
        }],
        field103: [{
          required: true,
          type: 'array',
          message: '请至少选择一个级联选择',
          trigger: 'change'
        }],
        field104: [{
          required: true,
          message: '请选择日期选择',
          trigger: 'change'
        }]
      },
      field102Options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }],
      field103Options: [],
      field103Props: {
        multiple: false,
        label: 'label',
        value: 'value',
        children: 'children'
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
    this.getField103Options()
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
    },
    getField103Options () {
      // 注意：this.$axios是通过Vue.prototype.$axios = axios挂载产生的
      this.$axios({
        method: 'get',
        url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList'
      }).then(resp => {
        const {
          data
        } = resp
        this.field103Options = data.list
      })
    }
  }
}

</script>
<style>
</style>
