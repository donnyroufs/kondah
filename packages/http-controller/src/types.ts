import { Dependency, HttpVerb, Middleware } from '@kondah/core'
import { HttpContext } from '@kondah/http-context'

export interface RouteDefinition {
  path: string
  requestMethod: HttpVerb
  methodName: string
  middleware: MiddlewareType[]
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
export type Dependencies = Array<Dependency<unknown>>

export interface IHandler<T> {
  createInstanceWithDeps(constr: Constr<T>): T
}

export type MiddlewareType = Constr<IMiddleware> | IMiddleware
