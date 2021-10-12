import { createSlice } from '@reduxjs/toolkit';

export const meSlice = createSlice({
  name: 'me',
  initialState: {
    value: {},
  },
  reducers: {
    setMe: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setMe } = meSlice.actions;

export default meSlice.reducer;
