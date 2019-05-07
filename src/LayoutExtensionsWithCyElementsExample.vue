<template>
  <div id="holder">
    <cytoscape
      :config="config"
      :preConfig="preConfig"
      :afterCreated="afterCreated"
    >
      <cy-element
        v-for="def in elements.nodes"
        :key="`${def.data.id}`"
        :definition="def"
      />
      <cy-element
        v-for="def in elements.edges"
        :key="`${def.data.id}`"
        :definition="def"
      />
    </cytoscape>
  </div>
</template>

<script>
/* eslint-disable */
import cola from "cytoscape-cola";
import elements from "./assets/data.json";
import axios from "axios";

const config = {
  autounselectify: true,
  boxSelectionEnabled: false,
  layout: {
    name: "cola"
  },
  style: [
    {
      selector: "node",
      css: {
        "background-color": "#f92411"
      }
    },
    {
      selector: "edge",
      css: {
        "line-color": "#f92411"
      }
    }
  ],
  elements: []
};

export default {
  name: "App",
  data() {
    return {
      config,
      elements,
      i: 1
    };
  },
  methods: {
    preConfig(cytoscape) {
      console.log("calling pre-config", config, elements);
      // cytoscape: this is the cytoscape constructor
      cytoscape.use(cola);
    },
    async afterCreated() {
      console.log("after created");
      const cy = await this.$cytoscape.instance;
      /*cy.layout({
        name: 'breadthfirst',
        circle: false,
        roots: '#existingnode',
        spacingFactor: 1,
        padding: 50,
        fit: true,
      }).run();*/
      cy.elements()
        .layout({ name: "cola" })
        .run();
    }
  }
};
</script>

<style>
#holder {
  width: 100%;
  height: 400px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
