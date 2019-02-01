<template>
  <div></div>
</template>
<script>
import VueCyObj from './cy-object'

export default {
  props: ['definition'],
  created () {
    // console.log('created', this.definition)
    this.add(this.definition)
  },
  watch: {
    definition (newVal, oldVal) {
      // console.log('we are updating now: ', newVal, oldVal)
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
      // console.log('adding')
      const cy = await VueCyObj.instance
      cy.add(element)
    },
    async remove (element) {
      // console.log('removing ')
      const cy = await VueCyObj.instance
      cy.remove(`#${element.data.id}`)
    }
  }
}
</script>
