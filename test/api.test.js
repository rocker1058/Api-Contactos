const request = require('supertest') 

const app= require('../src/index')

it('rta', done =>{
    request(app)
        .get('/users')
        .set('Accept','app/json')
        .expect('Content-type',/json/)
        .expect(200,done)
})