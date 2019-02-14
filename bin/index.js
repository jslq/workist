#!/usr/bin/env node
const program = require('commander')
const db = require('../lib/db')
const inquirer = require('inquirer')
const chalk = require('chalk')
inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'))

program
	.version(require('../package.json').version)
	.usage('<command> [no option]')
	.action(() => {
		console.log('work')
	})

program
	.command('here')
	.description('add pwd to a new workspace')
	.action(() => {
		require('./work-here')(db)
	})

program
	.command('with')
	.description('add pwd to a exist workspace')
	.action(() => {
		require('./work-with')(db)
	})

program
	.command('delete')
	.description('delete the workspace you selected')
	.action(() => {
		require('./work-del')(db)
	})

program
	.command('ide')
	.description('change your ide\'s keyboard shortcut')
	.action(() => {
		require('./work-ide')(db)
	})

program
  .arguments('<command>')
  .action((cmd) => {
		program.outputHelp()
		console.log()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
	})

if (!process.argv.slice(2).length) {
	require('./work')(db)
}

program.parse(process.argv)
