# Changelog

## v1.0.0

- typescript support
- multiple `cytoscape` instances support
- `v-on:` directive events api introduced
- documentation with `vuepress`
- DOM reflection removed

## v0.2

- `cytoscape` events can now be listened in through the component
- graph elements can be added as children of the `cytoscape` component
- adding/removing elements directly using `cytoscape` instance is reflected in the `Cytoscape` component: `CyElement`s
components are added/removed accordingly

## v0.1

- support for `cytoscape` interaction via global instance
- `preConfig` and `afterCreated` lifecycle hooks provided, support for `cytoscape` plugins
