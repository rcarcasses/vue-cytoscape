export default {
  elements: [
    {
      // node a
      data: { id: 'a' },
      position: { x: 589, y: 182 }
    },
    {
      // node b
      data: { id: 'b' },
      position: { x: 689, y: 282 }
    },
    {
      // node c
      data: { id: 'c' },
      position: { x: 489, y: 282 }
    }
    /* {
      // edge ab
      data: { id: 'ab', source: 'a', target: 'b' }
    } */
  ],
  style: [
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        label: 'data(id)'
      }
    },
    {
      selector: 'edge',
      style: {
        width: 3,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
  ],
  layout: {
    name: 'grid',
    rows: 1
  }
}
