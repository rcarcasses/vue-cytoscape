<template>
  <div></div>
</template>
<script>
import VueCyObj from './cy-object'

export default {
  props: ['definition'],
  created () {
    this.add(this.definition)
  },
  watch: {
    definition (newVal, oldVal) {
      this.remove(oldVal)
      this.add(newVal)
      return newVal
    }
  },
  destroyed () {
    // console.log('remove', this.definition.data.id)
    this.remove(this.definition)
  },
  methods: {
    async add (element) {
      const cy = await VueCyObj.instance
      // add it only if it doesn't exist
      if (cy.$id(element.data.id).length === 0) cy.add(element)
    },
    async remove (element) {
      const cy = await VueCyObj.instance
      // remove it only if it exist
      if (cy.$id(element.data.id).length > 0) cy.remove(`#${element.data.id}`)
    }
  }
}
</script>
