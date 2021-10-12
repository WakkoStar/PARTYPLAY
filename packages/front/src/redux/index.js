import { configureStore } from '@reduxjs/toolkit';

import historyReducer from './historySlice';
import meReducer from './meSlice';
import playersReducer from './playersSlice';

export default configureStore({
  reducer: {
    players: playersReducer,
    history: historyReducer,
    me: meReducer,
  },
});
