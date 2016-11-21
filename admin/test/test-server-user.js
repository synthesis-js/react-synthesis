// test-server.js
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const User = require('../server/models/user');
const app = require('../server/server');

const should = chai.should();
chai.use(chaiHttp);

describe('Users', () => {

	User.collection.drop();

	beforeEach((done) => {
		let newUser = new User({
			'email': 'testing@email.com', 
			'password': 'testing', 
			'name': 'Test Guy'
		});

		newUser.save((err) => {
			done();
		});
	});

	afterEach((done) => {
		User.collection.drop();
		done();
	});

	it('should list All users on /api/users GET', (done) => {
	  chai.request(app)
	    .get('/api/users')
	    .end((err, res) => {
	      res.should.have.status(200);
	      res.should.be.json;
	      res.body.should.be.a('array');
	      res.body[0].should.have.property('name');
	      res.body[0].name.should.equal('Test Guy');
	      res.body[0].should.have.property('email');
	      res.body[0].email.should.equal('testing@email.com');
	      res.body[0].should.have.property('_id');
	      res.body[0].should.have.property('password');
	      res.body[0].should.have.property('created_at');
	      res.body[0].should.have.property('user_type');
	      done();
	  	});
	});
	it('should list a SINGLE user on /api/user/<id> GET', (done) => {
		const newUser = new User({
			name: 'Get Test',
			email: 'gettest@user.com',
			password: 'testPass'
		});

		newUser.save((err, data) => {
			chai.request(app)
				.get('/api/user/' + data.id)
				.end((err, res) => {
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a('object');
					res.body._id.should.equal(data.id);
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.should.have.property('email');
          res.body.name.should.equal('Get Test');
          res.body.email.should.equal('gettest@user.com');
					done();
				});
		});
	});
	it('should add a SINGLE user on /api/user POST', (done) => {
	  chai.request(app)
	    .post('/api/user')
	    .send({'email': 'testing2@email.com', 'password': 'testing2', 'name': 'Test2 Guy'})
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