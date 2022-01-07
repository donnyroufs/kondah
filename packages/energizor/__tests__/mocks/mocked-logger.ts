import { ILogger } from '../../src'

export class MockedLogger implements ILogger {
  warning(msg: string): string | void {
    return
  }

  success(msg: string): string | void {
    return
  }

  info(msg: string): void {
    return
  }
  danger(msg: string): void {
    return
  }
}
