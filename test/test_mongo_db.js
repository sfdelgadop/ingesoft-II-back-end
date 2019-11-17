let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('get all recipes: ',()=>{
    it('should get all recipes', (done) => {
    chai.request(url)
    .get('/ver-recipe')
    .end( function(err,res){
    console.log(res.body)
    expect(res).to.have.status(200);
    done();
    });
    });
   });


   
describe('get all region: ',()=>{
    it('should get all region', (done) => {
    chai.request(url)
    .get('/ver-region')
    .end( function(err,res){
    console.log(res.body)
    expect(res).to.have.status(200);
    done();
    });
    });
   });

   
describe('get all comments: ',()=>{
    it('should get all comments', (done) => {
    chai.request(url)
    .get('/ver-comments')
    .end( function(err,res){
    console.log(res.body)
    expect(res).to.have.status(200);
    done();
    });
    });
   });

   
describe('get all likes: ',()=>{
    it('should get all likes', (done) => {
    chai.request(url)
    .get('/ver-likes')
    .end( function(err,res){
    console.log(res.body)
    expect(res).to.have.status(200);
    done();
    });
    });
   });

   
describe('get all ingredient: ',()=>{
    it('should get all ingredient', (done) => {
    chai.request(url)
    .get('/ver-ingredient')
    .end( function(err,res){
    console.log(res.body)
    expect(res).to.have.status(200);
    done();
    });
    });
   });
