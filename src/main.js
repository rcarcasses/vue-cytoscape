import Vue from 'vue'
import VueCytoscape from './plugin'
import LayoutExtensionsExample from './LayoutExtensionsExample'

Vue.use(VueCytoscape)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { LayoutExtensionsExample },
  template: '<LayoutExtensionsExample/>'
})
