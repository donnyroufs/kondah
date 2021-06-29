import { HttpVerb, Middleware } from '@kondah/core'
import { HttpContext } from '@kondah/http-context'

export interface RouteDefinition {
  path: string
  requestMethod: HttpVerb
  methodName: string
  middleware?: Array<Constr<IMiddleware>>
}

export interface IControllerOptions {
  middleware: Array<Constr<IMiddleware>>
  only?: string[]
  except?: string[]
}

export interface IMiddleware<T extends HttpContext = HttpContext> {
  execute(context: T): Promise<boolean> | boolean
}

export type Constr<T> = new (...args: any[]) => T
