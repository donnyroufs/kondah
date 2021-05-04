import express = require('express')
import { Energizor } from '../energizor'
import { ILogger, PartialAppContext } from '../types'

const implement = <T>() => class {} as new () => T

export class AppContext extends implement<PartialAppContext>() {
  public readonly server: express.Application
  public readonly energizor: Energizor
  public readonly logger: ILogger

  constructor(
    server: express.Application,
    energizor: Energizor,
    logger: ILogger
  ) {
    super()
    this.server = server
    this.energizor = energizor
    this.logger = logger
  }
}
