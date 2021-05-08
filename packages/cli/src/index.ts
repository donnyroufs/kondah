export function cli() {
  const args = process.argv
  if (args.length <= 2) {
    console.log(`available commands \n - init`)
    return
  }

  const [, , flag] = args

  if (flag === 'init' || flag === '--init' || flag === '-init') {
    console.log('scaffolding project')
  }
}
