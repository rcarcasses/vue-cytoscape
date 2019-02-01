<template>
  <div id="cytoscape" ref="cytoscape">
    <slot></slot>
  </div>
</template>
<script>
import VueCyObj from './cy-object'

export default {
  props: ['config', 'preConfig', 'afterCreated'],
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
  }
}
</script>
<style scoped>
#cytoscape {
  width: 100%;
  height: 100%;
}
</style>
