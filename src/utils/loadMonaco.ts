import loadScript from './loadScript'
import ELEMENT from 'element-ui'
import pluginsConfig from './pluginsConfig'

// monaco-editor单例
// @ts-ignore
let monacoEidtor

/**
 * 动态加载monaco-editor cdn资源
 * @param {Function} cb 回调，必填
 */
export default function loadMonaco (cb: any) {
  // @ts-ignore
  if (monacoEidtor) {
    cb(monacoEidtor)
    return
  }

  const { monacoEditorUrl: vs } = pluginsConfig

  // 使用element ui实现加载提示
  const loading = ELEMENT.Loading.service({
    fullscreen: true,
    lock: true,
    text: '编辑器资源初始化中...',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.5)'
  })
  // @ts-ignore
  !window.require && (window.require = {})
  // @ts-ignore
  !window.require.paths && (window.require.paths = {})
  // @ts-ignore
  window.require.paths.vs = vs
  loadScript(`${vs}/loader.js`, () => {
    // debugger
    window.require(['vs/editor/editor.main'], () => {
      loading.close()
      // @ts-ignore
      monacoEidtor = window.monaco
      cb(monacoEidtor)
    })
  })
}
