import Vue from 'vue'
import Cytoscape from '@/components/Cytoscape'
import config from '@/utils/dummy-config'

describe('Cytoscape.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Cytoscape)
    const vm = new Constructor().$mount()
    // TODO
    expect(1)
      .toEqual(1)
  })
})