import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null,
  name: string | null,
  userId: string | null,
}

const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') || null : null,
  name: typeof window !== 'undefined' ? localStorage.getItem('name') || null : null,
  userId : typeof window !== 'undefined' ? localStorage.getItem('userId') || null : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{token: string, name: string, userId : string }>) => {
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.userId = action.payload.userId;
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', state.token);
        localStorage.setItem('name', state.name);
        localStorage.setItem("userId", state.userId);
      }
    },
    clearToken: (state) => {
      state.token = null;
      state.name = null;
      state.userId = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem("userId");
      }
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
