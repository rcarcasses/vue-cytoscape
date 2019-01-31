import cytoscape from 'cytoscape'

export const sync = state => {
  console.log('sync state: ', state)
  let elements = [...state.elements]
  // replace the `elements` field with a custom one
  Object.defineProperty(state, 'elements', {
    get () {
      return elements
    },
    set (newElements) {
      // update cytoscape view
      VueCyObj.instance.then(c => {
        // remove all the elements in cytoscape that are not in the newElements
        const selector = newElements.map(el => `#${el.data.id}`).join(', ')
        c.remove(cy.$(selector).absoluteComplement())
        // add new elements if needed
        newElements.forEach(el => {
          if (c.$(`#${el.data.id}`).length === 0) c.add(el)
        })
      })
      elements = newElements
    },
    enumerable: true,
    configurable: true
  })
  // trigger the initialization, will add the elements if needed
  state.elements = elements
  return state
}

let resolver = null
let cy = null

export const VueCyObj = {
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
