import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api' }),
    endpoints: (builder) => ({        
        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
            transformResponse: (response) => {      
                localStorage.setItem(import.meta.env.VITE_REFRESH_TOKEN, response.refresh_token)                        
                return response
            },
            transformErrorResponse: (response) => {   
                return {...response.data, status: response?.status }
            }
        }),
        register: builder.mutation({
            query: (form_data) => ({
                url: 'auth/register',
                method: 'POST',
                body: form_data,
            }),
            transformResponse: (response) => {      
                localStorage.setItem(import.meta.env.VITE_REFRESH_TOKEN, response.refresh_token)                        
                return response
            },
            transformErrorResponse: (response) => {   
                return {...response.data, status: response?.status }
            }
        })
    }),
});