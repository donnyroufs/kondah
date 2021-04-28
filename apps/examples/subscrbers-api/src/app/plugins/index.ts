import { Model } from 'mongoose'

declare module '@kondah/core' {
  interface AppContext {
    connectMongoose(): Promise<void>
    logSubscribersOnVisit(model: Model<any>): Promise<void>
  }

  interface IAppConfig {
    mongoose: {
      uri: string
    }
  }
}

export {}
