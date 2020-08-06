import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { combineReducers } from 'redux'
import inventory from './inventory'

const reducer = combineReducers({ inventory })

export type RootState = ReturnType<typeof reducer>

const store = configureStore({ reducer })
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
