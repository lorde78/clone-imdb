import { configureStore } from '@reduxjs/toolkit'
import { RootReducer } from '../Reducers/RootReducer'
// @ts-ignore
export const store = configureStore(RootReducer)