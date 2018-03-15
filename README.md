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

## Internal lifecycle hooks and cytoscape extensions
Many features of cytoscape come as external dependencies or extensions. To use an extension you can use the following life cycle hooks:

- `preConfig` if defined, it will be called with the cytoscape constructor function before creating the cytoscape instance.
- `afterCreate` if defined, it will be called after the creation of the cytoscape instance with this instance as argument. This is also a good place to register mouse events and similar interactions.

For example, in the following code we register and configure the `contextMenus` extension:
```javascript
<template>
  <div id="holder">
    <cytoscape :config="config" :preConfig="preConfig" :afterCreated="afterCreated"/>
  </div>
</template>
<script>
...
import jquery from 'jquery'
import contextMenus from 'cytoscape-context-menus'
import 'cytoscape-context-menus/cytoscape-context-menus.css'

export default {
  ...,
  methods: {
    preConfig (cytoscape) {
      // it can be used both ways
      contextMenus(cytoscape, jquery)
      // cytoscape.use(contextMenus, jquery)
    },
    afterCreated (cy) {
      // demo your core ext
      cy.contextMenus({
        menuItems: [
          {
            id: 'remove',
            content: 'remove',
            tooltipText: 'remove',
            image: {src: 'remove.svg', width: 12, height: 12, x: 6, y: 4},
            selector: 'node, edge',
            onClickFunction: function (event) {
              var target = event.target || event.cyTarget
              target.remove()
            },
            hasTrailingDivider: true
          },
          {
            id: 'hide',
            content: 'hide',
            tooltipText: 'hide',
            selector: '*',
            onClickFunction: function (event) {
              var target = event.target || event.cyTarget
              target.hide()
            },
            disabled: false
          }
        ]
      })
    },..
  },
  ...
}
</script>
```
For additional details check the `ContextMenusExample.vue` and `CtxMenuExample.vue` in the `src` folder, notice that these example correspond to different extensions.