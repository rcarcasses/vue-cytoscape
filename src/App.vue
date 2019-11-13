<template>
  <div id="app">
    <Cytoscape
      ref="cy"
      :config="config"
      :preConfig="preConfig"
      :afterCreated="afterCreated"
      v-on:mousedown="addNode"
      v-on:cxttap="reactiveUpdate"
    >
      <cy-element
        v-for="def in elements"
        :key="`${def.data.id}`"
        :definition="def"
        v-on:click="deleteNode($event, def.data.id)"
        v-on:cxttap="updateNode"
        :sync="true"
      />
    </Cytoscape>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {
  Core,
  EventObject,
  ElementDefinition,
  NodeSingular,
  EdgeSingular
} from 'cytoscape'
import Cytoscape from '@/components/Cytoscape'
import CyElement from '@/components/CyElement'
import config from '@/example-config.ts'
import eles from '@/example-elements.ts'
import uuid from 'uuid/v4'

@Component({
  components: {
    Cytoscape,
    CyElement
  }
})
export default class App extends Vue {
  cy: Core | undefined
  elements = eles

  addNode(event: EventObject) {
    // Example of adding node
    if (event.target === (this.$refs.cy as Cytoscape).instance) {
      const id: string = uuid()
      this.elements.push({
        data: {
          id,
          label: 'new'
        },
        position: event.position,
        group: 'nodes'
      })
    }
  }

  deleteNode(event: Event, id: string) {
    // Example of reactivelyeactively delete an element
    const ele = this.elements.some((ele, index) => {
      const match = ele.data.id == id
      if (match) {
        // Using JS 'delete array(index)' won't trigger a reaction, so use this instead
        this.$delete(this.elements, index)
      }
      return match
    })
  }

  updateNode(event: any) {
    // Example of directly changing the data by target
    let label: string = event.target.data().label
    label += label[0]
    event.target.data({ label })
  }

  reactiveUpdate(event: any) {
    if (event.target === (this.$refs.cy as Cytoscape).instance) {
      // Example of changing this component's "elements" array to reactively change the data
      this.elements[0].data.label = 'Updated Reactively'
      if (this.elements[1].position) this.elements[1].position.x -= 100
    }
  }

  preConfig(cytoscape: any) {
    console.log(`calling preConfig`, cytoscape)
  }

  afterCreated(cy: Core) {
    this.cy = cy
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
