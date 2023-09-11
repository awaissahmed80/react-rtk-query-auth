import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import { authActions } from '../slices'

import { Mutex } from 'async-mutex'

// create a new mutex
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URI,
    prepareHeaders: (headers, { getState, endpoint }) => {        
        const user = (getState()).auth
        if (user && endpoint !== 'refresh') {
            headers.set('Authorization', `Bearer ${user.token}`)
        }
        return headers
    }    
})
export const baseQueryWithReauth = async (args, api, extraOptions) => {
    // wait until the mutex is available without locking it    
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)
    
    if (result.error && result.error.status === 401) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                // const refreshResult = await baseQuery({
                //     '/auth/refresh_token', api, extraOptions)
                const refreshResult = await baseQuery(
                    { url: '/auth/refresh_token/', method: 'POST', body: { refresh_token: localStorage.getItem('auth-flow_token') ?? '' } },
                    { ...api, endpoint: 'refresh' },
                    extraOptions
                )
                if (refreshResult.data) {
                    api.dispatch(authActions.token_recieved(refreshResult.data))
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions)
                } 
                else {
                    api.dispatch(authActions.logout())
                }
            } finally {
                // release must be called once the mutex should be released again.
                release()
            }
        }
        else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }   
    }
    return result
}