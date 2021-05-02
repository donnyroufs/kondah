import { bgGreen, bgRed, bgGrey, bgBlue, bgYellow } from 'chalk'
import { ILogger } from './types'

export class Logger implements ILogger {
  info(msg: string): void {
    console.log(bgBlue.bold.black(` INFO `) + ' ' + msg)
  }

  success(msg: string): void {
    console.log(bgGreen.bold.black(` SUCCESS `) + ' ' + msg)
  }

  warning(msg: string): void {
    console.log(bgYellow.bold.black(` WARNING `) + ' ' + msg)
  }

  error(msg: string): void {
    console.log(bgRed.bold.white(` ERROR `) + ' ' + msg)
  }
}
