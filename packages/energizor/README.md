# @Kondah/Energizor

## Register a service

```ts
energizor.addTransient(MyAppService)
energizor.addSingleton(SomeAmazingService)
```

## Invert the service

```ts
const myAppServiceToken = Symbol('IMyAppService')

energizor.addTransient<IMyAppService>(myAppServiceToken, MyAppService)
```

## Use collections to define clear boundaries

```ts
import { Energizor, ICollection, Injectable } from '@kondah/energizor'

import { CountEntity } from './count.entity'

export interface IAmazingClass {
  count: CountEntity
  speak(): void
}

@Injectable()
export class AmazingClass implements IAmazingClass {
  public constructor(public readonly count: CountEntity) {}

  public speak() {
    console.log('this is from the infra layer!')
  }
}

export class InfraCollection implements ICollection {
  configureServices(energizor: IEnergizor): void {
    energizor.addTransient(AmazingClass)
  }
}

// In your main file
const services = new Energizor()

services.addCollection(InfraCollection)
```

## Add an onBoot hook to your service

```ts
export class MyAppService implements IBoot {
  public async onBoot(): Promise<void> | void {
    console.log('hi!')
  }
}

await energizor.boot()
```

## Use your own logger

```ts
import { ILogger } from '@kondah/energizor'

export class Logger implements ILogger {
  info(msg: string): string | void {
    myLogger.log(msg)
  }
  warning(msg: string): string | void {
    myLogger.log(msg)
  }
  success(msg: string): string | void {
    myLogger.log(msg)
  }
  danger(msg: string): string | void {
    myLogger.log(msg)
  }
}

const energizor = new Energizor(new Logger())
```

## Writing tests

```ts
import { TestableEnergizor } from '@kondah/energizor'

import { CountController } from './count.controller'
import { DatabaseService } from './database.service'

const mockedDatabaseService = mock<DatabaseService>()

describe('example kondah', () => {
  let services: TestableEnergizor

  beforeAll(async () => {
    // Add ICollection to energizor if needed
    services = new TestableEnergizor([])

    services.rebind(DatabaseService, mockedDatabaseService)
  })

  test('returns the count', () => {
    const controller = services.get(CountController)

    const count = await controller.getCount()

    expect(mockedDatabaseService.get).toHaveBeenCalled()
    expect(count).toBe(0)
  })
})
```
