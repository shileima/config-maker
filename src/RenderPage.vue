<template>
  <div>
    <div style="margin: 20px">
      <el-radio-group v-if="pageList.length > 0" v-model="isShow" size="mini">
        <el-radio
          v-for="(item, index) in pageList"
          :key="index"
          :label="item"
          border
          @change="handleChange"
        >
          {{ item }}
        </el-radio>
      </el-radio-group>
    </div>
    <keep-alive v-if="isShow">
      <transition name="slide-fade">
        <component :is="curShow" />
      </transition>
    </keep-alive>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data () {
    return {
      isShow: '',
      pageList: [],
      fileNameMap: new Map()
    }
  },
  computed: {
    curShow () {
      return this.fileNameMap.get(this.isShow)
    }
  },
  created () {
    const requireComponent = require.context('./lib', true, /\.vue$/)
    this.pageList = requireComponent.keys()
    this.fileNameMap = new Map()
    this.pageList.forEach(fileNamePath => {
      const name = fileNamePath.replace(/^\.\//, '').replace(/\.\w+$/, '')
      this.fileNameMap.set(fileNamePath, name)
    })

    requireComponent.keys().forEach(fileName => {
      const componetConfig = requireComponent(fileName)
      const componetName = this.fileNameMap.get(fileName) // 将./和.vue字符串去掉
      Vue.component(componetName, componetConfig.default || componetConfig)
    })

    this.isShow = `./${this.$router.history.current.params.name}.vue`
  },
  methods: {
    handleChange () {
      this.$router.push(`/page/${this.fileNameMap.get(this.isShow)}`)
    }
  }
}
</script>
<style lang="scss">
.active {
  background: hotpink;
  color: #ccc;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
