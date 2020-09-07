const express = require('express')
const serverless = require('serverless-http')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

const app = express()
const router = express.Router()

db.defaults({ todos: [{id: 1, message: "Do CS3219 assignment"}], count: 1 })
  .write()

router.get('/', (req, res) => {
	const todos = db.get('todos').value()
	res.json(todos)
})

app.use('/.netlify/functions/api', router)

module.exports.handler = serverless(app)
