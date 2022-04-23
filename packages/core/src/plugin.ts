export abstract class KondahPlugin<T> {
  public abstract install(platform: T): Promise<void>
}
