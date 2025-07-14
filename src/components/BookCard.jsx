import { useDispatch, useSelector } from 'react-redux';
import { addToMyBooks } from '../store/slices/myBookSlice';

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { myBooks } = useSelector((state) => state.myBooks);

  const isInMyBooks = myBooks.some(myBook => myBook.bookId._id === book._id);

  const handleAddToMyBooks = () => {
    if (isAuthenticated) {
      dispatch(addToMyBooks(book._id));
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '1rem',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1px solid #f3f4f6',
      position: 'relative'
    }}
    onMouseEnter={(e) => {
      e.target.style.transform = 'translateY(-8px)';
      e.target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    }}
    onMouseLeave={(e) => {
      e.target.style.transform = 'translateY(0)';
      e.target.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    }}>
      <div style={{ padding: '1.5rem' }}>
        {/* Header with title and availability */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '800',
            color: '#1f2937',
            lineHeight: '1.2',
            margin: 0,
            flex: 1,
            marginRight: '0.5rem'
          }}>
            {book.title}
          </h3>
          <span style={{
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            flexShrink: 0,
            background: book.availability ? '#d1fae5' : '#fee2e2',
            color: book.availability ? '#065f46' : '#991b1b'
          }}>
            {book.availability ? 'Available' : 'Unavailable'}
          </span>
        </div>
        
        {/* Author */}
        <p style={{
          color: '#6b7280',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          fontSize: '0.875rem'
        }}>
          <span style={{ marginRight: '0.5rem', fontSize: '1rem' }}>👤</span>
          <span style={{ fontWeight: '600', marginRight: '0.25rem' }}>Author:</span>
          <span style={{ marginLeft: '0.25rem' }}>{book.author}</span>
        </p>
        
        {/* Book Cover */}
        {book.coverImage && (
          <div style={{ marginBottom: '1rem' }}>
            <div style={{
              transition: 'all 0.3s ease',
              borderRadius: '0.5rem',
              overflow: 'hidden'
            }}>
              <img 
                src={book.coverImage} 
                alt={book.title}
                style={{
                  width: '100%',
                  height: '12rem',
                  objectFit: 'cover',
                  borderRadius: '0.5rem'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x400/f3f4f6/9ca3af?text=No+Cover';
                }}
              />
            </div>
          </div>
        )}
        
        {/* Action Buttons */}
        {isAuthenticated ? (
          <button
            onClick={handleAddToMyBooks}
            disabled={isInMyBooks}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              transform: 'translateY(0)',
              border: 'none',
              cursor: isInMyBooks ? 'not-allowed' : 'pointer',
              opacity: isInMyBooks ? 0.7 : 1,
              background: isInMyBooks 
                ? '#f3f4f6' 
                : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: isInMyBooks ? '#6b7280' : 'white',
              boxShadow: isInMyBooks ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}
            onMouseEnter={(e) => {
              if (!isInMyBooks) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isInMyBooks) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
              }
            }}
          >
            {isInMyBooks ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ marginRight: '0.5rem', fontSize: '1.125rem' }}>✅</span>
                Already Added
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ marginRight: '0.5rem', fontSize: '1.125rem' }}>📚</span>
                Add to My Books
              </span>
            )}
          </button>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '1rem',
            background: '#f8fafc',
            borderRadius: '0.5rem',
            border: '2px dashed #d1d5db'
          }}>
            <div style={{
              fontSize: '1.5rem',
              marginBottom: '0.5rem',
              color: '#9ca3af'
            }}>
              🔒
            </div>
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              fontWeight: '500',
              margin: 0
            }}>
              Login to add to your collection
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;
