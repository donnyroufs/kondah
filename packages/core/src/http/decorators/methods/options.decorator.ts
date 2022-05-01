import { HttpMethod } from '../../http-method.enum'
import { REST } from '../../rest'

export const Options = REST.makeMethodDecorator(HttpMethod.OPTIONS)
