import { HttpMethod } from '../../http-method.enum'
import { REST } from '../../rest'

export const Get = REST.makeMethodDecorator(HttpMethod.GET)
