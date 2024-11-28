const {test,beforeEach,after} = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')
const {blogs} = require('./ApiTestHelper')
const Blog = require('../models/blog')

beforeEach(async () => {
   await Blog.deleteMany({})
   await Blog.insertMany(blogs)
})

test('corrects amount of blog posts in JSON', async () => {
    const response = await api
     .get('/api/blogs')
     .expect(200)
     .expect('Content-Type',/application\/json/)
    assert.strictEqual(response.body.length,blogs.length)
    
})
test('unique identifier is called _id', async () => {
    const response = await api
       .get('/api/blogs')
       .expect(200)
       .expect('Content-Type',/application\/json/)
    const blogs = await response.body.map(async(blog) => blog);
    const allHaveId = await blogs.every(async(blog) => hasOwnProperty('id'))
    
    assert.strictEqual(allHaveId,true)
    
})

test('valid blog successfully being added',async () => {
    const newBlog = {
        title: "Michael's journey",
        author: "Michael Aklilu",
        url: "https://google.com",
        likes: 990,
    }
    const response = await api
       .post('/api/blogs')
       .send(newBlog)
       .expect(201)
       .expect('Content-Type', /application\/json/)
    const newBlogs = await api.get('/api/blogs')
     
   assert.strictEqual(newBlogs.body.length, blogs.length + 1)
})

test('default likes property will be zero', async () => {
    const newBlog = {
        title: 'Missing likes',
        author: 'Michael Aklilu',
        url: 'https://google.com',
    }
    await api
       .post('/api/blogs')
       .send(newBlog)
       .expect(201)
       .expect('Content-Type', /application\/json/)
       
       const response = await api.get('/api/blogs')
       const blogsSize = blogs.length
       const newestBlog = response.body[blogsSize]
       assert.strictEqual(newestBlog.likes,0)
})

test('title and url properties are present',async () => {
    const newBlog = {
        author: "Michael Desta",
        url: "https://google.com"
    }
    await api
     .post('/api/blogs')
     .send(newBlog)
     .expect(400)
     .expect('Content-Type',/application\/json/)
    
    const response = await api.get('/api/blogs')
    const content = await response.body
    assert.strictEqual(content.length,blogs.length)
})

test('a specific blog is deleted', async () =>{
    const response = await api
       .get('/api/blogs')
       .expect(200)

    const blogs = response.body
    const idOfBlogToDelete = response.body[0].id
    await api
       .delete(`/api/blogs/${idOfBlogToDelete}`)
       .expect(204)

    const updatedBlogs = await api.get('/api/blogs')
     
    assert.strictEqual(updatedBlogs.body.length, blogs.length-1)
    
})

test('a specific blog is updated', async () => {
    const initialBlogs = await api.get('/api/blogs')
    const initialContent = initialBlogs.body
    const id = initialContent[0].id
    const newBlog = {
        title: 'The wonderkid',
        author: 'Wayne Rooney',
        url: 'https://google.com',
        likes: 9999
    }
    await api
       .put(`/api/blogs/${id}`)
       .send(newBlog)
       .expect(200)
       
    const response = await api.get('/api/blogs')
    const content = await response.body.map((blog) => blog.title)
    assert(content.includes('The wonderkid'))
})
after(async() => mongoose.connection.close())