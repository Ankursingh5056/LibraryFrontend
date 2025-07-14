import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bookReducer from './slices/bookSlice';
import myBookReducer from './slices/myBookSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: bookReducer,
    myBooks: myBookReducer,
  },
}); 