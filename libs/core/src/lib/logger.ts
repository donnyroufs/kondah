import { bgGreen, bgRed, bgGrey } from 'chalk'

export class Logger {
  static successRegister(msg: string) {
    console.log(
      bgGreen.bold.black(`successfully`) + bgGrey(' registered ' + msg)
    )
  }

  static failedRegister(msg: string) {
    console.log(bgRed.bold.white('failed to') + bgGrey(' register ' + msg))
  }
}
