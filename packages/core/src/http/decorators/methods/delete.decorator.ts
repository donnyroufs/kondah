import { HttpMethod } from '../../http-method.enum'
import { REST } from '../../rest'

export const Delete = REST.makeMethodDecorator(HttpMethod.DELETE)
