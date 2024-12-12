import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (userToken) => {
  token = `Bearer ${userToken}`
}

const getAll = async() => {
  const config = {
    headers: { Authorization : token }
  }
  const response = await axios.get(baseUrl,config)
  return response.data
}

const create = async(blog) => {

  const config = {
    headers: { Authorization : token }
  }
  const response = await axios.post(baseUrl,blog,config)
  return response.data
}

const update = async(id,blog) => {
  const url = `/api/blogs/${id}`
  const config = {
    headers: { Authorization : token }
  }
  const response = await axios.put(url,blog,config)
  return response.data
}

const remove = async(id) => {
  const url = `/api/blogs/${id}`
  const config = {
    headers: { Authorization : token }
  }
  const response = await axios.delete(url,config)
  return response.data
}


export default { getAll,setToken,create,update,remove }