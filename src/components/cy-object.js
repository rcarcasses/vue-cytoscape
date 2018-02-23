import cytoscape from 'cytoscape'

let resolver = null
const promise = new Promise((resolve, reject) => {
  resolver = resolve
})

export default {
  get instance () {
    return promise
  },
  set config (config) {
    const value = cytoscape(config)
    // let the cytoscape instace available for the awaiters
    resolver(value)
  }
}
