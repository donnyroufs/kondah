import { ILogger } from "./types"

export class Logger implements ILogger {
  public warning(msg: string): string | void {
    console.warn(msg)
  }

  public success(msg: string): string | void {
    console.log(msg)
  }

  public info(msg: string): string | void {
    console.log(msg)
  }

  public danger(msg: string): string | void {
    console.error(msg)
  }
}
