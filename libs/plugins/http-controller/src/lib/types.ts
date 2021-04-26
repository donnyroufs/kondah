import { HttpVerb } from '@kondah/core'
import { RequestHandler } from 'express'

export interface RouteDefinition {
  path: string
  requestMethod: HttpVerb
  methodName: string
  middleware?: RequestHandler[]
}
