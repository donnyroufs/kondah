import {
  bgGreen,
  bgRed,
  bgBlue,
  bgYellow,
  blue,
  red,
  yellow,
  green,
} from 'chalk'
import { ILogger } from './types'

export type LoggerMode = 'background' | 'border'

export class Logger implements ILogger {
  private readonly _mode: LoggerMode

  constructor(mode: LoggerMode = 'background') {
    this._mode = mode
  }

  info(msg: string): void {
    if (this._mode === 'background') {
      console.log(bgBlue.bold.white(` INFO `) + ' ' + msg)
      return
    }

    console.log('[' + blue('INFO') + ']' + ' ' + msg)
  }

  success(msg: string): void {
    if (this._mode === 'background') {
      console.log(bgGreen.bold.black(` SUCCESS `) + ' ' + msg)
      return
    }

    console.log('[' + green('SUCCESS') + ']' + ' ' + msg)
  }

  warning(msg: string): void {
    if (this._mode === 'background') {
      console.log(bgYellow.bold.black(` WARNING `) + ' ' + msg)
      return
    }

    console.log('[' + yellow('WARNING') + ']' + ' ' + msg)
  }

  error(msg: string): void {
    if (this._mode === 'background') {
      console.log(bgRed.bold.white(` ERROR `) + ' ' + msg)
      return
    }

    console.log('[' + red('ERROR') + ']' + ' ' + msg)
  }
}
