const injectables = Symbol('injectables')
const extensions = Symbol('extensions')
// const parameters = Symbol('parameters')
const parameters = 'parameters'

export const MetaTypes = {
  /**
   * Used to make a class injectable through Energizor.
   */
  injectables,
  /**
   * Class methods to add to AppContext
   */
  extensions,
  /**
   * Used for inversion of control injections
   */
  parameters,
}
