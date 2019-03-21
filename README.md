[![NPM](https://nodei.co/npm/vue-cytoscape.png)](https://nodei.co/npm/vue-cytoscape/)
[![npm](https://img.shields.io/npm/dm/vue-cytoscape.svg?style=flat-square)](https://www.npmjs.com/package/vue-cytoscape)
[![Patreon](https://img.shields.io/badge/patreon-donate-blue.svg?style=flat-square)](https://www.patreon.com/rcarcasses)
[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat-square)](https://paypal.me/CarcassesQuevedo)
# vue-cytoscape

> Cytoscape, now in vue

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
If you have any issue please feel free to use the [Issues](https://github.com/rcarcasses/vue-cytoscape/issues) page.

### Reactivity

Starting with version `1.2` it is possible to have a more `vue`-like experience. You can add elements
to a `cytoscape` instance by adding `cy-elements` components as children of the `cytoscape`
component:
```
<template>
  <cytoscape :config="config">
    <cy-element
      v-for="def in elements"
      :key="`${def.data.id}`"
      :definition="def"
    />
  </cytoscape>
</template>
<script>
export default {
  data () {
    return {
      elements: [{
          data: { id: 'a' },  position: { x: 589, y: 182 }
        },
        ...
      ]
    }
  }
}
</script>
```
You can check the `ChildrenElementsExample.vue` in the `github` repository for a full example.

#### How this works
This section is safe to ommit. Nevertheless the way the previous `vue`-like behaviour is implemented
is the following:
- A `CyElement` is a component that renders an empty div, if you inspect the DOM you will see that
    `vue` actually renders them.
- In the `created` and `destroyed` lifecycle method of a `CyElement` component a `cytoscape` element is
    added/removed accordingly.
- In the `updated` method, the correspondent element is first removed from `cytoscape` and
    then added back.

### Cytoscape events

You can register listeners to the usual `cytoscape` events directly in the component itself:
```
<template>
  ...
  <cytoscape :config="config" v-on:mousedown="onCyMouseDown" />
  ...
<template>
<script>
...
export default {
  ...
  methods: {
    onCyMouseDown (event) {
      // this will be called `onmousedown` over cytoscape
    }
  },
  ...
}
</script>
```
The event is the same event dispatched by `cytoscape`, see [events in
cytoscape](http://js.cytoscape.org/#events).


### Accesing `cytoscape` instance

The installation registrate a global `cytoscape` component and a store object `this.$cytoscape`. Accessing `this.$cytoscape.instance` returns a promise to the `cytoscape` instance. You can access this for example to catch mouse events (although the method of the previous section is preferred) or to perform any action, using the same approach as using vanilla `cytoscape`. Accessing the store object allows you to add/delete/... objects in `cytoscape`. For example:
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

## Internal lifecycle hooks and cytoscape extensions
Many features of `cytoscape` come as external dependencies or extensions. To use an extension you can use the following life cycle hooks:

- `preConfig` if defined, it will be called with the cytoscape constructor function before creating the `cytoscape` instance.
- `afterCreated` if defined, it will be called after the creation of the `cytoscape` instance with this instance as argument.

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
For additional details check the `ContextMenusExample.vue` and `CtxMenuExample.vue` in the `src` folder. Notice that these example correspond to different extensions.

Another example, using the cola layout extension can be found in `LayoutExtensionsExample.vue`.

# Changelog

## v0.2
- `cytoscape` events can now be listened in through the component.
- graph elements can be added as children of the `cytoscape` component.
- adding/removing elements directly using `cytoscape` instance is reflected in the `Cytoscape` component: `CyElement`s
components are added/removed accordingly.

## v0.1
- support for `cytoscape` interaction via global instance.
- `preConfig` and `afterCreated` lifecycle hooks provided, support for `cytoscape` plugins.
