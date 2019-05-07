import Vue from 'vue'
import VueCytoscape from './plugin'
import App from './LayoutExtensionsWithCyElementsExample'

Vue.use(VueCytoscape)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
