import Vue from 'vue'
import VueCytoscape from './plugin'
import App2 from './App2'

Vue.use(VueCytoscape)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App2 },
  template: '<App2/>'
})
