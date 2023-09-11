import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, { payload: { user, access_token } } ) => {        
            state.user = user
            state.token = access_token
        },
        clear: (state ) => {        
            state.user = null
            state.token = null
        },
        token_recieved: (state, { payload: { access_token }} ) => {                    
            state.token = access_token
        },
        logout: (state  ) => {                    
            localStorage.removeItem(import.meta.env.VITE_REFRESH_TOKEN)
            state.token = null
            state.user = null
        },
    },
})

export const  authActions  = authSlice.actions
export default authSlice.reducer

export const currentUser = (state) => state.auth
