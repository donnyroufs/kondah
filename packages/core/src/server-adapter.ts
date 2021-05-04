/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class ServerAdapter {
  protected abstract readonly server: unknown

  public abstract run(port: number, onSuccess?: () => void): void
  public abstract use(path: string, fn: unknown): void
  public abstract use(fn: unknown): void

  public abstract get(path: string, ...handlers: unknown[]): void
  public abstract post(path: string, ...handlers: unknown[]): void
  public abstract put(path: string, ...handlers: unknown[]): void
  public abstract patch(path: string, ...handlers: unknown[]): void
  public abstract delete(path: string, ...handlers: unknown[]): void
  public abstract head(path: string, ...handlers: unknown[]): void
  public abstract options(path: string, ...handlers: unknown[]): void

  public abstract set(setting: string, val: any): void
  public abstract engine(
    ext: string,
    fn: (
      path: string,
      options: Record<string, unknown>,
      callback: (e: any, rendered?: string) => void
    ) => void
  ): void

  /**
   * @description incase there's missing functionality you can always refer back to the original instance. However
   * you are not supposed to do this within custom plugins. Because this will resolve in conflicts when someone is using
   * a different web server than you.
   */
  public getRawServer<T>() {
    return this.server as T
  }

  public onSuccessListen(port: number) {
    console.log(`server is running on http://localhost:${port}`)
  }
}
