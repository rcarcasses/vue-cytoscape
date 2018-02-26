<template>
  <div id="holder">
    <cytoscape :key="cyKey()" :config="config"/>
  </div>
</template>

<script>
import Cytoscape from './components/Cytoscape'
import config from '@/utils/dummy-config'
import CyObj from '@/components/cy-object'

export default {
  name: 'App',
  data () {
    return {
      config: config,
      i: 0
    }
  },
  methods: {
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
