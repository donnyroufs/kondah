# Kondah

<p>
  <img src="https://kondah.dev/logo.svg" width="16" />
  ondah is a micro framework that promotes an OO style of programming in TypeScript. It has it's own dependency container which you as a user can extend with anything you like.
</p>

```ts
import { Kondah, ExcludeHooks, IEnergizor } from '@kondah/core'

import { AppController } from './AppController'

export class Application extends Kondah {
  public configureServices(services: IEnergizor) {
    services.addSingleton(AppController)
  }

  public async boot(services: IEnergizor) {
    await services.boot()
  }
}
```
