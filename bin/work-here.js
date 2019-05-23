const inquirer = require('inquirer')

const workHere = (db) => {
	const pwd = process.cwd()
	const name = pwd.split('/').pop()
	inquirer.prompt([
		{
			type: 'input',
			name: 'workspace',
			message: 'Name your new workspace:',
			default: name
		}
	]).then((answer) => {
		if(answer.workspace.length === 0) return workHere()
		db.then(db => {
			db.get('workspaces')
				.push({
					name: answer.workspace,
					pwds: [pwd]
				})
				.write()
		})
	})
}

module.exports = workHere
