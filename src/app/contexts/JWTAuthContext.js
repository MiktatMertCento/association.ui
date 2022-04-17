import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'
import jwt from 'jsonwebtoken'

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
    restoreUser: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (username, password) => {
        const response = await axios.post('/api/auth/login', {
            username,
            password,
        })

        const { accessToken, user } = response.data
        setSession(accessToken)

        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        })
    }

    const register = async (email, username, password) => {
        const response = await axios.post('/api/auth/register', {
            email,
            username,
            password,
        })

        const { accessToken, user } = response.data
        setSession(accessToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    const restoreUser = async () => {
        const accessToken = window.localStorage.getItem('accessToken')

        try {
            jwt.verify(accessToken, process.env.REACT_APP_JWT_SECRET)
            setSession(accessToken)
            const response = await axios.get('/api/auth/profile')
            const { user } = response.data

            dispatch({
                type: 'INIT',
                payload: {
                    isAuthenticated: true,
                    user,
                },
            })
        } catch (err) {
            dispatch({
                type: 'INIT',
                payload: {
                    isAuthenticated: false,
                    user: null,
                },
            })
        }
    }


    useEffect(() => {
        restoreUser()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
                restoreUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
