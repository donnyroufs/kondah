import 'reflect-metadata'

import { PluginHandler } from '../src/plugin.handler'
import { App, CoolLogger } from '../utils/kondah.utils'
import {
  PluginC,
  PurePluginA,
  PurePluginB,
  PluginWithContextExtensions,
} from '../utils/plugin.handler.utils'

const wait = async () => new Promise((res) => setTimeout(res, 1000))

describe('plugin handler', () => {
  const plugsToBeInjected = [PurePluginA, PurePluginB, PluginC]
  const pluginInstances = [
    new PurePluginA({}, undefined!),
    new PurePluginB({}, undefined!),
    new PluginC({}, undefined!),
  ]

  it('should be defined', () => {
    const handler = new PluginHandler([], {}, undefined!)
    expect(handler).toBeDefined()
  })

  it('should have a list of unique plugins', () => {
    const handler = new PluginHandler(plugsToBeInjected, {}, undefined!)
    const plugins = handler.getPlugins()

    // order matters here because PluginC depends on PureA and PureB therefor they get appended last.
    expect(plugins).toStrictEqual(pluginInstances)
    expect(plugins).toHaveLength(3)
  })

  it.skip('should install pure plugins before installing non-pure plugins', () => {})

  it('should add hello to the app context', async () => {
    const kondah = new App({
      logger: new CoolLogger(),
      config: {},
      plugins: [PluginWithContextExtensions],
    })

    // There is a lot of async stuff happening so we kinda hack this test by waiting
    await wait()

    // @ts-expect-error dynamic types
    expect(kondah.getContext().hello()).toBe('hello')
  })

  it.skip('should let the user know if it has overwritten a method from another plugin', async () => {})
})
