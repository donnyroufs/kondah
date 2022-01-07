export const googleMeServiceToken = Symbol('IGoogleMeService')

export interface IGoogleMeService {
  google(val: string): boolean
}

export class GoogleMeService implements IGoogleMeService {
  google(val: string): boolean {
    return true
  }
}
