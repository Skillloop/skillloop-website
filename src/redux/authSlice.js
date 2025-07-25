
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    cart: [],
  },
  reducers: {
    setAuthUser(state, action) {
      state.user = action.payload;
    },
    setCart(state, action) {
      state.cart = action.payload;
    },
  },
});

export const { setAuthUser, setCart } = authSlice.actions;
export default authSlice.reducer;
