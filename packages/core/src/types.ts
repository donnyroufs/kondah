export interface IKondahLogger {
  info(msg: string): void | string
  warning(msg: string): void | string
  success(msg: string): void | string
  danger(msg: string): void | string
}
