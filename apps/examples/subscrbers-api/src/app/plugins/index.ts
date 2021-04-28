import { Model, Document } from 'mongoose'

declare module '@kondah/core' {
  interface AppContext {
    connectMongoose(): Promise<void>
    logSubscribersOnVisit<T extends Document>(
      model: Model<T>
    ): Promise<Model<T>>
  }

  interface IAppConfig {
    mongoose: {
      uri: string
    }
  }
}

export {}
