// Symbols seem to not work when sharing across packages

const injectables = 'injectables'
const extensions = 'extensions'
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
