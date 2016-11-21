// test-server.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server/server');
const should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
	it('should list All users on /api/users GET');
	it('should list a SINGLE user on /api/user/<id> GET');
	it('should add a SINGLE user on /api/user POST');
	it('should update a SINGLE user on /api/user/<id> PUT');
	it('should delete a SINGLE user on /api/user/<id> DELETE');
});