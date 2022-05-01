import { HttpMethod } from '../../http-method.enum'
import { REST } from '../../rest'

export const Head = REST.makeMethodDecorator(HttpMethod.HEAD)
