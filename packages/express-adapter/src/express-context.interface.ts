import { IHttpContext } from '@kondah/core'
import { Request, Response } from 'express'

export interface IExpressContext extends IHttpContext<Request, Response> {}
