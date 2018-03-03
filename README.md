[![NPM](https://nodei.co/npm/vue-cytoscape.png)](https://nodei.co/npm/vue-cytoscape/)
[![npm](https://img.shields.io/npm/dm/vue-cytoscape.svg?style=flat-square)](https://www.npmjs.com/package/vue-cytoscape)

# vue-cytoscape

> A vue wrapper for cytoscape.js

## Usage
Add it to your project:
```
yarn add vue-cytoscape
```
then import the plugin in your main Vue instance:
```
import VueCytoscape from 'vue-cytoscape'
import 'vue-cytoscape/dist/vue-cytoscape.css'
...
Vue.use(VueCytoscape)
```
After this, you use cytoscape as a normal vue component:
```javascript
<cytoscape :config="config"/>
```
The `config` property is the part of the object passed to the `cytoscape` function without the container property. For example:
```javascript
const config = {
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
```
For more information please read [cytoscape documentation](http://js.cytoscape.org/#getting-started/initialisation).
This library is in a very early stage and suggestions and help are welcomed. If you have any issue please feel free to use the [Issues](https://github.com/rcarcasses/vue-cytoscape/issues) page.

### Reactivity and accesing `cytoscape` instance
The installation registrate a global `cytoscape` component and a store object `this.$cytoscape`. Accessing `this.$cytoscape.instance` returns a promise to the cytoscape instance. You can access this for example to catch mouse events, using the same approach as using vanilla cytoscape. There are two approaches to interact with cytoscape, which are described below. You should choose the solution that feels better for you, keeping in mind that this library is still in an experimental stage.
#### One `cytoscape` render
In this approach the `cytoscape` instance is mounted and through the access of the store object you can add/delete/... objects in cytoscape. For example:
```javascript
<template>
  <cytoscape :config="config" style="width: 100%; height: 600px"/>
</template>
<script>
// initial config
const config = {
  elements: [],
  style: [ {
    selector: 'node',
    style: {
      ...
    }
    ...
  }],
  layout: {
    ...
  }
}

export default {
...
  methods: {
    // you can call this method somewhere to trigger the update of the cytoscape canvas content
    cyUpdate () {
      // new nodes and edges
      const cynodes = [...]
      const cylinks = [...]
      // update the cytoscape instance
      this.$cytoscape.instance.then(cy => {
        // remove all elements
        cy.remove(cy.elements())
        // add the new ones
        cy.add(cynodes)
        cy.add(cylinks)
        // inside the cytoscape callback we lose the component this, we can use `that` instead if needed
        const that = this
        // click and double click (simulated) over the nodes
        cy.on('tap', 'node', function (event) {
          const data = event.target.data()
          // if you are using vuex you can dispatch your events this way
          that.$store.dispatch('sectors/select', { data })
        })
      })
    }
  }
}
</script>
```
#### Many `cytoscape` renders
In this approach you change the config of the `cytoscape` component and this is completely re-rendered. In this case is convenient to specify a key for the component such that the change of this key will force the component render. For example:
```javascript
<template>
  <cytoscape :key="cyKey()" :config="config"/>
</template>
<script>
export default {
  data () {
    return {
      config: {
        ...
      },
      i: 0
    }
  },
  methods: {
    cyKey () {
      const that = this
      this.$cytoscape.reset()  // this is required, otherwise you will get a promise to an old cytoscape instance
      this.$cytoscape.instance.then(cy => {
        console.log('cy', cy)
        cy.on('tap', event => {
          console.log('tapped')
          that.i++
        })
      })
      console.log('computing cyKey cy' + this.i)
      return 'cy' + this.i
    }
  }
}
</script>
```

## Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload at localhost:8080
yarn dev

# build for production with minification
yarn build

# build for production and view the bundle analyzer report
yarn build --report

# run unit tests
yarn unit

# run all tests
yarn test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
