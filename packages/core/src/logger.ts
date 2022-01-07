import { ILogger } from '@kondah/energizor'
import { bgGreen, bgRed, bgBlue, bgYellow } from 'chalk'

export class Logger {
  public danger(msg: string, label = ' ERROR '): string | void {
    console.log(bgRed.bold.white(label) + ' ' + msg)
  }

  public info(msg: string, label = ' INFO '): void {
    console.log(bgBlue.bold.white(label) + ' ' + msg)
  }

  public success(msg: string, label = ' SUCCESS '): void {
    console.log(bgGreen.bold.black(label) + ' ' + msg)
  }

  public warning(msg: string, label = ' WARNING '): void {
    console.log(bgYellow.bold.black(label) + ' ' + msg)
  }
}

export class EnergizorLoggerAdapter implements ILogger {
  private readonly _label = ' ENERGIZOR '

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
