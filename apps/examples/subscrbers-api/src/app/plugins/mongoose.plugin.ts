import {
  AddToContext,
  Plugin,
  AppContext,
  ServerAdapter,
  IAppConfig,
  Injectable,
} from '@kondah/core'
import mongoose from 'mongoose'

@Injectable()
export class MongooseRepository {}

export class MongoosePlugin extends Plugin {
  public name = 'mongoose'

  protected async setup(
    context: AppContext<ServerAdapter>,
    config: IAppConfig['mongoose']
  ) {
    context.energizor.register(MongooseRepository)
    // has access to config here
  }

  @AddToContext()
  async connectMongoose() {
    // TODO: Does not get config here

    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    console.log('💹 connected to MongoDB')
  }
}
