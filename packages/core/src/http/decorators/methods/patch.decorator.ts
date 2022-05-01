import { HttpMethod } from '../../http-method.enum'
import { REST } from '../../rest'

export const Patch = REST.makeMethodDecorator(HttpMethod.PATCH)
