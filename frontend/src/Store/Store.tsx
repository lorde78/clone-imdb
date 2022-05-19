import { createStore } from '@reduxjs/toolkit'
import { RootReducer } from '../Reducers/RootReducer'
// @ts-ignore
export const Store = createStore(RootReducer)