import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBookStatus, updateBookRating } from '../store/slices/myBookSlice';
import RatingStars from './RatingStars';
import ReadBookModal from './ReadBookModal';

const MyBookCard = ({ myBook, viewMode = 'grid' }) => {
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { bookId, status, rating } = myBook;

  const handleStatusChange = (newStatus) => {
    dispatch(updateBookStatus({ bookId: bookId._id, status: newStatus }));
  };

  const handleRatingChange = (newRating) => {
    dispatch(updateBookRating({ bookId: bookId._id, rating: newRating }));
  };

  const statusOptions = [
    'Want to Read',
    'Currently Reading',
    'Read',
    'Dropped'
  ];

  const getStatusBadgeStyle = (status) => {
    const baseStyle = {
      padding: '0.25rem 0.75rem',
      borderRadius: '1rem',
      fontSize: '0.75rem',
      fontWeight: '600',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25rem'
    };

    switch (status) {
      case 'Want to Read':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
          color: 'white'
        };
      case 'Currently Reading':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white'
        };
      case 'Read':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white'
        };
      case 'Dropped':
        return {
          ...baseStyle,
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: 'white'
        };
      default:
        return {
          ...baseStyle,
          background: '#f3f4f6',
          color: '#374151'
        };
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Want to Read':
        return '📖';
      case 'Currently Reading':
        return '👁️';
      case 'Read':
        return '✅';
      case 'Dropped':
        return '❌';
      default:
        return '📚';
    }
  };

  if (viewMode === 'list') {
    return (
      <>
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '1.5rem',
          transition: 'all 0.3s ease',
          border: '1px solid #f3f4f6'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto',
            gap: '1.5rem',
            alignItems: 'center'
          }}>
            {/* Book Cover */}
            <div style={{
              width: '80px',
              height: '120px',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              flexShrink: '0'
            }}>
              <img 
                src={bookId.coverImage || 'https://via.placeholder.com/80x120/f3f4f6/9ca3af?text=📚'} 
                alt={bookId.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/80x120/f3f4f6/9ca3af?text=📚';
                }}
              />
            </div>

            {/* Book Info */}
            <div style={{ minWidth: '0' }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                marginBottom: '0.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  margin: '0',
                  flex: '1',
                  minWidth: '0'
                }}>
                  {bookId.title}
                </h3>
                <div style={getStatusBadgeStyle(status)}>
                  {getStatusIcon(status)} {status}
                </div>
              </div>
              
              <p style={{
                color: '#6b7280',
                fontSize: '0.875rem',
                margin: '0 0 0.75rem 0',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span style={{ fontSize: '1rem' }}>✍️</span>
                <span style={{ fontWeight: '500' }}>Author:</span>
                <span>{bookId.author}</span>
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>Rating:</span>
                  <RatingStars 
                    rating={rating} 
                    onRatingChange={handleRatingChange}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              alignItems: 'flex-end'
            }}>
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                style={{
                  padding: '0.5rem 0.75rem',
                  border: '2px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.75rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  background: 'white',
                  minWidth: '140px'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setIsReadModalOpen(true)}
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-1px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <span style={{ fontSize: '0.875rem' }}>📖</span>
                Read
              </button>
            </div>
          </div>
        </div>

        <ReadBookModal 
          book={bookId}
          isOpen={isReadModalOpen}
          onClose={() => setIsReadModalOpen(false)}
        />
      </>
    );
  }

  // Grid view (original design with enhancements)
  return (
    <>
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        border: '1px solid #f3f4f6',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-5px)';
        e.target.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
      }}>
        <div style={{ padding: '1.5rem' }}>
          {/* Header with title and status */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            gap: '0.75rem'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '700',
              color: '#1f2937',
              margin: '0',
              flex: '1',
              lineHeight: '1.3',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {bookId.title}
            </h3>
            <div style={getStatusBadgeStyle(status)}>
              {getStatusIcon(status)} {status}
            </div>
          </div>
          
          {/* Author */}
          <p style={{
            color: '#6b7280',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem'
          }}>
            <span style={{ fontSize: '1rem' }}>✍️</span>
            <span style={{ fontWeight: '500' }}>Author:</span>
            <span>{bookId.author}</span>
          </p>
          
          {/* Book Cover */}
          {bookId.coverImage && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{
                borderRadius: '0.5rem',
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <img 
                  src={bookId.coverImage} 
                  alt={bookId.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200/f3f4f6/9ca3af?text=📚';
                  }}
                />
              </div>
            </div>
          )}
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: '1' }}>
            {/* Status Selection */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                📊 Reading Status
              </label>
              <select
                value={status}
                onChange={(e) => handleStatusChange(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  background: 'white'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Rating */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                ⭐ Rating
              </label>
              <RatingStars 
                rating={rating} 
                onRatingChange={handleRatingChange}
              />
            </div>

            {/* Read Book Button */}
            <button
              onClick={() => setIsReadModalOpen(true)}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: 'auto'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              <span style={{ fontSize: '1rem' }}>📖</span>
              Read Book
            </button>
          </div>
        </div>
      </div>

      <ReadBookModal 
        book={bookId}
        isOpen={isReadModalOpen}
        onClose={() => setIsReadModalOpen(false)}
      />
    </>
  );
};

export default MyBookCard;
