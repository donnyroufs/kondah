export interface IKondahLogger {
  info(msg: string, label?: string): void
  warning(msg: string, label?: string): void
  success(msg: string, label?: string): void
  danger(msg: string, label?: string): void
}
