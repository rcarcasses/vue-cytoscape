import { Component, Vue, Prop, Inject, Watch } from 'vue-property-decorator'
import {
  Core,
  ElementDefinition,
  Selector,
  EventHandler,
  EventNames
} from 'cytoscape'

@Component({})
export default class CyElement extends Vue {
  @Prop() definition!: ElementDefinition
  @Inject() readonly cy!: Promise<Core>
  instance: Core | undefined = undefined
  selector: Selector = ''
  id: string | undefined = this.definition.data.id
  @Prop({ default: false }) readonly sync!: boolean

  constructor() {
    super()
    if (this.id) this.selector = `#${this.id}`
    this.cy.then(this.configure)
  }

  configure(cy: Core) {
    this.instance = cy
    const ele = this.add()
    console.log(ele)
    if (!this.id) {
      this.id = ele.data().id
      this.selector = `#${this.id}`
    }
  }

  add() {
    const instance = this.instance as Core
    // register all the component events as cytoscape ones
    const register = (eventType: EventNames, f: EventHandler) =>
      instance.on(eventType, this.selector, f)

    for (const [eventType, callback] of Object.entries(this.$listeners)) {
      if (Array.isArray(callback))
        callback.map(f => register(eventType, f as EventHandler))
      else register(eventType, callback as EventHandler)
    }
    // if sync is on, track position
    if (this.sync) {
      instance.on('drag', this.selector, event => {
        // strip observers from the event position
        const pos = JSON.parse(JSON.stringify(event.target.position()))
        // update definition object
        this.definition.position = pos
      })
    }

    // strip observers from the original definition
    let def = JSON.parse(JSON.stringify(this.definition))
    // add the element to cytoscape
    const ele = instance.add(def)[0]
    return ele
  }

  unmounted() {
    const instance = this.instance as Core
    instance.remove(this.selector)
  }

  get eleData() {
    return this.definition.data
  }

  get position() {
    return this.definition.position
  }

  @Watch('eleData', { deep: true })
  onDataChange(data: any) {
    const instance = this.instance as Core
    const ele = instance.getElementById(this.id as string)
    ele.data(data)
    // console.log(ele.data().label)
  }

  @Watch('position', { deep: true })
  onPositionChange(position: any) {
    const instance = this.instance as Core
    const ele = instance.getElementById(this.id as string)
    ele.position(JSON.parse(JSON.stringify(position)))
    console.log('watcher')
  }

  render(h: (arg0: string) => void) {
    // do nothing
  }
}
