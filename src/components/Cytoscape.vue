<template>
  <div v-bind:style="{ width: width + 'px', height: height + 'px' }">
    <div id="cytoscape" ref="cytoscape"></div>
  </div>
</template>
<script>
import CyObj from './cy-object'

export default {
  props: ['config', 'width', 'height'],
  mounted () {
    // create a cytoscape instance using the referenced div
    const container = this.$refs.cytoscape
    const config = {
      container, // container to render in
      ...this.config // the data passed
    }
    CyObj.config = config
  }
}
</script>
<style scoped>
#cytoscape {
  width: 100%;
  height: 100%;
}
</style>
