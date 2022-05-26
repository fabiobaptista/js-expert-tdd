const { describe, test } = require('mocha')
const request = require('supertest')
const app = require('./api')
const { ok, deepStrictEqual } = require('assert')

describe('API Suite Teste', () => { 
  describe('/contact', () => { 
    test('should request contact page and  return HTTP Status 200', async () => {
      const response = await request(app)
                        .get('/contact')
                        .expect(200)

      deepStrictEqual(response.text, 'contact page')
    })
   })

   describe('/hello', () => {
     test('should request an inexistent /hello route and return HTTP Status 200', async () => {
        const response = await request(app)
                          .get('/hello')
                          .expect(200)

        deepStrictEqual(response.text, 'Wooow')
     })
   })

   describe('/login', () => {
    test('should unauthorize a request when request it using wrong credentials and return HTTP Status 401', async () => {
       const response = await request(app)
                         .post('/login')
                         .send({ username: '123', password: 'admin' })
                         .expect(401)

      ok(response.unauthorized)
      deepStrictEqual(response.text, 'Logging Failed')
    })

    test('should login successfully on the login route and return HTTP Status 200', async () => {
      const response = await request(app)
                        .post('/login')
                        .send({ username: 'admin', password: 'admin' })
                        .expect(200)

      deepStrictEqual(response.text, 'Logging has successed')
   })
  })
 })
