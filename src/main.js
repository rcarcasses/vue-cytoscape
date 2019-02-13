import Vue from 'vue'
// import ChidrenElementsExample from './ChidrenElementsExample'
import VueCytoscape from './plugin'
// import CtxMenuExample from './CtxMenuExample'
// import ContextMenusExample from './ContextMenusExample'
// import LayoutExtensionsExample from './LayoutExtensionsExample'
import EdgeHandlesExample from './EdgeHandlesExample'

Vue.use(VueCytoscape)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { EdgeHandlesExample },
  template: '<EdgeHandlesExample/>'
})
