import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'

export const userApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        // Define your API endpoints here
        getUsers: builder.query({
            query: () => 'users',
        }),        
    }),
});



