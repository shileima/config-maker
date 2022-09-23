<template>
  <div>
    <el-dialog
      v-bind="$attrs"
      title="Dialog Titile"
      visible="true"
      v-on="$listeners"
      @open="onOpen"
      @close="onClose"
    >
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
            clearable
            prefix-icon="el-icon-mobile"
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item label="滑块" prop="field101" required>
          <el-slider
            v-model="formData.field101"
            :max="100"
            :step="1"
          />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">
          取消
        </el-button>
        <el-button type="primary" @click="handelConfirm">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  inheritAttrs: false,
  props: [],
  data () {
    return {
      formData: {
        mobile: undefined,
        field101: 50
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
  watch: {},
  created () { },
  mounted () { },
  methods: {
    onOpen () { },
    onClose () {
      this.$refs.elForm.resetFields()
    },
    close () {
      this.$emit('update:visible', false)
    },
    handelConfirm () {
      this.$refs.elForm.validate(valid => {
        if (!valid) return
        this.close()
      })
    }
  }
}

</script>
<style>
</style>
