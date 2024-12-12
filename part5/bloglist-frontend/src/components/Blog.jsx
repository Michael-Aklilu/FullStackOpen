import { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog,user,setBlogs,blogs }) => {
  const [isVisible,setIsVisible] = useState(false)
  let [likes, setLikes] = useState(blog.likes)


  const showWhenVisible = { display: isVisible ? '': 'none' }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }
  const addLike = async() => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes++,
    }
    try{
      const updatedBlog = await blogService.update(blog.id,newBlog)
      setLikes(newBlog.likes)
    }catch(exception){
      console.log(exception)
    }

  }

  const removeBlog = async (event) => {
    const confirmed = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    const id = blog.id
    if(confirmed){
      try{
        await blogService.remove(blog.id)
        const updatedBlogs = await blogs.filter(blog => id !== blog.id)
        setBlogs(updatedBlogs)
        blogService.getAll()
      }catch(exception){
        console.log(exception)
      }
    }
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const removeButtonStyle = {
    backgroundColor: 'Blue',
    color:'white',
    borderRadius: '3px'
  }
  return ( user &&
    <div className='blogs' style={blogStyle}>
      {blog.title} {blog.author}
      <br />{isVisible ? <button onClick={toggleVisibility}>Hide</button> : <button onClick={toggleVisibility}>View</button>}
      <div style={showWhenVisible}>
        <br /> {blog.url} <br /> Likes:{likes} <button onClick={addLike}>like</button> <br /> {user.username} <br />
        <button style={removeButtonStyle} onClick={removeBlog}value={blog}>Remove</button>
      </div>
    </div>
  )
}

export default Blog