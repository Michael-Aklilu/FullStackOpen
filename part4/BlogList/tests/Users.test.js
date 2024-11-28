const {test,beforeEach,after,describe} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')
const bcrypt = require('bcryptjs/dist/bcrypt')
const api = supertest(app)
const mongoose = require('mongoose')

describe('for the users in the bloglist',() => {
    
    test('adding a valid user', async () => {
      const password = 'waynerooney'
      const saltRounds = 10
      const passwordHash = bcrypt.hash(password,saltRounds)
      const newUser = new User({
        username: 'Endri',
        name: 'Endrias Aklilu',
        passwordHash
      })
      api 
       .post('/api/users')
       .send(newUser)
       .expect(201)
       .expect(/application\/json/)   
        
    })

    test('adding an invalid user', async() => {
        const password = 'waynerooney'
        const saltRounds = 10
        const passwordHash = bcrypt.hash(password,saltRounds)
        const newUser = new User({
          username: 'EA',
          name: 'Endrias Aklilu',
          passwordHash
        })
        api 
         .post('/api/users')
         .send(newUser)
         .expect(400)
         .expect(/application\/json/)  
        
    })
    after(() => mongoose.connection.close())
})