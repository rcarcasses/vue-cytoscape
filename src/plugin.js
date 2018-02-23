import VueCytoscape from '@/components/Cytoscape.vue'
import CyObj from '@/components/cy-object'

export default {
  install (Vue, options) {
    Vue.component('cytoscape', VueCytoscape)
    Vue.prototype.$cytoscape = CyObj.instance
  }
}

export { VueCytoscape }
