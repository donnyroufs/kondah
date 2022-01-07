import { ILogger } from '@kondah/energizor'
import { bgGreen, bgRed, bgBlue, bgYellow } from 'chalk'
import { Label } from './label'

export class Logger {
  public danger(msg: string, label = 'ERROR'): string | void {
    console.log(bgRed.bold.white(Label.create(label).value) + ' ' + msg)
  }

  public info(msg: string, label = 'INFO'): void {
    console.log(bgBlue.bold.white(Label.create(label).value) + ' ' + msg)
  }

  public success(msg: string, label = 'SUCCESS'): void {
    console.log(bgGreen.bold.black(Label.create(label).value) + ' ' + msg)
  }

  public warning(msg: string, label = 'WARNING'): void {
    console.log(bgYellow.bold.black(Label.create(label).value) + ' ' + msg)
  }
}

export class EnergizorLoggerAdapter implements ILogger {
  private readonly _label = Label.create('ENERGIZOR').value

  public constructor(private readonly _logger: Logger) {}

  public info(msg: string): string | void {
    this._logger.info(msg, this._label)
  }

  public warning(msg: string): string | void {
    this._logger.warning(msg, this._label)
  }

  public success(msg: string): string | void {
    this._logger.success(msg, this._label)
  }

  public danger(msg: string): string | void {
    this._logger.danger(msg, this._label)
  }
}
