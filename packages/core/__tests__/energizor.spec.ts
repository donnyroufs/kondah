/* eslint-disable @typescript-eslint/no-unused-vars */
import { Energizor } from '../src/energizor'
import {
  UserService,
  ChildService,
  InnerChildService,
  UndecoratedService,
  MissingDepService,
  Logger,
  types,
  ChildTwoService,
  IocWithClassType,
  PureService,
} from '../utils/energizor.utils'

describe('energizor', () => {
  let energizor: Energizor

  beforeEach(() => {
    energizor = new Energizor(new Logger())

    energizor.register(ChildService)
    energizor.register(UserService)
    energizor.register(InnerChildService)
    energizor.register(IocWithClassType)

    energizor.register(types.userService, {
      asClass: UserService,
    })
    energizor.register(types.childTwoService, {
      asClass: ChildTwoService,
    })
    energizor.register(types.innerChild, {
      asClass: InnerChildService,
    })
  })

  it('should be defined', () => {
    const _energizor = new Energizor(new Logger())

    expect(_energizor).toBeDefined()
  })

  it('should register a dependency', () => {
    const _energizor = new Energizor(new Logger())
    _energizor.register(InnerChildService)

    expect(_energizor.get(InnerChildService)).toBeDefined()
  })

  // tests both singleton and transient no need to create seperate tests
  it('should change the default scope', () => {
    const _energizor = new Energizor(new Logger())
    _energizor.register(InnerChildService)

    expect(_energizor.get(InnerChildService).value).toBe(1)

    _energizor.get(InnerChildService).value = 2

    expect(_energizor.get(InnerChildService).value).toBe(1)

    _energizor.setDefaultScope('singleton')

    _energizor.register(PureService)
    _energizor.get(PureService).value = 10

    expect(_energizor.get(PureService).value).toBe(10)
  })

  it('should set the scope for the given dependency when using classes', () => {
    const _energizor = new Energizor(new Logger())
    _energizor.register(InnerChildService, {
      scope: 'singleton',
    })

    expect(_energizor.get(InnerChildService).value).toBe(1)

    _energizor.get(InnerChildService).value = 2

    expect(_energizor.get(InnerChildService).value).toBe(2)
  })

  it('should set the scope for the given dependency when using tokens', () => {
    const _energizor = new Energizor(new Logger())
    _energizor.register(types.innerChild, {
      asClass: InnerChildService,
      scope: 'singleton',
    })

    expect(_energizor.get<InnerChildService>(types.innerChild).value).toBe(1)

    _energizor.get<InnerChildService>(types.innerChild).value = 2

    expect(_energizor.get<InnerChildService>(types.innerChild).value).toBe(2)
  })

  it('should notice that a dependency is not tagged with @Injectable', () => {
    const value = energizor.register(UndecoratedService)

    expect(value).toBe(
      `UndecoratedService failed to register: missing @Injectable decorator`
    )
  })

  // not sure how to test at the moment because we can only know after registering everything
  // however it does throw when trying to get!
  it.skip('should throw an exception when there is a missing nested dependency', () => {
    energizor.register(MissingDepService)
  })

  describe('when requesting a dependency by class from the container', () => {
    it('should throw an error when it does not exist', () => {
      expect(() => {
        energizor.get('CoolDependency')
      }).toThrowError(
        'The dependency {{ CoolDependency }} does not exist in the container.'
      )
    })

    it('should return the dependency when it exists in the container', () => {
      const dependency = energizor.get(UserService)

      expect(dependency).toBeDefined()
    })

    it('should resolve the dependencies of the resolved dependency', () => {
      const dependency = energizor.get(UserService)

      expect(dependency.child).toBeDefined()
    })

    it('should resolve dependencies recursively', () => {
      const dependency = energizor.get(UserService)

      expect(dependency.child).toBeDefined()
      expect(dependency.child.innerChild).toBeDefined()
    })
  })

  describe('when requesting a dependency by token from the container', () => {
    it('should throw an error when it does not exist', () => {
      expect(() => {
        energizor.get(Symbol('woef'))
      }).toThrowError(
        'The dependency {{ woef }} does not exist in the container.'
      )
    })

    it('should format a symbol when an unknown dependency exception has been thrown', () => {
      energizor.register(MissingDepService)

      expect(() => {
        energizor.get(Symbol('Woeff'))
      }).toThrowError(
        'The dependency {{ Woeff }} does not exist in the container.'
      )

      expect(() => {
        energizor.get(MissingDepService)
      }).toThrow('')
    })

    it('should bind the class to the given token', () => {})

    it('should return the dependency when it exists in the container', () => {
      const dependency = energizor.get(types.userService)

      expect(dependency).toBeDefined()
    })

    it('should resolve the dependencies of the resolved dependency', () => {
      const dependency = energizor.get<UserService>(types.userService)

      expect(dependency.child).toBeDefined()
      expect(dependency.childTwo).toBeDefined()
    })

    it('should resolve dependencies recursively', () => {
      const dependency = energizor.get<UserService>(types.userService)

      expect(dependency.child).toBeDefined()
      expect(dependency.childTwo).toBeDefined()
      expect(dependency.child.innerIocChild).toBeDefined()
    })

    it('should allow the user to add class types when using @Inject', () => {
      const dependency = energizor.get(IocWithClassType)

      expect(dependency).toBeDefined()
    })
  })
})
