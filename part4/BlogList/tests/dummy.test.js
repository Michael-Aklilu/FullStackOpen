const {test, describe} = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('Dummy',() =>{
    test('dummy returns one', () =>{
        const blogs = []
        assert.strictEqual(listHelper.dummy(blogs), 1)
    })
})