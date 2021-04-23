import 'reflect-metadata'

export function injectable() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (target: any) {
    const injectables = Reflect.getMetadata('design:paramtypes', target)
    target.prototype.__injectables__ = injectables
  }
}
