const injectables = Symbol('injectables')
const extensions = Symbol('extensions')

export const MetaTypes = {
  /**
   * Used to make a class injectable through Energizor.
   */
  injectables,
  /**
   * Class methods to add to AppContext
   */
  extensions,
}
