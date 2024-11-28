const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    if(blogs.length === 0) return 0
    return blogs.reduce((sum,blog) =>{
      return sum + blog.likes
    },0)
}

const favoriteBlog = (blogs) => {

  if(blogs.length === 0) return {}
  else if(blogs.length === 1){
    return {
        title: blogs[0].title,
        author: blogs[0].author,
        likes : blogs[0].likes
    }
  }
  let mostPopular = blogs[0];
  for(let blog of blogs){
    if(blog.likes > mostPopular.likes){
        mostPopular = blog
    }
  }
  return {
    title : mostPopular.title,
    author : mostPopular.author,
    likes : mostPopular.likes
  }
}

module.exports = {
    dummy,totalLikes,favoriteBlog
}