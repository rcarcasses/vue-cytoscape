import { ElementDefinition } from 'cytoscape'

const eles: ElementDefinition[] = [
  {
    data: {
      id: 'a',
      label: 'a'
    },
    position: {
      x: 589,
      y: 182
    },
    group: 'nodes'
  },
  {
    data: {
      id: 'b',
      label: 'b'
    },
    position: {
      x: 689,
      y: 282
    },
    group: 'nodes'
  },
  {
    data: {
      id: 'c',
      label: 'c'
    },
    position: {
      x: 489,
      y: 282
    },
    group: 'nodes'
  },
  {
    data: {
      id: 'ab',
      source: 'a',
      target: 'b'
    },
    group: 'edges'
  }
]

export default eles
