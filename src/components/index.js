import layoutAside from './layout-aside.vue'
import layoutHeader from './layout-header.vue'
import breadCrum from './commont/bread-crum.vue'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-bits', breadCrum)
  }
}
