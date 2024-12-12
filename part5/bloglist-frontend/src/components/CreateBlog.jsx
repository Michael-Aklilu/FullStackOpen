import { useState,useEffect,useRef } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'


const CreateBlog = ({ user,setBlogs,blogs,setSuccessMessage, setShowMessage }) => {
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')

  const createBlogRef = useRef()

  const handleCreate = async (event) => {
    event.preventDefault()
    try{
      const newBlog = { title,author,url }
      const addedBlog = await blogService.create(newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(addedBlog))

      setSuccessMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
      createBlogRef.current.toggleVisibility()
      setShowMessage(true)
      setTimeout(() => {
        setShowMessage(false)
      },3000)


    }catch(exception){
      console.log('Blog not added')
    }
  }

  return ( user &&
        <div>
          <Togglable buttonLabel='New blog' ref={createBlogRef}>
            <h1>Create new</h1>
            <form onSubmit={handleCreate}>
              title:<input placeholder="Becoming a software engineer"type="text" value={title} onChange={({ target }) => setTitle(target.value)}/> <br />
              author:<input placeholder="Michael Aklilu"type="text" value={author} onChange={({ target }) => setAuthor(target.value)}/> <br />
              url:<input placeholder='fullstackopen.com' type="text" value={url} onChange={({ target }) => setUrl(target.value)}/> <br />
              <button type='submit'>Create</button> <br />
            </form>
          </Togglable>
        </div>
  )
}
export default CreateBlog