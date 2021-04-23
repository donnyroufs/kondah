import { injectable } from '@konda/core'
import { AuthService } from './auth.service'

@injectable
export class UserService {
  constructor(private readonly _authService: AuthService) {}

  getUsers() {
    return []
  }
}
