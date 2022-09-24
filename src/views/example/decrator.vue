<template>
  <div>
    <el-form
      ref="elForm"
      :model="formData"
      :rules="rules"
      size="small"
      label-width="100px"
    >
      <el-form-item label="单行文本" prop="mobile">
        <el-input
          v-model="formData.mobile"
          placeholder="请输入手机号"
          :maxlength="11"
          show-word-limit
          prefix-icon="el-icon-mobile"
          :style="{ width: '100%' }"
        ></el-input>
      </el-form-item>
      <el-form-item label="级联选择" prop="field109">
        <el-cascader
          v-model="formData.field109"
          :options="field109Options"
          :props="field109Props"
          :style="{ width: '100%' }"
          placeholder="请选择级联选择"
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="多选框组" prop="field110">
        <el-checkbox-group v-model="formData.field110" size="medium">
          <el-checkbox
            v-for="(item, index) in field110Options"
            :key="index"
            :label="item.value"
            :disabled="item.disabled"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="时间范围" prop="field112">
        <el-time-picker
          v-model="formData.field112"
          is-range
          format="HH:mm:ss"
          value-format="HH:mm:ss"
          :style="{ width: '100%' }"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          range-separator="至"
          clearable
        >
        </el-time-picker>
      </el-form-item>
      <el-form-item label="滑块" prop="field111" required>
        <el-slider :max="100" :step="1" v-model="formData.field111"></el-slider>
      </el-form-item>
      <el-form-item label="上传" prop="field114" required>
        <el-upload
          ref="field114"
          :file-list="field114fileList"
          :action="field114Action"
          :before-upload="field114BeforeUpload"
        >
          <el-button size="small" type="primary" icon="el-icon-upload"
            >点击上传</el-button
          >
        </el-upload>
      </el-form-item>
      <el-form-item label="评分" prop="field113">
        <el-rate v-model="formData.field113" :max="5"></el-rate>
      </el-form-item>
      <el-form-item label="下拉选择" prop="field115">
        <el-select
          v-model="formData.field115"
          placeholder="请选择下拉选择"
          clearable
          :style="{ width: '100%' }"
        >
          <el-option
            v-for="(item, index) in field115Options"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="small">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { CustomPropMixins } from "@gundam/customprop-sdk";
export default {
  mixins: typeof CustomPropMixins === "undefined" ? [] : [CustomPropMixins],
  components: {},
  props: [],
  data() {
    return {
      formData: {
        mobile: "123123213",
        field109: [1, 2],
        field110: [],
        field112: null,
        field111: 0,
        field114: null,
        field113: 0,
        field115: undefined,
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          {
            pattern: /^1(3|4|5|7|8|9)\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur",
          },
        ],
        field109: [
          {
            required: true,
            type: "array",
            message: "请至少选择一个级联选择",
            trigger: "change",
          },
        ],
        field110: [
          {
            required: true,
            type: "array",
            message: "请至少选择一个多选框组",
            trigger: "change",
          },
        ],
        field112: [
          {
            required: true,
            message: "时间范围不能为空",
            trigger: "change",
          },
        ],
        field113: [
          {
            required: true,
            message: "评分不能为空",
            trigger: "change",
          },
        ],
        field115: [
          {
            required: true,
            message: "请选择下拉选择",
            trigger: "change",
          },
        ],
      },
      field114Action: "https://jsonplaceholder.typicode.com/posts/",
      field114fileList: [],
      field109Options: [],
      field110Options: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      field115Options: [
        {
          label: "选项一",
          value: 1,
        },
        {
          label: "选项二",
          value: 2,
        },
      ],
      field109Props: {
        multiple: false,
        label: "label",
        value: "value",
        children: "children",
      },
    };
  },
  computed: {},
  watch: {
    formData: {
      handler(newName, oldName) {
        console.log("watch----");
        console.log(newName, oldName);
        if (this.content) {
          this.content.value = {
            ...this.formData,
          };
        }
      },
      deep: true,
    },
  },
  created() {
    if (this.propInfo && this.content) {
      this.formData = {
        ...this.propInfo.defaultValue,
        ...this.content.value,
      };
    }
    this.getField109Options();
  },
  mounted() {},
  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return undefined;
        // TODO 提交表单
        return undefined;
      });
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
    handleValueChange(val) {
      console.log("NewDemo prop - Value is change to ", val);
    },
    check() {
      return new Promise((resolve, reject) => {
        this.$refs["elForm"].validate((valid, e) => {
          valid ? resolve(valid) : reject(valid);
          return valid;
        });
      });
    },
    getField109Options() {
      // 注意：this.$axios是通过Vue.prototype.$axios = axios挂载产生的
      this.$axios({
        method: "get",
        url: "https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList",
      }).then((resp) => {
        var { data } = resp;
        this.field109Options = data.list;
      });
    },
    field114BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      return isRightSize;
    },
  },
};
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
