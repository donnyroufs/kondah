import { Injectable } from '@kondah/core'
import { MongooseRepository } from './plugins/mongoose.plugin'
import { SubscriberRepository } from './subscriber.repository'

@Injectable()
export class SubscriberService {
  constructor(
    private readonly _subscriberRepo: SubscriberRepository
  ) // private readonly _mongooseRepo: MongooseRepository
  {}

  public async getAllSubscribers() {
    const subscribers = await this._subscriberRepo.getAllSubscribers()
    return subscribers
  }

  public async getOneSubscriber(id: string) {
    const subscriber = await this._subscriberRepo.findOneSubscriber(id)

    if (!subscriber) {
      throw new Error('Not found')
    }

    return subscriber
  }

  public async createSubscriber(data: any) {
    const subscriber = await this._subscriberRepo.save(data)
    return subscriber
  }

  public async updateSubscriber(data: any) {
    return this._subscriberRepo.updateSubscriber(data)
  }

  public async deleteSubscriber(id: string) {
    return this._subscriberRepo.delete(id)
  }
}
