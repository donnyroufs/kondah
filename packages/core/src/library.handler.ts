import { AppContext } from './contexts'
import { IHandler, NewableKondahLibrary } from './types'

export class LibraryHandler implements IHandler {
  constructor(private readonly _libraries: NewableKondahLibrary[]) {}

  install(appContext: AppContext): void | Promise<void> {
    this._libraries.forEach((Lib) => {
      new Lib().configureServices(appContext.energizor)
    })
  }
}
