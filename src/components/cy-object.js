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
  setConfig (config, preConfig, afterCreated) {
    // if a pre-configuration function is passed
    // then call it with the cytoscape constructor
    // this is useful to install/use extensions
    if (preConfig) {
      preConfig(cytoscape)
    }

    cy = cytoscape(config)
    // if a afterCreated function is passed
    // then call it with the cytoscape *instance*
    if (afterCreated) {
      afterCreated(cy)
    }

    // let the cytoscape instace available for the awaiters
    if (resolver) {
      resolver(cy)
    }
  }
}
