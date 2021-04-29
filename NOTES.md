## Define routes without decorators

```ts
ctx.router(AppController).build((controller) => {
  controller.index('/', [loggerMiddleware])
  controller.store('/')
})
```

## Prevents the server from running when testing.

```ts
  protected async setup(ctx: AppContext<ExpressAdapter>) {
    return () => ctx.server.run(5000)
  }
```

## possible way to do some preconfiguration with plugins before we hit setup

```ts
  protected async $preSetup() {}
  // OR
  protected async configurePlugins(plugins: Plugin[]){}
  protected async composePlugins(plugins: Plugin[]){}
```

## New API to create Plugins

```ts
@Plugin({
  name: "",
  description: "",
  tags: [""]
})
class CoolPlugin {...}
```
