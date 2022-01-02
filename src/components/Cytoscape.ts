import { Component, Vue, Prop, Provide } from 'vue-property-decorator'
import { VNode } from 'vue'
import cytoscape, {
  CytoscapeOptions,
  Core,
  EventNames,
  EventHandler
} from 'cytoscape'

@Component({})
export default class VueCytoscape extends Vue {
  @Prop() config!: CytoscapeOptions
  @Prop({ default: (x: any) => {} }) preConfig: (x: any) => void
  @Prop({ default: (x: any) => {} }) afterCreated: (x: any) => void
  @Prop({ default: 'min-height: 600px;' }) elStyle: string
  @Prop({ default: "100%" }) elWidth: string
  instance: Core | undefined = undefined
  resolve: any = undefined
  reject: any = undefined
  @Provide() cy: Promise<Core> = new Promise((resolve, reject) => {
    this.resolve = resolve
    this.reject = reject
  })

  public mounted(): void {
    // create a vue independent element
    const el = document.createElement('div')
    el.setAttribute('id', 'cytoscape-div')
    el.setAttribute('width', this.elWidth)
    el.setAttribute('style', this.elStyle)
    // add it as a child of the vue managed one
    this.$el.appendChild(el)
    // apply lifecycle hooks
    if (this.preConfig) this.preConfig(cytoscape)
    // create cytoscape instance
    const instance = cytoscape({ container: el, ...this.config })
    // register all the component events as cytoscape ones
    const register = (eventType: EventNames, f: EventHandler) =>
      instance.on(eventType, f)

    for (const [eventType, callback] of Object.entries(this.$listeners)) {
      if (Array.isArray(callback))
        callback.map(f => register(eventType, f as EventHandler))
      else register(eventType, callback as EventHandler)
    }
    this.instance = instance
    // resolve the promise with the object created
    this.resolve(instance)
    if (this.afterCreated) this.afterCreated(instance)
  }

  render(h: (arg0: string, vnodes: VNode[]) => void, context: any) {
    return h('div', this.$slots.default as VNode[])
  }
}
