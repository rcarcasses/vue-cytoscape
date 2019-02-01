import Vue from 'vue'
import ChidrenElementsExample from './ChidrenElementsExample'
import VueCytoscape from './plugin'
// import CtxMenuExample from './CtxMenuExample'
// import ContextMenusExample from './ContextMenusExample'

Vue.use(VueCytoscape)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { ChidrenElementsExample },
  template: '<ChidrenElementsExample/>'
})
