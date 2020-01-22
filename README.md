[![NPM](https://nodei.co/npm/vue-cytoscape.png)](https://nodei.co/npm/vue-cytoscape/)
[![npm](https://img.shields.io/npm/dm/vue-cytoscape.svg?style=flat-square)](https://www.npmjs.com/package/vue-cytoscape)
[![Patreon](https://img.shields.io/badge/patreon-donate-blue.svg?style=flat-square)](https://www.patreon.com/rcarcasses)
[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat-square)](https://paypal.me/CarcassesQuevedo)
# vue-cytoscape

> Cytoscape, now in vue

For more details please visit our site:

[https://rcarcasses.github.com/vue-cytoscape](https://rcarcasses.github.com/vue-cytoscape)

# Migration guide

To upgrade from `v0.2.x` to `v1.0.x`:

- `this.$cytoscape.instance` no longer exist in `v1`, if you want to access cytoscape instance use the `afterCreated` lifecycle hook.
- Creating elements by passing `config.elements` configuration is discouraged, use the `CyElement`s api instead.


# Changelog

## v1.0.7
- reactivity added for element data & positions

## v1.0.0

- Typescript support.
- Multiple `cytoscape` instances support.
- `v-on:` directive events api introduced.
- Documentation with `vuepress`.
- DOM reflection removed.

## v0.2

- `cytoscape` events can now be listened in through the component.
- Graph elements can be added as children of the `cytoscape` component.
- Adding/removing elements directly using `cytoscape` instance is reflected in the `Cytoscape` component: `CyElement`s
components are added/removed accordingly.

## v0.1

- Support for `cytoscape` interaction via global instance.
- `preConfig` and `afterCreated` lifecycle hooks provided, support for `cytoscape` plugins.
