const inquirer = require('inquirer')

const workDel = (db) => {
	db.then(db => {
		const ide = db.get('ide')
		const list = db.get('workspaces').value().map(_ => _.name)
		inquirer.prompt([
			{
				type: 'autocomplete',
				name: 'workspace',
				message: 'Select the workspace you want to delete: ',
				source: (_, input) => {
					if(!input) return Promise.resolve(list)
					return Promise.resolve(list.filter(_ => _.indexOf(input) > -1))
				},
			}
		]).then((answer) => {
			const list = db.get('workspaces').value()
			for(let i = 0; i < list.length; i++) {
				if(list[i].name === answer.workspace) {
					list.splice(i, 1)
					db.get('workspaces')
						.set(list)
						.write()
					break
				}
			}
		})
	})
}

module.exports = workDel
