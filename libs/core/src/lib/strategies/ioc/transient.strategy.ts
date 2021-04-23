import { Strategy } from './strategy'

export class TransientStrategy extends Strategy {
  execute(): void {
    throw new Error('Method not implemented.')
  }
}
