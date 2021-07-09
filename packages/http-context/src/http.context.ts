import { ILogger } from '@kondah/core'
import { Request, Response } from 'express'

export class HttpContext {
  public req!: Request
  public res!: Response
  public logger!: ILogger
}
