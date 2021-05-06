import { Request, Response } from 'express-serve-static-core'

export class HttpContext {
  constructor(public req: Request, public res: Response) {}
}
