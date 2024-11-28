const blogsRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')



blogsRouter.get('/', async (request, response) => {    
  const blogs = await Blog.find({}).populate('user', {username:1,id:1 })
  response.json(blogs)  
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    
    const user = request.user
    const blog = new Blog({
       title: body.title,
       author: body.author,
       url:body.url,
       likes: body.likes,
       user: user.id
    })
    if(!blog.url || !blog.title){
      return response.status(400).json({
        error:'Title and Url are required fields'
      })
    }
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id',async (request,response,next) => {
   const id = request.params.id
 
   const blog = await Blog.findById(id)

   if(!blog){
     response.status(404).json({error:'blog not found'})
   }

   if(request.user.id.toString() === blog.user.toString()){
      await Blog.findByIdAndDelete(id)
      response.status(204).end()
   }
   
})
blogsRouter.put('/:id',async (request,response) => {
  const id = request.params.id
  const updatedBlog = request.body
  await Blog.findByIdAndUpdate(id,updatedBlog)
  response.status(200).end()
})
module.exports = blogsRouter
  