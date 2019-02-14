const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileAsync')
const path = require('path')

const adapter = new FileSync(path.resolve(__dirname, 'workspace.json'))
const db = low(adapter)

db.then(db => {
	return db.defaults({
		workspaces: [],
		//drive by vscode
		ide: 'code',
	}).write()
})

module.exports = db
