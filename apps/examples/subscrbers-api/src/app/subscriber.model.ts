import * as mongoose from 'mongoose'

export interface ISubscribersModel {
  _id: string
  name: string
  subscribedToChannel: string
  createdAt: Date
}

const SubscribersModel: mongoose.Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subscribedToChannel: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model<ISubscribersModel & mongoose.Document>(
  'Subscribers',
  SubscribersModel
)
