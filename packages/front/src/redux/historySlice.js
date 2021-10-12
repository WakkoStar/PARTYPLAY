import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: {
    value: '',
  },
  reducers: {
    push: (state, action) => {
      state.value += action.payload;
    },
    replace: (state, action) => {
      state.value = action.payload;
    },
    goBack: state => {
      const history = state.value;
      const lastRoute = history.lastIndexOf('/');
      if (history !== '') {
        state.value = history.slice(0, lastRoute);
      }
    },
  },
});

export const { push, replace, goBack } = historySlice.actions;

export default historySlice.reducer;
