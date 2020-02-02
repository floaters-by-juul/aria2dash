import { getStages } from './stages'

const chalk = require('chalk')
const log = console.log

async function start() {
  for (const { stage, key } of getStages()) {
    log(chalk.yellow(`Booting stage ${key}`))
    const mod = require(stage.name)

    await mod
  }
}

start()
