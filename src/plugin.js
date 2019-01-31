import CyElement from '@/components/CyElement.vue'
import VueCytoscape from '@/components/Cytoscape.vue'
import CyObj from '@/components/cy-object'

export default {
  install (Vue, options) {
    Vue.component('cytoscape', VueCytoscape)
    Vue.component('cy-element', CyElement)
    Vue.prototype.$cytoscape = CyObj
  }
}

export { VueCytoscape, CyElement }
