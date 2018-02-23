<template>
    <cytoscape :data="cytoConfig"/>
</template>

<script>
import Cytoscape from './components/Cytoscape'
import config from '@/utils/dummy-config'

export default {
  name: 'App',
  computed: {
    cytoConfig () {
      return config
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
