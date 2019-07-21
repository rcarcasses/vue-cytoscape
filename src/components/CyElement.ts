import { Component, Vue, Prop, Inject } from 'vue-property-decorator'
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

  constructor() {
    super()
    this.selector = `#${this.definition.data.id}`
    this.cy.then(this.configure)
  }

  configure(cy: Core) {
    this.instance = cy
    this.add()
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
    // add the element to cytoscape
    instance.add(this.definition)
  }

  unmounted() {
    const instance = this.instance as Core
    instance.remove(this.selector)
  }

  render(h: (arg0: string) => void) {
    // do nothing
  }
}
