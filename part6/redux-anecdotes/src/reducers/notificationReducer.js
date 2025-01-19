import { createSlice} from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification(state,action){
            const content = action.payload
            return content
        },

        // eslint-disable-next-line no-unused-vars
        hideNotification(state,action){
            return ''
        },    
    }
})

export default notificationSlice.reducer
export const {showNotification, hideNotification} = notificationSlice.actions

export const setNotification = (content,time) => {
    return (dispatch) => {
        dispatch(showNotification(content))
        const milliSeconds = time * 1000
        setTimeout(() => {
          dispatch(hideNotification())
        },milliSeconds)
    }
}