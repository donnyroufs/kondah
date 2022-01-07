import { Injectable } from '../../src'
import { CountService } from './count.service'

@Injectable()
export class MailService {
  public constructor(public readonly countService: CountService) {
    this.countService.setCount(0)
  }

  public send(): boolean {
    this.countService.setCount(this.countService.getCount() + 1)

    return true
  }
}
