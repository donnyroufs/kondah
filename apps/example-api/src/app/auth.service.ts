import { injectable } from '@konda/core'
import { NestedService } from './nested.service'

@injectable
export class AuthService {
  constructor(private readonly _nestedService: NestedService) {}
}
