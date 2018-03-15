<template>
  <div id="cytoscape" ref="cytoscape"></div>
</template>
<script>
import CyObj from './cy-object'

export default {
  props: ['config', 'preConfig', 'afterCreated'],
  mounted () {
    // create a cytoscape instance using the referenced div
    const container = this.$refs.cytoscape
    const config = {
      container, // container to render in
      ...this.config // the data passed
    }
    CyObj.setConfig(config, this.preConfig, this.afterCreated)
  }
}
</script>
<style scoped>
#cytoscape {
  width: 100%;
  height: 100%;
}
</style>
