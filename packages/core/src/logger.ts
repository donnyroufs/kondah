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

  info(msg: string, label = ' INFO '): void {
    if (this._mode === 'background') {
      console.log(bgBlue.bold.white(label) + ' ' + msg)
      return
    }

    console.log('[' + blue(label.trim()) + ']' + ' ' + msg)
  }

  success(msg: string, label = ' SUCCESS '): void {
    if (this._mode === 'background') {
      console.log(bgGreen.bold.black(label) + ' ' + msg)
      return
    }

    console.log('[' + green(label.trim()) + ']' + ' ' + msg)
  }

  warning(msg: string, label = ' WARNING '): void {
    if (this._mode === 'background') {
      console.log(bgYellow.bold.black(label) + ' ' + msg)
      return
    }

    console.log('[' + yellow(label.trim()) + ']' + ' ' + msg)
  }

  error(msg: string, label = ' ERROR '): void {
    if (this._mode === 'background') {
      console.log(bgRed.bold.white(label) + ' ' + msg)
      return
    }

    console.log('[' + red(label.trim()) + ']' + ' ' + msg)
  }
}
