<template>
  <div id="cytoscape" ref="cytoscape">
    <cy-element
      v-for="def in elements"
      :key="`${def.data.id}`"
      :definition="def"
    ></cy-element>
    <slot></slot>
  </div>
</template>
<script>
import VueCyObj from './cy-object'

export default {
  props: [
    'config',
    'preConfig',
    'afterCreated',
    'elementAdded',
    'elementRemoved'
  ],
  data () {
    return {
      elements: []
    }
  },
  created () {
    let els = []
    if (this.config && this.config.elements) {
      if (
        this.config.elements.nodes &&
        Array.isArray(this.config.elements.nodes)
      ) {
        els = [
          ...els,
          ...this.config.elements.nodes.map(n => ({ group: 'nodes', ...n }))
        ]
      }
      if (
        this.config.elements.edges &&
        Array.isArray(this.config.elements.edges)
      ) {
        els = [
          ...els,
          ...this.config.elements.edges.map(n => ({
            ...n,
            group: 'edges',
            data: {
              id: n.data.id ? n.data.id : `${n.data.source}_${n.data.target}`,
              ...n.data
            }
          }))
        ]
      }

      if (Array.isArray(this.config.elements)) {
        els = [...this.config.elements]
      }
    }

    this.elements = els
  },
  async mounted () {
    // create a cytoscape instance using the referenced div
    const container = this.$refs.cytoscape
    const config = {
      container, // container to render in
      ...this.config // the data passed
    }
    VueCyObj.setConfig(config, this.preConfig, this.afterCreated)
    const cy = await VueCyObj.instance
    // register all the component events as cytoscape ones
    for (const [eventType, callback] of Object.entries(this.$listeners)) {
      cy.on(eventType, event => callback(event))
    }
    // listen on elements creation/removal, and perform the reflection here
    cy.on('add', event => {
      const element = {
        group: event.target.group(),
        data: event.target.data()
      }
      const { elements } = this
      const addReflection = () => {
        elements.push(element)
      }
      // if there is a hook, then pass the data to it
      if (this.elementAdded) this.elementAdded(element, addReflection)
      // otherwise, just reflect the changes here
      else addReflection()
    })
    cy.on('remove', event => {
      const id = event.target.id()
      const { elements } = this
      const removeReflection = () => {
        // console.log('event removing: ', id)
        // remove the element, in place
        elements.splice(elements.findIndex(n => n.data.id === id), 1)
      }
      // if there is a hook, then pass the data to it
      if (this.elementRemoved) this.elementRemoved(id, removeReflection)
      // otherwise, just reflect the changes here
      else removeReflection()
    })
  }
}
</script>
<style scoped>
#cytoscape {
  width: 100%;
  height: 100%;
}
</style>
