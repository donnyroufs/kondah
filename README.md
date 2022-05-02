# <img src="https://kondah.dev/logo.svg" width="32" /> ondah

<p>
  Kondah is a micro framework that promotes an OO style of programming in TypeScript. It has it's own dependency container which you as a user can extend with anything you like. Its goal is to be as minimalistic as possible with the option for you to compose anything together for your need.
</p>

```ts
export class Application extends Kondah {
  public configureServices(services: IEnergizor): void {
    services.addTransient(MyService)
    services.addSingleton(AppController)
  }

  public async setup(services: IEnergizor): Promise<void> {
    await http.run(5000)
  }
}

export async function bootstrap() {
  const app = new Application({
    httpDriver: ExpressHttpAdapter,
  })

  await app.boot()
}

bootstrap()
```

# Roadmap

There's no set roadmap for this project because it's more a hobby project than anything else. However, I am building it to use for my own serious projects so please feel free to give Kondah a fair shot!

- [x] Remove old POC and add base for Kondah and Energizor.
- [x] Allow for registering dependencies and resolving through Reflect API.
- [x] Register services at boundaries (ICollection).
- [x] Use Energizor during unit tests.
- [x] Register constants (functions, values) to Energizor which improves testability.
- [ ] Implement the base of the Express Http Platform to create **restful APIs** with ease.
- [ ] Add custom services to Energizor which allows for composition.
- [ ] Add a testable kondah instance.
- [ ] Create new Kondah website with up to date documentation.
- [ ] Add CLI to scaffold files.
- [ ] Add a REPL to easily play around with your codebase.
- [ ] Add OpenAPI support to http platforms.
