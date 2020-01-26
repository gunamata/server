  
//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../api/users/users.model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Users', () => {
	beforeEach((done) => { //Before each test we empty the database
		User.remove({}, (err) => { 
		   done();		   
		});		
	});
	
 /*
  * Test the /POST route
  */
  describe('/POST user', () => {
	  it('it should not POST a user without email field', (done) => {
	  	let user = {
	  		firstname: "Guna",
	  		lastname: "Matamalam"
	  	}
			chai.request(server)
		    .post('/users')
		    .send(user)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('errors');
			  	res.body.errors.should.have.property('email');
			  	res.body.errors.pages.should.have.property('kind').eql('required');
		      done();
		    });
	  });
	  it('it should POST a user ', (done) => {
	  	let user = {
	  		firstname: "Guna",
	  		lastname: "Matamalam",
	  		email: "gunasekhar@outlook.com"
	  	}
			chai.request(server)
		    .post('/users')
		    .send(user)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('User created successfully');
			  	res.body.user.should.have.property('firstname');
			  	res.body.user.should.have.property('lastname');
			  	res.body.user.should.have.property('email');
		      done();
		    });
	  });
  });	
 /*
  * Test the /GET route
  */
  describe('/GET user', () => {
	  it('it should GET all the users', (done) => {
			chai.request(server)
		    .get('/users')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
  });
  
  
  
  });
  