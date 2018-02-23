import Cytoscape from '@/components/Cytoscape.vue'
import CyObj from '@/components/cy-object'

export default {
  install (Vue, options) {
    Vue.component('cytoscape', Cytoscape)
    Vue.prototype.$cytoscape = CyObj.instance
  }
}
