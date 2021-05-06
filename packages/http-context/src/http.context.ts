import { Request, Response } from 'express-serve-static-core'

export class HttpContext {
  public req!: Request
  public res!: Response
}
