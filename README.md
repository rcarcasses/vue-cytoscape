# vue-cytoscape

> A vue wrapper for cytoscape.js

# Usage
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
This registrate a global `cytoscape` component and a store object `this.$cytoscape`, which is a promise of the cytoscape instance. You can access this for example to catch mouse events, using the same approach as using vanilla cytoscape. 
After this, you use cytoscape as a normal vue component:
```javascript
<cytoscape :config="config" width="500" height="400"/>
```
The `width` and `height` properties should be given in pixels and must be numbers. The `config` property is the part of the object passed to the `cytoscape` function without the container property. For example:
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

## Build Setup
This library depends on cytoscape one.

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
