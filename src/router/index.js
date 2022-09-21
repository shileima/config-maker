import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/index/Home.vue'
import Dialog from '@/example/dialog.vue'
import Page from '@/example/page.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/dialog',
    name: 'dialog',
    component: Dialog
  },
  {
    path: '/page',
    name: 'page',
    component: Page
  },
  {
    path: '/parser',
    name: 'parser',
    component: () => import(/* webpackChunkName: "parser-example" */'@/components/parser/example/Index.vue')
  },
  {
    path: '/tinymce',
    name: 'tinymce',
    component: () => import(/* webpackChunkName: "tinymce-example" */'@/components/tinymce/example/Index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
