<template>
  <div id="app">
    <Cytoscape ref="cy" :config="config" v-on:mousedown="addNode" v-on:cxttapstart="updateNode">
      <cy-element
        v-for="def in elements"
        :key="`${def.data.id}`"
        :definition="def"
        v-on:mousedown="deleteNode($event, def.data.id)"
      />
    </Cytoscape>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Core, EventObject } from 'cytoscape'
import Cytoscape from '@/components/Cytoscape'
import CyElement from '@/components/CyElement'
import config from '@/example-config.json'

@Component({
  components: {
    Cytoscape,
    CyElement
  }
})
export default class App extends Vue {
  addNode(event: EventObject) {
    if (event.target === (this.$refs.cy as Cytoscape).instance)
      console.log('adding node', event)
  }

  deleteNode(event: Event, id: string) {
    console.log('node clicked', id)
  }

  updateNode(event: any) {
    console.log('right click node', event)
  }

  get elements() {
    return config.elements
  }

  get config() {
    const noElementsConfig = { ...config }
    delete noElementsConfig.elements
    return noElementsConfig
  }
}
</script>
<style>
#app {
  width: 100%;
  height: 400px;
}
</style>