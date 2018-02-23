import CyObj from '@/components/cy-object'
import config from '@/utils/dummy-config'

describe('cy-object.js', () => {
  it('cytoscape config can be set and instance is being created', async () => {
    // set the config and create the cytoscape instance
    CyObj.config = config
    const instance = await CyObj.instance
    expect(instance.elements().length)
      .toEqual(config.elements.length)
  })
})
