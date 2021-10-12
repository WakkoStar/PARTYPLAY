import { createSlice } from '@reduxjs/toolkit';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    value: [],
  },
  reducers: {
    setPlayers: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPlayers } = playerSlice.actions;

export default playerSlice.reducer;
