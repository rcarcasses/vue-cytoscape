<template>
  <div id="holder">
    <cytoscape
      :config="config"
      v-on:mousedown="addNode"
      v-on:cxttapstart="updateNode"
    >
      <cy-element
        v-for="def in elements"
        :key="`${def.data.id}`"
        :definition="def"
      />
    </cytoscape>
  </div>
</template>

<script>
import Cytoscape from './components/Cytoscape'
import config from '@/utils/dummy-config'
import CyElement from '@/components/CyElement'

const elements = [...config.elements]
delete config.elements

export default {
  name: 'App',
  data () {
    return {
      config,
      i: 0,
      elements
    }
  },
  methods: {
    addNode (event) {
      const { position } = event
      const n = {
        group: 'nodes',
        data: { id: `n${this.i++}` },
        position
      }

      this.elements = [...this.elements, n]
    },
    updateNode (event) {
      if (event.target.id) {
        const n = {
          data: { id: event.target.id(), shape: 'rectangle' },
          position: event.target.position(),
          group: 'nodes'
        }
        console.log('updating: ', n)
        const elements = [
          ...this.elements.filter(e => e.data.id !== event.target.id()),
          n
        ]
        console.log('filtered elements: ', elements)
        this.elements = elements
      }
    },
    removeNode (event) {
      if (event.target.id) {
        console.log('removing: ', event.target.id())
        this.elements = this.elements.filter(
          e => e.data.id !== event.target.id()
        )
      }
    }
  },
  components: {
    Cytoscape,
    CyElement
  }
}
</script>

<style>
#holder {
  width: 100%;
  height: 400px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
