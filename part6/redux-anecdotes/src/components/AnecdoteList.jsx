import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"

import { setNotification } from "../reducers/notificationReducer"


const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes) 
    const filter = useSelector(state => state.filter)
    
    const filteredAnecdotes = anecdotes.filter((a) => a.content.toLowerCase().includes(filter))
    
    const sortedAnecdotes = filteredAnecdotes
    sortedAnecdotes.sort((a,b) => b.votes-a.votes)
    const vote = (a) => {
        const id = a.id
        const content = a.content
        const anecdote = anecdotes.find((a) => a.id === id)
        dispatch(addVote(anecdote))
        dispatch(setNotification(content,3))
      }

      
    return (
        <div>
           <h2>Anecdotes</h2>
            {sortedAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
               <div>
                  {anecdote.content}
               </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
      )}
       </div>
    )
}

export default AnecdoteList