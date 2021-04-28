import { Injectable } from '@kondah/core'
import * as mongoose from 'mongoose'

@Injectable()
export class DatabaseService {
  async connect(uri: string = process.env.DB_URI as string) {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    console.log('💹 connected to MongoDB')
  }
}
