const mongoose = require('mongoose')

var todoSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  }
})

var Todo = new mongoose.model('Todo', todoSchema)

module.exports = Todo
