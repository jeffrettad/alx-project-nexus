import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, getProfile } from "../services/authService";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }) => {
    const res = await login(data);
    return res; // contains access & refresh
  }
);

export const fetchProfile = createAsyncThunk(
  "auth/profile",
  async (token: string) => {
    return await getProfile(token);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    access: null,
    refresh: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.access = null;
      state.refresh = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.access = action.payload.access;
        state.refresh = action.payload.refresh;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
