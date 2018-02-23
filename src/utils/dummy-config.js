export default {
  elements: [
    { // node a
      data: { id: 'a' }
    }, { // node b
      data: { id: 'b' }
    }, { // edge ab
      data: { id: 'ab', source: 'a', target: 'b' }
    }
  ],
  style: [
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(id)'
      }
    }, {
      selector: 'edge',
      style: {
        'width': 3,
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
