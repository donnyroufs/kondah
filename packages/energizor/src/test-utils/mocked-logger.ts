import { ILogger } from "../types"

export class MockedLogger implements ILogger {
  public warning(): string | void {
    return
  }

  public success(): string | void {
    return
  }

  public info(): string | void {
    return
  }

  public danger(): string | void {
    return
  }
}
