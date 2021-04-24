import { IAppConfig } from '@konda/core'

export const appConfig: IAppConfig = {
  'static-files': {
    path: 'public',
  },
  'http-controller': {
    serveRoutes: true,
  },
}
