<template>
  <div id="holder">
    <cytoscape
      :config="config"
      :preConfig="preConfig"
      :afterCreated="afterCreated"
    />
  </div>
</template>

<script>
/* eslint-disable */
import cola from "cytoscape-cola";
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
      i: 1
    };
  },
  methods: {
    preConfig(cytoscape) {
      console.log("calling pre-config", config);
      // cytoscape: this is the cytoscape constructor
      cytoscape.use(cola);
    },
    async afterCreated(cy) {
      // cy: this is the cytoscape instance
      console.log("after created");
      const { data: elements } = await axios.get(
        "http://localhost:8080/static/data.json"
      );
      console.log("loaded elements: ", elements, cy);
      // now we add the elements using the cytoscape instance
      // the correspondent cy-elements inside the cytoscape vue
      // component will be added automatically
      elements.nodes.forEach(n => cy.add(n));
      elements.edges.forEach(n => cy.add(n));
      // now we need to re-run the layout considering
      // the new elements added
      // Notice that this is how cytoscape works and not
      // related to `vue-cytoscape` at all
      cy.elements()
        .layout({ name: "cola" })
        // .layout({ name: "grid" }) // give a try if you feel curious
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
