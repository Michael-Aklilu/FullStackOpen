import { createSlice } from "@reduxjs/toolkit"
const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers : {
    filterAction(state,action){
      const filter = action.payload
      return filter.toLowerCase()
    }
  }
})


export default filterSlice.reducer
export const {filterAction} = filterSlice.actions