import { AddToContext, AppContext, Plugin } from '@kondah/core'

export class HelloPlugin extends Plugin {
  public name = 'hello-plugin'

  async setup(ctx: AppContext) {
    console.log('installing', this.name)
  }

  @AddToContext()
  hi() {
    console.log('hi you! 🙌')
  }
}
