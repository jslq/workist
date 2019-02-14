const inquirer = require('inquirer')

const workIde = (db) => {
	db.then(db => {
		inquirer.prompt([
			{
				type: 'input',
				name: 'ide',
				message: 'Change your ide keyboard shortcut: ',
			}
		]).then((answer) => {
			db.set('ide', answer.ide).write()
		})
	})
}

module.exports = workIde
