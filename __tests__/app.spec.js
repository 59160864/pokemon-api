const request = require('supertest')
const chai = require('chai')
const app = require('../app')
chai.should()
describe('Pokemon API',() => {
    describe('GET /',()=>{
        it('should return 200 OK with "Hello world"',(done)=>
        {
            request(app).get('/')
                .expect(200)
                .end((err,res)=>{
                    res.body.should.deep.equal({ message:'Hello world' })
                    done()
                })
        })
    })
    describe('POST /pokemon/:id',( )=>
    {
        it('should return 201 Created and have new pokemon',(done)=>
        {
            request(app).post('/pokemons')
                .send({ name:'Unknown',type:'Unknown'})
                .set('Accept','application/json')
                .expect(201,done)
        })
        it('should return 400 Bad Request when missed required field',(done)=>
        {
            request(app).post('/pokemons')
                .expect(400)
                .end((err,res)=>{
                    res.body.error.should.equal('Insufficient parameters: name and type are required parameter')
                    done()
                })
        })
    })
    describe('GET /pokemon/:id',( )=>{
        it('should return 200 OK with a pokemon',(done)=>{
            doNotTrack('http://localhost:3000')
            .get('/pokemon/1')
            .reply(200,{
                id:1,
                name:'Praduk',
                type:'Fish',
                type2: null
            })
            request(app).get('/pokemon/1')
            .expect(200)
            .end((err,res)=>{
                res.body.should.to.be.an('object')
                res.body.should.have.property('id')
                res.body.should.have.property('name')
                res.body.should.have.property('type')
                done()
            })

        })
        it('should return 400 OK with a pokemon',(done)=>
        {
            request(app).get('/pokemon/99')
                .expect(400)
                .end((err,res)=>
            {
                res.body.error.should.equal('The pokemon could not be found')
                done()
            })
        })
    })
    describe('PUT /pokemon/:id',() => {
        it('should return 200 OK and the pokemon has type2',(done)=>{
            request(app).put('/pokemon/1')
                .send({type2:'Normal'})
                .set('Accept','application/json')
                .expect(200,done)
        })
        it('should return 400 Bad Request when try to update not existed pokemon',(done)=>
        {
            request(app).get('/pokemon/1')
                .expect(400)
                .end((err,res)=>
            {
                res.body.error.should.equal('Insufficient parameters: type2 are required parameter')
                done()
            })
        })
    })
})
describe('Integrating Test',()=>{
    
    it('GET /pokemons should  return list of pokemons',(done)=>{
        nock('http://localhost:3000').get('/pokemons').reply(200,[{id:1,name:'Unknown',type:'Unknown'}])
        request('http://localhost:3000').get('/pokemons').expect(200).end((err,res)=>{
            res.body.should.be.a('array')
            pokemons=res.body
            pokemons.length.should.equal(1)
            done()
        })
    })
})