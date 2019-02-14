const inquirer = require('inquirer')
const chalk = require('chalk')
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const work = (db) => {
	db.then(db => {
		const ide = db.get('ide')
		const list = db.get('workspaces').value().map(_ => _.name)
		inquirer.prompt([
			{
				type: 'autocomplete',
				name: 'workspace',
				message: 'Select the workspace you want to open: ',
				source: (_, input) => {
					if(!input) return Promise.resolve(list)
					return Promise.resolve(list.filter(_ => _.indexOf(input) > -1))
				},
			}
		]).then((answer) => {
			const waitForOpen = db.get('workspaces')
														.find({name: answer.workspace})
														.value().pwds
			try {
				await exec(waitForOpen.map(_ => `${ide} ${_}`).join(' && '))
			} catch(e) {
				console.log(e)
				console.log(chalk.red(' open failed!'))
			}
		})
	})
}

module.exports = work
