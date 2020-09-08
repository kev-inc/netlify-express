const express = require('express')
const serverless = require('serverless-http')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Todo = require('../model/todo')
require('dotenv').config()
const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const uri = process.env.MONGO_URL

mongoose.connect(uri, {
	useNewUrlParser: true,
  useUnifiedTopology: true,
	useFindAndModify: false
})
.then(() => {
  console.log('MongoDB Connected...')
})
.catch(err => console.log(err))
const db = mongoose.connection

router.get('/', async (req, res) => {
	const todos = await Todo.find()
	res.json(todos)
})

router.get('/:id', async (req, res) => {
	try {
		const {id} = req.params
		const todo = await Todo.findById(id)
		res.json(todo)
	} catch(err) {
		res.status(404).json({message: 'Todo not found'})
	}
})

router.post('/', async (req, res) => {
	const todo = new Todo({ message: req.body.message })
	try {
		const savedTodo = await todo.save()
		res.status(201).json(savedTodo)
	} catch(err) {
		res.json({ message: err })
	}
})

router.put('/:id', async (req, res) => {
	const {id} = req.params
	const {message} = req.body
	try {
		if(!id) {
			throw "No ID given"
		}
		if(!message) {
			throw "No message given"
		}
		const updatedTodo = await Todo.findByIdAndUpdate(id, {message: message})
		res.json(updatedTodo)
	} catch(err) {
    res.json({ message: err })
  }
})

router.delete('/:id', async (req, res) => {
	const {id} = req.params
	try {
		if(!id) {
			throw "No ID given"
		}
		const removedTodo = await Todo.findByIdAndDelete(id)
		res.json(removedTodo)
	} catch(err) {
    res.json({ message: err })
  }
})

app.use('/.netlify/functions/api', router)
module.exports = app
module.exports.handler = serverless(app)
