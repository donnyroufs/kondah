import { ILogger } from '@kondah/energizor'

import { Label } from '../label'
import { Logger } from '../logger'

export class EnergizorLoggerAdapter implements ILogger {
  private readonly _label = Label.create('ENERGIZOR').value

  public constructor(private readonly _logger: Logger) {}

  public info(msg: string): void {
    this._logger.info(msg, this._label)
  }

  public warning(msg: string): void {
    this._logger.warning(msg, this._label)
  }

  public success(msg: string): void {
    this._logger.success(msg, this._label)
  }

  public danger(msg: string): void {
    this._logger.danger(msg, this._label)
  }
}
