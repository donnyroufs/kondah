import { HttpVerb, Middleware } from '@kondah/core'
import { RequestHandler } from 'express'

export interface RouteDefinition {
  path: string
  requestMethod: HttpVerb
  methodName: string
  middleware?: RequestHandler[]
}

export interface IControllerOptions {
  middleware: Middleware[]
  only?: string[]
  except?: string[]
}
