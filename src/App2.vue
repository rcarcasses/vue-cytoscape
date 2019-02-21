<template>
  <div id="holder">
    <cytoscape
      :config="config"
      :preConfig="preConfig"
      :afterCreated="afterCreated"
      :debug="true"
    />
  </div>
</template>

<script>
/* eslint-disable */
const config = {
  style: [
    {
      selector: "node",
      style: {
        "background-color": "#666",
        label: "data(id)"
      }
    },
    {
      selector: "edge",
      style: {
        width: 3,
        "line-color": "#ccc",
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "triangle"
      }
    }
  ]
};

export default {
  name: "App",
  data() {
    return {
      config
    };
  },
  methods: {
    preConfig(cytoscape) {
      console.log("calling pre-config");
    },
    afterCreated(cy) {
      console.log("after created");
      cy.on("dragfree", "node", evt => this.setCyElements(cy));
      this.setCyElements(cy);
    },
    setCyElements(cy) {
      console.log("setCyElements");
      let cytoElems = [
        {
          // node a
          data: { id: "a" },
          position: { x: 100, y: 100 }
        },
        {
          // node b
          data: { id: "b" },
          position: { x: 200, y: 100 }
        },
        {
          // edge ab
          data: { id: "ab", source: "a", target: "b" }
        }
      ];

      cy.startBatch();
      cy.elements().remove();
      for (let el of cytoElems) {
        cy.add(el);
      }
      cy.endBatch();
      cy.fit();
    }
  }
};
</script>

<style>
#holder {
  width: 600px;
  height: 600px;
  border: 1px red solid;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: justify;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
