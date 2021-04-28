import { AddToContext } from '@kondah/core'
import { Model } from 'mongoose'
import { MongoosePlugin } from './mongoose.plugin'

export class SuperMongoosePlugin extends MongoosePlugin {
  public name = 'super-mongoose'

  @AddToContext()
  async logSubscribersOnVisit(model: Model<any>) {
    console.log(model.find({}))
  }
}
