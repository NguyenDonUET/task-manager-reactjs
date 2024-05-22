import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

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
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserType>) => {
      console.log(action.payload)
      state.user = action.payload
    },
  },
})

export const { setUserInfo } = userSlice.actions

export default userSlice.reducer
