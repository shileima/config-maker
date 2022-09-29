<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="small" label-width="100px">
      <el-form-item label="上传" prop="field139" required>
        <el-upload ref="field139" :file-list="field139fileList" :action="field139Action"
                   :before-upload="field139BeforeUpload" list-type="picture-card"
        >
          <i class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="计数器" prop="field120">
        <el-input-number v-model="formData.field120" placeholder="计数器" :step="1" />
      </el-form-item>
      <el-form-item label="编辑器" prop="field124">
        <tinymce v-model="formData.field124" placeholder="请输入编辑器" :height="300" />
      </el-form-item>
      <el-form-item label="单行文本" prop="mobile">
        <el-input v-model="formData.mobile" placeholder="请输入手机号" :maxlength="11" show-word-limit
                  prefix-icon="el-icon-mobile" :style="{width: '100%'}"
        />
      </el-form-item>
      <el-form-item label="下拉选择" prop="field123">
        <el-select v-model="formData.field123" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">
          <el-option v-for="(item, index) in field123Options" :key="index" :label="item.label"
                     :value="item.value" :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="级联选择" prop="field109">
        <el-cascader v-model="formData.field109" :options="field109Options" :props="field109Props"
                     :style="{width: '100%'}" placeholder="请选择级联选择" clearable
        />
      </el-form-item>
      <el-form-item label="多选框组" prop="field110">
        <el-checkbox-group v-model="formData.field110" size="medium">
          <el-checkbox v-for="(item, index) in field110Options" :key="index" :label="item.value"
                       :disabled="item.disabled"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="时间范围" prop="field112">
        <el-time-picker v-model="formData.field112" is-range format="HH:mm:ss" value-format="HH:mm:ss"
                        :style="{width: '100%'}" start-placeholder="开始时间" end-placeholder="结束时间" range-separator="至"
                        clearable
        />
      </el-form-item>
      <el-form-item label="滑块" prop="field111" required>
        <el-slider v-model="formData.field111" :max="100" :step="1" />
      </el-form-item>
      <el-form-item label="颜色选择" prop="field119" required>
        <el-color-picker v-model="formData.field119" size="medium" />
      </el-form-item>
      <el-form-item label="评分" prop="field113">
        <el-rate v-model="formData.field113" :max="5" />
      </el-form-item>
      <el-form-item label="下拉选择" prop="field115">
        <el-select v-model="formData.field115" placeholder="请选择下拉选择" clearable :style="{width: '100%'}">
          <el-option v-for="(item, index) in field115Options" :key="index" :label="item.label"
                     :value="item.value" :disabled="item.disabled"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="单选框组" prop="field118">
        <el-radio-group v-model="formData.field118" size="medium">
          <el-radio v-for="(item, index) in field118Options" :key="index" :label="item.value"
                    :disabled="item.disabled"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="按钮" prop="field117">
        <el-button type="primary" icon="el-icon-search" size="medium">
          主要按钮
        </el-button>
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
        field139: null,
        field120: 7,
        field124: '<p><strong>你好～</strong></p>\n<p><span style="color: #e03e2d;"><em>我是石磊</em></span></p>\n<p><span style="color: #e03e2d;"><em><img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg2020.cnblogs.com%2Fblog%2F1459640%2F202004%2F1459640-20200410205949644-1506475277.png&amp;refer=http%3A%2F%2Fimg2020.cnblogs.com&amp;app=2002&amp;size=f9999,10000&amp;q=a80&amp;n=0&amp;g=0n&amp;fmt=auto?sec=1666706393&amp;t=63a72a67ec1b328468f25071fd29a93d" alt="" width="399" height="200" /></em></span></p>',
        mobile: '123123213',
        field123: 1,
        field109: [1, 2],
        field110: [],
        field112: ['21:40:47', '22:40:47'],
        field111: 37,
        field119: '#D32929',
        field113: 0,
        field115: undefined,
        field118: 1,
        field117: undefined
      },
      rules: {
        field120: [{
          required: true,
          message: '计数器',
          trigger: 'blur'
        }],
        field124: [{
          required: true,
          message: '请输入编辑器',
          trigger: 'blur'
        }],
        mobile: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }, {
          pattern: /^1(3|4|5|7|8|9)\d{9}$/,
          message: '手机号格式错误',
          trigger: 'blur'
        }],
        field123: [{
          required: true,
          message: '请选择下拉选择',
          trigger: 'change'
        }],
        field109: [{
          required: true,
          type: 'array',
          message: '请至少选择一个级联选择',
          trigger: 'change'
        }],
        field110: [{
          required: true,
          type: 'array',
          message: '请至少选择一个多选框组',
          trigger: 'change'
        }],
        field112: [{
          required: true,
          type: 'array',
          message: '请至少选择一个时间范围',
          trigger: 'change'
        }],
        field113: [{
          required: true,
          message: '评分不能为空',
          trigger: 'change'
        }],
        field115: [{
          required: true,
          message: '请选择下拉选择',
          trigger: 'change'
        }],
        field118: [{
          required: true,
          message: '单选框组不能为空',
          trigger: 'change'
        }]
      },
      field139Action: 'https://yapi.sankuai.com/mock/28111/upload',
      field139fileList: [],
      field123Options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }],
      field109Options: [],
      field110Options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }, {
        label: '选项3',
        value: 3
      }],
      field115Options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }],
      field118Options: [{
        label: '选项一',
        value: 1
      }, {
        label: '选项二',
        value: 2
      }],
      field109Props: {
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
    this.getField109Options()
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
    field139BeforeUpload (file) {
      const isRightSize = file.size / 1024 / 1024 < 2
      if (!isRightSize) {
        this.$message.error('文件大小超过 2MB')
      }
      return isRightSize
    },
    getField109Options () {
      // 注意：this.$axios是通过Vue.prototype.$axios = axios挂载产生的
      this.$axios({
        method: 'get',
        url: 'https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList'
      }).then(resp => {
        const {
          data
        } = resp
        this.field109Options = data.list
      })
    }
  }
}

</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}

.el-rate {
  display: inline-block;
  vertical-align: text-top;
}

</style>
