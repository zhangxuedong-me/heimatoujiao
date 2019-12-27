import layoutAside from './layout-aside.vue'
import layoutHeader from './layout-header.vue'
import breadCrum from './commont/bread-crum.vue'
import coverImages from './cover-images.vue'
import uploadImage from './upload-image.vue'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-bits', breadCrum)
    Vue.component('quill-editor', quillEditor) // 注册全局富文本编辑器组件
    Vue.component('cover-images', coverImages)
    Vue.component('upload-image', uploadImage)
  }
}
