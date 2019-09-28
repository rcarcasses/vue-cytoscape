# Guide

## Installation

with `yarn`

```javascript
yarn add vue-cytoscape
```

with `npm`

```javascript
npm install --save vue-cytoscape
```

::: tip
You don't need to install `cytoscape`, it will be installed for you.
:::

## Usage

`vue-cytoscape` is distributed as a vue `Vue` plugin. To use it, import the plugin in your main `Vue` instance:

```javascript
import VueCytoscape from 'vue-cytoscape'
...
Vue.use(VueCytoscape)
```

After this, you use cytoscape as a normal vue component:

```javascript
<cytoscape ref="cy" :config="config" v-on:mousedown="addNode" v-on:cxttapstart="updateNode">
  <cy-element
    v-for="def in elements"
    :key="`${def.data.id}`"
    :definition="def"
    v-on:mousedown="deleteNode($event, def.data.id)"
  />
</cytoscape>
```

The `config` property is the part of the object passed to the `cytoscape` function without the *container*  property, and optionally without the `elements` property as well. For example:

```javascript
const config = {
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

The `elements` object correspond to `config.elements` in `cytoscape` configuration:

```javascript
const elements = [
  { // node a
    data: { id: 'a' }
  }, { // node b
    data: { id: 'b' }
  }, { // edge ab
    data: { id: 'ab', source: 'a', target: 'b' }
  }
]
```

::: tip
If you are using `CyElement`'s components, while valid **it is recommended to pass a config object without the `elements` property** to avoid confusion.
:::

For more information please read [cytoscape documentation](http://js.cytoscape.org/#getting-started/initialisation). See [Components API](/api) for more details.

If you have any issue please feel free to use the [Issues](https://github.com/rcarcasses/vue-cytoscape/issues) page.
