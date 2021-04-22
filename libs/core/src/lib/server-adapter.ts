export abstract class ServerAdapter {
  protected abstract readonly server: unknown

  public abstract run(port: number, onSuccess?: () => void): void
  public abstract use(namespace: string, fn: any): void
  public abstract use(fn: any): void

  protected onSuccessListen(port: number) {
    console.log(`server is running on http://localhost:${port}`)
  }

  public getRawServer<T>() {
    return this.server as T
  }
}
