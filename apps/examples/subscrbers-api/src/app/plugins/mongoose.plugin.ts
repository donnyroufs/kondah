import {
  AddToContext,
  Plugin,
  AppContext,
  ServerAdapter,
  IAppConfig,
} from '@kondah/core'
import mongoose from 'mongoose'

export class MongoosePlugin extends Plugin<IAppConfig['mongoose']> {
  public name = 'mongoose'

  protected async setup(context: AppContext<ServerAdapter>) {
    return
  }

  @AddToContext()
  async connectMongoose() {
    await mongoose.connect(this.config.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    console.log('💹 connected to MongoDB')
  }
}
