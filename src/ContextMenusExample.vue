<template>
  <div id="holder">
    <cytoscape :key="'cyKey()'" :config="config" :preConfig="preConfig" :afterCreated="afterCreated"/>
  </div>
</template>

<script>
import Cytoscape from './components/Cytoscape'
import config from '@/utils/dummy-config'
import CyObj from '@/components/cy-object'
import jquery from 'jquery'
import contextMenus from 'cytoscape-context-menus'
import 'cytoscape-context-menus/cytoscape-context-menus.css'

export default {
  name: 'App',
  data () {
    return {
      config: config,
      i: 0
    }
  },
  methods: {
    preConfig (cytoscape) {
      console.log('calling pre-config')
      contextMenus(cytoscape, jquery)
      // cytoscape.use(contextMenus, jquery)
    },
    afterCreated (cy) {
      console.log('after created')
      // demo your core ext
      cy.contextMenus({
        menuItems: [
          {
            id: 'remove',
            content: 'remove',
            tooltipText: 'remove',
            image: {src: 'remove.svg', width: 12, height: 12, x: 6, y: 4},
            selector: 'node, edge',
            onClickFunction: function (event) {
              var target = event.target || event.cyTarget
              target.remove()
            },
            hasTrailingDivider: true
          },
          {
            id: 'hide',
            content: 'hide',
            tooltipText: 'hide',
            selector: '*',
            onClickFunction: function (event) {
              var target = event.target || event.cyTarget
              target.hide()
            },
            disabled: false
          }
        ]
      })
    },
    cyKey () {
      const that = this
      CyObj.reset()
      CyObj.instance.then(cy => {
        console.log('cy', cy)
        cy.on('tap', event => {
          console.log('tapped')
          that.i++
        })
      })
      console.log('computing cyKey cy' + this.i)
      return 'cy' + this.i
    }
  },
  components: {
    Cytoscape
  }
}
</script>

<style>
#holder {
  width: 100%;
  height: 400px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
