import { Injectable } from '../../src'
import { BootableService } from './bootable.service'

@Injectable()
export class CountService {
  private _count = 24

  public constructor(public readonly bootableService: BootableService) {}

  public getCount() {
    return this._count
  }

  public setCount(value: number) {
    this._count = value
  }
}
