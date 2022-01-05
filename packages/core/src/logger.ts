import { ILogger } from '@kondah/energizor'
import { bgGreen, bgRed, bgBlue, bgYellow } from 'chalk'

export class Logger implements ILogger {
  public danger(msg: string): string | void {
    console.log(bgRed.bold.white(' DANGER ') + ' ' + msg)
  }

  public info(msg: string): void {
    console.log(bgBlue.bold.white(' INFO ') + ' ' + msg)
  }

  public success(msg: string): void {
    console.log(bgGreen.bold.black(' SUCCESS ') + ' ' + msg)
  }

  public warning(msg: string): void {
    console.log(bgYellow.bold.black(' WARNING ') + ' ' + msg)
  }
}
