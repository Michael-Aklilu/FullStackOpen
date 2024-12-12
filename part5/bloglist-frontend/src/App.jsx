import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/login'
import CreateBlog from './components/CreateBlog'
import SuccessNotification from './components/SuccessNotification'

import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [showNotification, setShowNotification] = useState(false)
  const [notification, setNotification] = useState('')
  const [successMessage,setSuccessMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)


  useEffect(() => {
    if(user){
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    }
  }, [user])

  useEffect(() => {
    const userJSON = window.localStorage.getItem('LoggedInUser')
    if(userJSON){
      const user = JSON.parse(userJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('LoggedInUser')
    blogService.setToken(null)
    window.location.reload()
  }

  const compareLikes = (a,b) => {
    return a.likes - b.likes
  }
  blogs.sort(compareLikes)



  return (
    <div>
      <LoginForm username={username} password={password} setPassword={setPassword} setUsername={setUsername} setUser={setUser} user={user} setNotification={setNotification} setShowNotification={setShowNotification} notification={notification} showNotification={showNotification}/>

      {user !== null ? <h2>Blogs</h2> : null}
      <SuccessNotification showMessage={showMessage} successMessage={successMessage}/>

      {user !== null ? `${user.username} logged in `:null}
      {user !== null ? <button onClick={handleLogout}>Logout</button>: null}

      <CreateBlog user={user} setBlogs={setBlogs} blogs={blogs} setSuccessMessage={setSuccessMessage} setShowMessage={setShowMessage}/>


      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}user={user} setBlogs={setBlogs} blogs={blogs}/>
      )}
    </div>
  )
}

export default App