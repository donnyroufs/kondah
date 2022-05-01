import { AsyncLocalStorage } from 'async_hooks'
import { IHttpContext } from './http.context'

export const asyncLocalStorage = new AsyncLocalStorage<IHttpContext<any, any>>()
