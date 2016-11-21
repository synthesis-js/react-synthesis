// test-server.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server/server');
const should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
	it('should list All users on /api/users GET', (done) => {
	  chai.request(app)
	    .get('/api/users')
	    .end((err, res) => {
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('array');
	      done();
	  	});
	});
	it('should list a SINGLE user on /api/user/<id> GET');
	it('should add a SINGLE user on /api/user POST', (done) => {
	  chai.request(app)
	    .post('/api/user')
	    .send({'email': 'testing@email.com', 'password': 'testing', 'name': 'Test Guy'})
	    .end(function(err, res){
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('object');
	      res.body.should.have.property('name');
	      res.body.should.have.property('email');
	      res.body.should.have.property('_id');
	      res.body.should.have.property('password');
	      res.body.should.have.property('created_at');
	      res.body.should.have.property('user_type');
	      done();
	    });
	});
	it('should update a SINGLE user on /api/user/<id> PUT');
	it('should delete a SINGLE user on /api/user/<id> DELETE');
});