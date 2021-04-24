import { injectable } from '@konda/core'
import { AuthService } from './auth.service'

@injectable()
export class UserService {
  public users: number[] = []
  constructor(private readonly _authService: AuthService) {}

  getNested() {
    return this._authService.fromNested()
  }

  getUsers() {
    return this.users
  }

  addUser() {
    this.users.push(this.currentUsersInLength + 1)
  }

  get currentUsersInLength() {
    return this.users.length
  }
}
