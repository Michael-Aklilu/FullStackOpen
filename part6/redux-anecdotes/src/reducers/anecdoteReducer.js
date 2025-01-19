import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAction(state,action){
       const id = action.payload.id
       return state.map((a) =>{
          return a.id === id ? {...a, votes: a.votes + 1} : {...a}
       })
    },
    createAnecdoteAction(state,action){
      state.push(action.payload)    
    },
    fetchAnecdotes(state,action){
      return action.payload
    }
  }
})


export const { voteAction, createAnecdoteAction, fetchAnecdotes } = anecdoteSlice.actions 

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(fetchAnecdotes(anecdotes))
  } 
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.addAnecdote(content)
    dispatch(createAnecdoteAction(anecdote))
  }
}

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.addVote(anecdote)
    dispatch(voteAction(anecdotes))

  }
}

export default anecdoteSlice.reducer