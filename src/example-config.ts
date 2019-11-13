import { CytoscapeOptions } from 'cytoscape'

const config: CytoscapeOptions = {
  elements: [],
  style: [
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        label: 'data(label)'
      }
    },
    {
      selector: 'edge',
      style: {
        width: 7,
        'line-color': 'blue',
        'target-arrow-color': '#aaaaaa',
        'target-arrow-shape': 'triangle'
      }
    }
  ],
  layout: {
    animate: true, // whether to animate changes to the layout
    animationDuration: 500, // duration of animation in ms, if enabled
    animationEasing: undefined, // easing of animation, if enabled
    name: 'grid',
    rows: 1
  }
}

export default config
