import * as fse from 'fs-extra'
import * as path from 'path'

import { exec } from 'child_process'

export function cli() {
  const args = process.argv
  if (args.length <= 2) {
    console.log('example usage: ')
    console.log('---')
    console.log('kondah create')
    console.log('kondah create my-app')
    return
  }

  const [, , flag, name] = args

  if (flag === 'create') {
    console.log('scaffolding project...')

    const templateDir = path.join(__dirname, '../templates/basic')
    const copyDir = name != null ? process.cwd() + `/${name}` : process.cwd()

    fse.copy(templateDir, copyDir).then(() => {
      exec('yarn')
    })
  }
}
