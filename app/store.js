'use client'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './admin/authSlice';
import userReduser from './signin/userSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user:userReduser,
  },
})