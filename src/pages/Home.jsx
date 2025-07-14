import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../store/slices/bookSlice';
import BookCard from '../components/BookCard';
import AddBookModal from '../components/AddBookModal';

const Home = () => {
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state.books);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ textAlign: 'center', color: 'white' }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            border: '3px solid rgba(255, 255, 255, 0.3)',
            borderTop: '3px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ fontSize: '1.125rem', opacity: 0.9 }}>Loading amazing books...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '28rem', margin: '0 auto', color: 'white' }}>
          <div style={{
            width: '4rem',
            height: '4rem',
            background: 'rgba(239, 68, 68, 0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <span style={{ fontSize: '2rem' }}>⚠️</span>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            Oops! Something went wrong
          </h2>
          <p style={{ opacity: 0.9, marginBottom: '1.5rem' }}>{error}</p>
          <button
            onClick={() => dispatch(fetchBooks())}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 1rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            Discover Amazing Books
          </h1>
          <p style={{
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            opacity: 0.9,
            marginBottom: '2rem',
            maxWidth: '48rem',
            margin: '0 auto 2rem'
          }}>
            Explore our collection and build your personal reading journey
          </p>
          {isAuthenticated && (
            <button
              onClick={() => setIsAddBookModalOpen(true)}
              style={{
                background: 'white',
                color: '#667eea',
                padding: '1rem 2rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                margin: '0 auto',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>📚</span>
              Add New Book
            </button>
          )}
        </div>
      </div>

      {/* Books Section */}
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '3rem 1rem' }}>
        {/* Stats */}
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'white',
            borderRadius: '9999px',
            padding: '0.75rem 1.5rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <span style={{ fontSize: '1.25rem' }}>📖</span>
            <span style={{
              color: '#374151',
              fontWeight: '600',
              fontSize: '0.875rem'
            }}>
              {books.length} {books.length === 1 ? 'Book' : 'Books'} Available
            </span>
          </div>
        </div>

        {/* Books Grid */}
        {books.length === 0 ? (
          <div style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '1rem',
            padding: '3rem',
            textAlign: 'center'
          }}>
            <div style={{
              width: '6rem',
              height: '6rem',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <span style={{ fontSize: '3rem' }}>📚</span>
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '800',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              No books available yet
            </h2>
            <p style={{
              color: '#6b7280',
              marginBottom: '1.5rem',
              maxWidth: '28rem',
              margin: '0 auto 1.5rem'
            }}>
              Be the first to add a book to our library and start building an amazing collection!
            </p>
            {isAuthenticated && (
              <button
                onClick={() => setIsAddBookModalOpen(true)}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  margin: '0 auto'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>📚</span>
                Add Your First Book
              </button>
            )}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
          }}>
            {books.map((book, index) => (
              <div
                key={book._id}
                style={{
                  animation: 'fadeIn 0.6s ease-out',
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        )}
      </div>

      <AddBookModal 
        isOpen={isAddBookModalOpen} 
        onClose={() => setIsAddBookModalOpen(false)} 
      />
    </div>
  );
};

export default Home;
