import { KondahPlatform, KondahPlugin } from '@kondah/core'

export class RestPlugin extends KondahPlugin<KondahPlatform> {
  public async install(platform: KondahPlatform): Promise<void> {}
}
