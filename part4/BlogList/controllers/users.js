const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const Blog = require('../models/blog')

userRouter.post('/', async (request,response) =>{
    const {username,name,password} = request.body
    if(password.length < 3){
        response.status(400).json({error: ' Password must be 3 or more letters long'})
    } 
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)
    const newUser = new User({
        name,
        passwordHash,
        username
    })
    const savedUser = await newUser.save()
    
    response.status(201).json(savedUser)

})

userRouter.get('/', async (request,response) =>{
    const users = await User.find({}).populate('blogs', {title:1, author:1,likes:1})
    response.status(200).json(users);
})

module.exports = userRouter