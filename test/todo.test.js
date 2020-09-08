const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/api')

chai.should()

chai.use(chaiHttp)

describe('Todo API', () => {
	var _id 

	describe('POST /', () => {
		it('It should POST a new todo', (done) => {
			const todo = {message: 'test todo'}
			chai.request(server)
					.post('/.netlify/functions/api')
					.send(todo)
					.end((err, response) => {
						response.should.have.status(201)
						response.body.should.be.a('object')
						response.body.should.have.property('_id')
						response.body.should.have.property('message').eq('test todo')
						_id = response.body._id
						done()
					})
		})
	})

	describe('GET /', () => {
		it('It should GET all the todos', (done) => {
			chai.request(server)
					.get('/.netlify/functions/api')
					.end((err, response) => {
						response.should.have.status(200)
						response.body.should.be.a('array')
						done()
					})
		})

		it('It should GET one todo', (done) => {
			chai.request(server)
					.get('/.netlify/functions/api/' + _id)
					.end((err, response) => {
            response.should.have.status(200)
            response.body.should.be.a('object')
						response.body.should.have.property('_id').eq(_id)
						response.body.should.have.property('message').eq('test todo')
            done()
          })
		})
	})

	describe('PUT /:id', () => {
		it('It should PUT one todo', (done) => {
			const todo = {message: 'updated todo'}
			chai.request(server)
					.put('/.netlify/functions/api/' + _id)
					.send(todo)
					.end((err, response) => {
						response.should.have.status(200)
						response.body.should.have.property('_id').eq(_id)
            response.body.should.have.property('message').eq('test todo')
						done()
					})
		})
	})

	describe('DELETE /:id', () => {
    it('It should DELETE one todo', (done) => {
      chai.request(server)
          .delete('/.netlify/functions/api/' + _id)
          .end((err, response) => {
            response.should.have.status(200)
            response.body.should.have.property('_id').eq(_id)
            response.body.should.have.property('message').eq('updated todo')
            done()
          })
    })
  })
})
