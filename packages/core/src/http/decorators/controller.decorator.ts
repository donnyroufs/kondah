import { Injectable } from '@kondah/energizor'
import { REST } from '../rest'

export function Controller(pathName: string) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (target: Function) => {
    Injectable()(target)

    REST.controllers.forEach((ctrl) =>
      ctrl.constr == null && ctrl.id === target.name
        ? // @ts-ignore
          (ctrl.constr = target)
        : null
    )

    target.prototype.__endpoint__ = pathName
  }
}
