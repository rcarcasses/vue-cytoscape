<template>
  <cytoscape :config="config" :width="width" :height="height"/>
</template>

<script>
import Cytoscape from './components/Cytoscape'
import config from '@/utils/dummy-config'

export default {
  name: 'App',
  data () {
    return {
      config: config,
      width: 500,
      height: 400
    }
  },
  components: {
    Cytoscape
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
