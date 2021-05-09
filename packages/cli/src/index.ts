import * as fse from 'fs-extra'
import * as path from 'path'
import * as inquirer from 'inquirer'

import { exec } from 'child_process'
import { Logger } from '@kondah/core'

const logger = new Logger('border')
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

  if (plugins.length === 1 && plugins.includes('http-controller')) {
    return path.join(__dirname, '../templates/http-controller')
  }

  if (plugins.length === 1 && plugins.includes('http-context')) {
    return path.join(__dirname, '../templates/http-context')
  }

  return path.join(__dirname, '../templates/controller-context')
}

export function cli() {
  logger.info('Create a project\n', 'KONDAH')

  inquirer
    .prompt([
      {
        name: 'pckg',
        type: 'list',
        message: 'What package manager to use?',
        choices: ['yarn', 'npm'],
        default: 'yarn',
      },
      {
        type: 'checkbox',
        name: 'plugins',
        message: 'What plugins do you want to be included?',
        choices: ['http-controller', 'http-context'],
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
        logger.info('Generating files...', 'KONDAH')

        const templateDir = getTemplateDir(plugins)
        const installDir = !installHere
          ? process.cwd() + '/' + _installDir
          : process.cwd()

        setTimeout(
          () => logger.info('Copying generated files...', 'KONDAH'),
          4000
        )

        fse.copy(templateDir, installDir).then(() => {
          setTimeout(
            () => logger.info('Installing packages...', 'KONDAH'),
            6000
          )

          if (pckg === 'npm') {
            return exec(`cd ${installDir} && npm install`)
          }

          return exec(`cd ${installDir} && yarn`)
        })
      }
    )
}
