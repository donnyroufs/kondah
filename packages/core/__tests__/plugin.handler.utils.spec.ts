import { PluginHandlerUtils } from '../src/plugin.handler'
import {
  PluginC,
  PluginWithComposedPluginAsDep,
  PurePluginA,
  PurePluginB,
} from '../utils/plugin.handler.utils'

describe('plugin handler utils', () => {
  const utils = new PluginHandlerUtils()

  it('should be defined', () => {
    const utils = new PluginHandlerUtils()

    expect(utils).toBeDefined()
  })

  it('should throw an exception when a composed plugin has non pure dependencies', () => {
    expect(() => {
      utils.getAllPluginsFromConstructor([PluginWithComposedPluginAsDep])
    }).toThrow()
  })

  it('should take all the plugins and put them in an array', () => {
    const plugsToBeInjected = [PurePluginA, PurePluginB, PluginC]
    const plugins = utils.getAllPluginsFromConstructor(plugsToBeInjected)

    // order matters here because PluginC depends on PureA and PureB therefor they get appended last.
    expect(plugins).toStrictEqual([
      PurePluginA,
      PurePluginB,
      PluginC,
      PurePluginA,
      PurePluginB,
    ])

    expect(plugins).toHaveLength(5)
  })

  it('should take all the plugins including dependencies and get only the unique ones', () => {
    const plugsToBeInjected = [PurePluginA, PurePluginB, PluginC]

    const plugins = utils.getAllPluginsFromConstructor(plugsToBeInjected)
    const uniquePlugs = utils.getAllUniquePlugins(
      plugins,
      undefined!,
      undefined!
    )

    expect(uniquePlugs).toHaveLength(3)
    expect(uniquePlugs).toStrictEqual([
      new PurePluginA(undefined!, undefined!),
      new PurePluginB(undefined!, undefined!),
      new PluginC(undefined!, undefined!),
    ])
  })

  // A pure plugin has no dependencies
  it('should only return pure plugins', () => {
    const injectedPlugins = [
      new PluginC({}, undefined!),
      new PurePluginA({}, undefined!),
      new PurePluginB({}, undefined!),
    ]

    const purePlugins = utils.getPurePlugins(injectedPlugins)

    expect(purePlugins).toStrictEqual([
      new PurePluginA({}, undefined!),
      new PurePluginB({}, undefined!),
    ])
  })

  it('should only return non-pure plugins', () => {
    const injectedPlugins = [
      new PluginC({}, undefined!),
      new PurePluginA({}, undefined!),
      new PurePluginB({}, undefined!),
    ]

    const purePlugins = utils.getNonPurePlugins(injectedPlugins)

    expect(purePlugins).toStrictEqual([new PluginC({}, undefined!)])
  })
})
