const inquirer = require('inquirer')
const chalk = require('chalk')

const workWith = (db) => {
	const pwd = process.cwd()
	db.then(db => {
		const list = db.get('workspaces').value().map(_ => _.name)
		inquirer.prompt([
			{
				type: 'autocomplete',
				name: 'workspace',
				message: 'Select the workspace you add to: ',
				source: (_, input) => {
					if(!input) return Promise.resolve(list)
					return Promise.resolve(list.filter(_ => _.indexOf(input) > -1))
				},
			}
		]).then((answer) => {
			const list = db.get('workspaces').value()
			for(let i = 0; i < list.length; i++) {
				if(list[i].name === answer.workspace) {
					if(!~list[i].pwds.indexOf(pwd)) {
						list[i].pwds.push(pwd)
						db.get('workspaces')
							.set(list)
							.write()
					} else {
						console.log(chalk.red('workspace exists'))
					}
					break
				}
			}
		})
	})
}

module.exports = workWith
