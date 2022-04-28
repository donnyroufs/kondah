import { Inject } from '@kondah/energizor'
import { httpContextToken } from './http.context'

export function InjectHttpContext() {
  return Inject(httpContextToken)
}
