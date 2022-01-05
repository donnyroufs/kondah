import { Inject, Injectable } from '../../src'
import { googleMeServiceToken, IGoogleMeService } from './google-me.service'

export const databaseServiceToken = Symbol('IDatabaseServiceToken')

export interface IDatabaseService {
  googleMeService: IGoogleMeService
  get(): number
}

@Injectable()
export class DatabaseService implements IDatabaseService {
  public constructor(
    @Inject(googleMeServiceToken)
    public readonly googleMeService: IGoogleMeService
  ) {}

  public get(): number {
    return 100
  }
}
