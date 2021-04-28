import { Injectable } from '@kondah/core'
import subscriberModel from './subscriber.model'

@Injectable()
export class SubscriberRepository {
  private readonly _model = subscriberModel

  public async getAllSubscribers() {
    return this._model.find({})
  }

  public async findOneSubscriber(id: string) {
    return this._model.findById(id)
  }

  public async save(data: any) {
    const subscriber = new this._model(data)
    return subscriber.save()
  }

  async updateSubscriber({ _id, ...data }: any) {
    await this._model.updateOne({ _id }, data)
    return this.findOneSubscriber(_id)
  }

  public async delete(id: string) {
    const { deletedCount } = await this._model.deleteOne({ _id: id })
    return deletedCount ? deletedCount >= 1 : false
  }
}
