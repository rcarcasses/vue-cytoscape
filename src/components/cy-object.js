import cytoscape from 'cytoscape'

let resolver = null
let cy = null

export default {
  reset () {
    cy = null
  },
  get instance () {
    const promise = new Promise((resolve, reject) => {
      resolver = resolve
    })
    // resolve the promise with the value with a reference to the current existing instance
    if (cy) {
      resolver(cy)
    }

    return promise
  },
  set config (config) {
    cy = cytoscape(config)
    console.log('setting cy value', cy)
    // let the cytoscape instace available for the awaiters
    resolver(cy)
  }
}
