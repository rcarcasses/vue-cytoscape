<template>
  <div id="holder">
    <div id="buttons">
      <button id="start" @click="start">Start on selected</button>
      <button id="draw-on" @click="enableDrawMode">Draw mode on</button>
      <button id="draw-off" @click="disableDrawMode">Draw mode off</button>
    </div>
    <cytoscape
      id="cy"
      :config="config"
      :preConfig="preConfig"
      :afterCreated="afterCreated"
    />
  </div>
</template>

<script>
import edgehandles from 'cytoscape-edgehandles'

const config = {
  layout: {
    name: 'grid',
    rows: 2,
    cols: 2
  },
  style: [
    {
      selector: 'node',
      style: {
        content: 'data(name)'
      }
    },
    {
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        'target-arrow-shape': 'triangle'
      }
    },
    // some style for the extension
    {
      selector: '.eh-handle',
      style: {
        'background-color': 'red',
        width: 12,
        height: 12,
        shape: 'ellipse',
        'overlay-opacity': 0,
        'border-width': 12, // makes the handle easier to hit
        'border-opacity': 0
      }
    },
    {
      selector: '.eh-hover',
      style: {
        'background-color': 'red'
      }
    },
    {
      selector: '.eh-source',
      style: {
        'border-width': 2,
        'border-color': 'red'
      }
    },
    {
      selector: '.eh-target',
      style: {
        'border-width': 2,
        'border-color': 'red'
      }
    },
    {
      selector: '.eh-preview, .eh-ghost-edge',
      style: {
        'background-color': 'red',
        'line-color': 'red',
        'target-arrow-color': 'red',
        'source-arrow-color': 'red'
      }
    },
    {
      selector: '.eh-ghost-edge.eh-preview-active',
      style: {
        opacity: 0
      }
    }
  ],
  elements: {
    nodes: [
      { data: { id: 'j', name: 'Jerry' } },
      { data: { id: 'e', name: 'Elaine' } },
      { data: { id: 'k', name: 'Kramer' } },
      { data: { id: 'g', name: 'George' } }
    ],
    edges: [
      { data: { source: 'j', target: 'e' } },
      { data: { source: 'j', target: 'k' } },
      { data: { source: 'j', target: 'g' } },
      { data: { source: 'e', target: 'j' } },
      { data: { source: 'e', target: 'k' } },
      { data: { source: 'k', target: 'j' } },
      { data: { source: 'k', target: 'e' } },
      { data: { source: 'k', target: 'g' } },
      { data: { source: 'g', target: 'j' } }
    ]
  }
}

export default {
  name: 'App',
  data () {
    return {
      config,
      i: 1
    }
  },
  methods: {
    preConfig (cytoscape) {
      cytoscape.use(edgehandles)
    },
    afterCreated (cy) {
      console.log('cy: ', cy)
      cy.edgehandles().enable()
    },
    async enableDrawMode () {
      console.log('enabling draw mode: ')
      const cy = await this.$cytoscape.instance
      cy.edgehandles().enableDrawMode()
    },
    async disableDrawMode () {
      console.log('disabling draw mode: ')
      const cy = await this.$cytoscape.instance
      cy.edgehandles().disableDrawMode()
    },
    async start () {
      console.log('starting ')
      const cy = await this.$cytoscape.instance
      cy.edgehandles().start(cy.$('node:selected'))
    }
  }
}
</script>
<style>
#holder {
  width: 100%;
  height: 600px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#cy {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 999;
}
h1 {
  opacity: 0.5;
  font-size: 1em;
  font-weight: bold;
}
#buttons {
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 99999;
}
</style>
