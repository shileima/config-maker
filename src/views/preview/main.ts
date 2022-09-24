import Vue from 'vue'
import { loadScriptQueue } from '@/utils/loadScript'
import axios from 'axios'
import Tinymce from '@/components/tinymce/index.vue'

Vue.component('tinymce', Tinymce)
Vue.prototype.$axios = axios

const $previewApp = document.getElementById('previewApp')
const childAttrs:any = {
  file: '',
  dialog: ' width="600px" class="dialog-width" v-if="visible" :visible.sync="visible" :modal-append-to-body="false" '
}

window.addEventListener('message', init, false)

function buildLinks (links: any) {
  let strs = ''
  links.forEach((url: string) => {
    strs += `<link href="${url}" rel="stylesheet">`
  })
  return strs
}

function init (event: any) {
  if (event.data.type === 'refreshFrame') {
    const code = event.data.data
    const attrs = childAttrs[code.generateConf.type]
    let links = ''

    if (Array.isArray(code.links) && code.links.length > 0) {
      links = buildLinks(code.links)
    }

    ($previewApp as any).innerHTML = `${links}<style>${code.css}</style><div id="app"></div>`

    if (Array.isArray(code.scripts) && code.scripts.length > 0) {
      loadScriptQueue(code.scripts, () => {
        debugger
        newVue(attrs, code.js, code.html)
      })
    } else {
      try {
        newVue(attrs, code.js, code.html)
      } catch (error) {
        console.log(error)
      }
    }
  }
}

function newVue (attrs: any, main: any, html: any) {
  try {
    main = eval(`(${main})`)
    main.template = `<div>${html}</div>`
    new Vue({
      components: {
        child: main
      },
      data () {
        return {
          visible: true
        }
      },
      template: `<div class='aaa'><child ${attrs}/></div>`
    }).$mount('#app')
  } catch (error) {
    console.log(error)
  }
}
