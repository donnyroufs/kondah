export interface IKondahLogger {
  info(msg: string, label?: string): void | string
  warning(msg: string, label?: string): void | string
  success(msg: string, label?: string): void | string
  danger(msg: string, label?: string): void | string
}
