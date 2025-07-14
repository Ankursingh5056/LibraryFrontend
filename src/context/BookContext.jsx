import { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../store/slices/bookSlice';
import { fetchMyBooks } from '../store/slices/myBookSlice';

const BookContext = createContext();

export const useBook = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBook must be used within a BookProvider');
  }
  return context;
};

export const BookProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { books, loading: booksLoading, error: booksError } = useSelector((state) => state.books);
  const { myBooks, loading: myBooksLoading, error: myBooksError } = useSelector((state) => state.myBooks);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchMyBooks());
    }
  }, [dispatch, isAuthenticated]);

  const value = {
    books,
    myBooks,
    booksLoading,
    myBooksLoading,
    booksError,
    myBooksError,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
