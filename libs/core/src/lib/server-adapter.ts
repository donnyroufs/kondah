// export interface IServerAdapter {
//   run(port: number, onSuccess?: () => void): void
//   use(path: string, fn: unknown): void
//   use(fn: unknown): void

//   get(path: string, ...handlers: unknown[]): void
//   post(path: string, ...handlers: unknown[]): void
//   put(path: string, ...handlers: unknown[]): void
//   patch(path: string, ...handlers: unknown[]): void
//   delete(path: string, ...handlers: unknown[]): void
//   head(path: string, ...handlers: unknown[]): void
//   options(path: string, ...handlers: unknown[]): void
// }

export abstract class ServerAdapter {
  protected abstract readonly server: unknown

  public abstract run(port: number, onSuccess?: () => void): void
  public abstract use(path: string, fn: unknown): void
  public abstract use(fn: unknown): void

  protected onSuccessListen(port: number) {
    console.log(`server is running on http://localhost:${port}`)
  }

  public abstract get(path: string, ...handlers: unknown[]): void
  public abstract post(path: string, ...handlers: unknown[]): void
  public abstract put(path: string, ...handlers: unknown[]): void
  public abstract patch(path: string, ...handlers: unknown[]): void
  public abstract delete(path: string, ...handlers: unknown[]): void
  public abstract head(path: string, ...handlers: unknown[]): void
  public abstract options(path: string, ...handlers: unknown[]): void

  /**
   * @description incase there's missing functionality you can always refer back to the original instance. However
   * you are not supposed to do this within custom plugins. Because this will resolve in conflicts when someone is using
   * a different web server than you.
   */
  public getRawServer<T>() {
    return this.server as T
  }
}
