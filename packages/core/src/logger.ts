import { bgGreen, bgRed, bgBlue, bgYellow } from 'chalk'

import { Label } from './label'

export class Logger {
  public danger(msg: string, label = 'ERROR'): void {
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
