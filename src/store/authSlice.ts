import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface AuthSlice {
  isAuthorized: boolean;
}

const initialState: AuthSlice = {
  isAuthorized: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorized(state, action: PayloadAction<boolean>) {
      state.isAuthorized = action.payload
    },
    logout(state) {
      state.isAuthorized = false
    }
  }
})

export const {setAuthorized, logout} = authSlice.actions;
export default authSlice.reducer;