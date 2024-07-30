import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type UserType = {
  username: string
  userId: string
  email: string
}

export interface UserState {
  user: UserType | null
}

const initialState: UserState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
    },
    userLogout: (state) => {
      state.user = null
    },
  },
})

export const { setUserInfo, userLogout } = userSlice.actions

export default userSlice.reducer
