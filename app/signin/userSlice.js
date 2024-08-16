import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id:'',
  name:'',
  email: '',
  level:0,
  aura:0,
  band:false,
  imageUrl:'',
  signIn:false,
  ImageUrl:'',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    signIn: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email
      state.level = action.payload.level
      state.aura = action.payload.aura
      state.band = action.payload.band
      state.signIn = action.payload.signIn
      if(action.payload.ImageUrl){
        state.ImageUrl = action.payload.ImageUrl
      }
    },
    updataName:(state, action)=>{
      state.name = action.payload.name
    },
    updataImage:(state, action)=>{
      state.ImageUrl=action.payload.ImageUrl
    }
  },
})

// Action creators are generated for each case reducer function
export const { signIn ,updataName,updataImage} = userSlice.actions

export default userSlice.reducer