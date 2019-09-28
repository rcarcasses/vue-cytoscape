import CyElement from '@/components/CyElement'
import VueCytoscape from '@/components/Cytoscape'
import { VueConstructor } from 'vue'

export default {
  install (Vue: VueConstructor) {
    Vue.component('cytoscape', VueCytoscape)
    Vue.component('cy-element', CyElement)
  }
}

export { VueCytoscape, CyElement }