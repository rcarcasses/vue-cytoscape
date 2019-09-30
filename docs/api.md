# Components API

## Cytoscape

The `Cytoscape` component contains the `CyElement`s components. It serves as `cytoscape` configuration container and has the following properties:

- `config`, the object passed to the `cytoscape` function without the container property.
- `preConfig`, *lifecycle hook*,  if defined, it will be called with the `cytoscape` constructor function before creating the `cytoscape` instance.
- `afterCreated`, *lifecycle hook*, if defined, it will be called after the creation of the `cytoscape` instance with this instance as argument.

In addition to these, you can listen to any `cytoscape` event using the `v-on` directive.

```vue
<Cytoscape v-on:mousedown="addNode" ...>
```

will be translated to `cy.on('mousedown', addNode)`. All `cytoscape` events are supported, you just change `mousedown` by the corresponding event string in the previous code snippet. See [events in
cytoscape](http://js.cytoscape.org/#events) for more details.

### Registering cytoscape extensions

Many features of `cytoscape` come as external dependencies or extensions. You can use the lifecycle hooks defined in the previous section to register those.

For example, in the following code we register and configure the `contextMenus` extension:
```vue
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

::: tip
In version `v1.0.0` you can have multiple `Cytoscape` components in the same vue app. This is not possible in previous versions.
:::

## CyElement

Along with the `Cytoscape` component `vue-cytoscape` also register the `CyElement` component. A `CyElement` represents a `cytoscape` element object. The following properties are defined:

- `definition`, an object that describe the element to add to `cytoscape`. This value will be passed internally to the function `cy.add`, see [cytoscape specification](http://js.cytoscape.org/#cy.add).
- `sync`, default `false`. If set to `true` then `vue-cytoscape` will synchronize the value of `definition.position` whenever the corresponding `cytoscape` element is dragged on stage.

In addition, like for `Cytoscape` component, we can register event listeners using `v-on:eventname="callback"` directive. Internally this will be translated to ``cy.on(eventname, `#{definition.data.id}`, callback)``.

A complete example would look like this:

```vue
<template>
  <div id="app">
    <Cytoscape ref="cy" :config="config" v-on:mousedown="addNode" v-on:cxttapstart="updateNode">
      <cy-element
        v-for="def in elements"
        :key="`${def.data.id}`"
        :definition="def"
        v-on:mousedown="deleteNode($event, def.data.id)"
      />
    </Cytoscape>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Core, EventObject } from 'cytoscape'
import Cytoscape from '@/components/Cytoscape'
import CyElement from '@/components/CyElement'
import config from '@/example-config.json'

@Component({
  components: {
    Cytoscape,
    CyElement
  }
})
export default class App extends Vue {
  addNode(event: EventObject) {
    if (event.target === (this.$refs.cy as Cytoscape).instance)
      console.log('adding node', event)
  }

  deleteNode(event: Event, id: string) {
    console.log('node clicked', id)
  }

  updateNode(event: any) {
    console.log('right click node', event)
  }

  get elements() {
    return config.elements
  }

  get config() {
    const noElementsConfig = { ...config }
    delete noElementsConfig.elements
    return noElementsConfig
  }
}
</script>
<style>
#app {
  width: 100%;
  height: 400px;
}
</style>


```
