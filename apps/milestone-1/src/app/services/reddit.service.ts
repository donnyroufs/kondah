import { injectable } from '@konda/core'
import axios from 'axios'

export interface ILastRequestData {
  date: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posts: any[]
}

@injectable()
export class RedditService {
  private readonly _endpoint = 'https://www.reddit.com/r/webdev/new.json'
  private readonly _cache: ILastRequestData[] = []

  async getAll() {
    const shouldUseCache = this.shouldUseCacheInstead()

    if (shouldUseCache) {
      // @ts-expect-error Didn't type this.
      return this._cache[0].posts.data.children
    }

    const { data } = await axios.get(this._endpoint)
    this.setLastRequest(data)

    return data.data.children
  }

  public shouldUseCacheInstead() {
    if (this._cache.length <= 0) return

    const [previous] = this._cache
    const currentDate = Date.now()

    const timeDifference = currentDate - previous.date

    return timeDifference <= 60_000
  }

  public setLastRequest(data: any) {
    this._cache.unshift({
      date: Date.now(),
      posts: data,
    })
  }
}
