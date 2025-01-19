import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async() => {
    const response = await axios.get(baseUrl)
    return response.data
}

const addAnecdote = async(content) => {
  const anecdote = {
    content: content,
    votes: 0
  }
  const response = await axios.post(baseUrl,anecdote)
  return response.data
}

const addVote = async(anecdote) => {
  const id = anecdote.id
  const url = `http://localhost:3001/anecdotes/${id}`

  const newAnecdote = {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes + 1
  }

  const response = await axios.put(url,newAnecdote)
  return response.data
}

export default { getAll, addAnecdote,addVote }