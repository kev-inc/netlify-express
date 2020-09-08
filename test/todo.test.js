const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/api')

chai.should()

chai.use(chaiHttp)

describe('Todo API', () => {
	describe('GET /.netlify/functions/api', () => {
		it('It should GET all the todos', (done) => {
			chai.request(server)
					.get('/.netlify/functions/api')
					.end((err, response) => {
						response.should.have.status(200)
						response.body.should.be.a('array')
						done()
					})
		})
	})


})
