const express = require('express')
const serverless = require('serverless-http')
const mongoose = require('mongoose')
const Todo = require('../model/todo')
require('dotenv').config()

const app = express()
const router = express.Router()

const uri = process.env.MONGO_URL
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
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

app.use('/.netlify/functions/api', router)
module.exports = app
module.exports.handler = serverless(app)
