'use client'
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'
import authReducer from './admin/authSlice';
import userReduser from './signin/userSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    user:userReduser,
  },
})