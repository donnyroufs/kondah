import { Exception } from './exception.factory'

export class ComposedPluginHasDepsException extends Exception(
  'A composed plugin has dependencies which are not pure'
) {}
