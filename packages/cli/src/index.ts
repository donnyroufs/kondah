import * as fse from 'fs-extra'
import * as path from 'path'
import * as inquirer from 'inquirer'

import { exec } from 'child_process'

export interface IAnswers {
  pckg: 'yarn' | 'npm'
  plugins: string[]
  installHere: boolean
  installDir?: string
}

function getTemplateDir(plugins: string[]) {
  if (plugins.length <= 0) {
    return path.join(__dirname, '../templates/basic')
  }

  // if (plugins.length === 1 && plugins.includes('http-controller')) {
  //   return path.join(__dirname, '../templates/http-controller')
  // }

  // if (plugins.length === 1 && plugins.includes('http-context')) {
  //   return path.join(__dirname, '../templates/http-context')
  // }

  return path.join(__dirname, '../templates/controller-context')
}

export function cli() {
  inquirer
    .prompt([
      {
        name: 'pckg',
        type: 'list',
        message: 'What package manager to use?',
        choices: ['yarn', 'npm'],
        default: 'npm',
      },
      {
        type: 'checkbox',
        name: 'plugins',
        message: 'What plugins do you want to be included?',
        choices: ['http-controller (comes with http-context)'],
      },
      {
        type: 'confirm',
        name: 'installHere',
        message: 'Scaffold project in current directory?',
      },
      {
        when: (answers) => !answers.installHere,
        type: 'input',
        name: 'installDir',
        message: 'Folder name to scaffold project into?',
      },
    ])
    .then(
      ({ plugins, installHere, pckg, installDir: _installDir }: IAnswers) => {
        console.log('scaffolding project...')
        const templateDir = getTemplateDir(plugins)
        const installDir = !installHere
          ? process.cwd() + '/' + _installDir
          : process.cwd()

        fse.copy(templateDir, installDir).then(() => {
          if (pckg === 'npm') {
            return exec(`cd ${installDir} && npm install`)
          }

          return exec(`cd ${installDir} && yarn`)
        })
      }
    )
}
