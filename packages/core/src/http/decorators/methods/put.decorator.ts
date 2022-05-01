import { HttpMethod } from '../../http-method.enum'
import { REST } from '../../rest'

export const Put = REST.makeMethodDecorator(HttpMethod.PUT)
