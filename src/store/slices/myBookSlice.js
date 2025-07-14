import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const fetchMyBooks = createAsyncThunk(
  'myBooks/fetchMyBooks',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/mybooks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch my books');
    }
  }
);

export const addToMyBooks = createAsyncThunk(
  'myBooks/addToMyBooks',
  async (bookId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/mybooks/${bookId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add book');
    }
  }
);

export const updateBookStatus = createAsyncThunk(
  'myBooks/updateStatus',
  async ({ bookId, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${API_URL}/mybooks/${bookId}/status`, 
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { bookId, status };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update status');
    }
  }
);

export const updateBookRating = createAsyncThunk(
  'myBooks/updateRating',
  async ({ bookId, rating }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${API_URL}/mybooks/${bookId}/rating`, 
        { rating },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return { bookId, rating };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update rating');
    }
  }
);

const initialState = {
  myBooks: [],
  loading: false,
  error: null,
};

const myBookSlice = createSlice({
  name: 'myBooks',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch My Books
      .addCase(fetchMyBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.myBooks = action.payload;
      })
      .addCase(fetchMyBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to My Books
      .addCase(addToMyBooks.fulfilled, (state, action) => {
        state.myBooks.push(action.payload);
      })
      // Update Status
      .addCase(updateBookStatus.fulfilled, (state, action) => {
        const { bookId, status } = action.payload;
        const book = state.myBooks.find(b => b.bookId._id === bookId);
        if (book) {
          book.status = status;
        }
      })
      // Update Rating
      .addCase(updateBookRating.fulfilled, (state, action) => {
        const { bookId, rating } = action.payload;
        const book = state.myBooks.find(b => b.bookId._id === bookId);
        if (book) {
          book.rating = rating;
        }
      });
  },
});

export const { clearError } = myBookSlice.actions;
export default myBookSlice.reducer; 