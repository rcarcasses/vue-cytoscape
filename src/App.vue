<template>
  <div id="holder">
    <cytoscape :config="config"/>
  </div>
</template>

<script>
import Cytoscape from './components/Cytoscape'
import config from '@/utils/dummy-config'

export default {
  name: 'App',
  data () {
    return {
      config: config
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
