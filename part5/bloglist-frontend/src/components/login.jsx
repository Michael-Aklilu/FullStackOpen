
import loginService from '../services/login'
import blogService from '../services/blogs'
import ErrorNotification from './errorNotification'
const LoginForm = ({ setPassword,setUser,setUsername,username,password,user,notification,setShowNotification, setNotification,showNotification }) => {
  const handleLogin = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({ username,password })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      window.localStorage.setItem('LoggedInUser', JSON.stringify(user))

    }catch(exception){
      console.log('Wrong username and password')
      setNotification('Wrong username and password')
      setShowNotification(true)
      setTimeout(() => {
        setShowNotification(false)
      },3000)

    }
  }


  return ( !user &&
        <div>
          <form onSubmit={handleLogin}>
            <h1>Log in to application</h1>
            <ErrorNotification notification={notification} showNotification={showNotification}/> <br />
              username:<input data-testid='username' type="text" name="username" value={username} onChange={({ target }) => setUsername(target.value)} /> <br />
              password:<input data-testid='password' type="password" name="password" value={password} onChange={({ target }) => setPassword(target.value)} /><br/>
            <button type="submit">Log in</button>
          </form>

        </div>

  )
}

export default LoginForm