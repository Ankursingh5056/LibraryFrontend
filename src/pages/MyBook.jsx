import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchMyBooks } from '../store/slices/myBookSlice';
import MyBookCard from '../components/MyBookCard';

const MyBook = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('title');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { myBooks, loading, error } = useSelector((state) => state.myBooks);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(fetchMyBooks());
  }, [dispatch, isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

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
          <p style={{ fontSize: '1.125rem', opacity: 0.9 }}>Loading your collection...</p>
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
            Error loading your books
          </h2>
          <p style={{ opacity: 0.9, marginBottom: '1.5rem' }}>{error}</p>
          <button
            onClick={() => dispatch(fetchMyBooks())}
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

  // Filter books based on status and search query
  const filteredBooks = myBooks.filter(myBook => {
    const matchesStatus = filterStatus === 'all' || myBook.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      myBook.bookId.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      myBook.bookId.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.bookId.title.localeCompare(b.bookId.title);
      case 'author':
        return a.bookId.author.localeCompare(b.bookId.author);
      case 'status':
        return a.status.localeCompare(b.status);
      case 'rating':
        return b.rating - a.rating;
      case 'dateAdded':
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  const statusOptions = [
    { value: 'all', label: 'All Books', icon: '📚' },
    { value: 'Want to Read', label: 'Want to Read', icon: '📖' },
    { value: 'Currently Reading', label: 'Currently Reading', icon: '👁️' },
    { value: 'Read', label: 'Read', icon: '✅' },
    { value: 'Dropped', label: 'Dropped', icon: '❌' },
  ];

  const sortOptions = [
    { value: 'title', label: 'Title A-Z', icon: '📝' },
    { value: 'author', label: 'Author A-Z', icon: '✍️' },
    { value: 'status', label: 'Status', icon: '🏷️' },
    { value: 'rating', label: 'Rating (High to Low)', icon: '⭐' },
    { value: 'dateAdded', label: 'Date Added', icon: '📅' },
  ];

  // Calculate statistics
  const totalBooks = myBooks.length;
  const currentlyReading = myBooks.filter(b => b.status === 'Currently Reading').length;
  const completed = myBooks.filter(b => b.status === 'Read').length;
  const rated = myBooks.filter(b => b.rating > 0).length;
  const wantToRead = myBooks.filter(b => b.status === 'Want to Read').length;
  const dropped = myBooks.filter(b => b.status === 'Dropped').length;

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 1rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          opacity: '0.3'
        }}></div>
        <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative', zIndex: '1' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: '800',
            marginBottom: '1.5rem',
            lineHeight: '1.2'
          }}>
            📚 My Book Collection
          </h1>
          <p style={{
            fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
            opacity: 0.9,
            maxWidth: '48rem',
            margin: '0 auto'
          }}>
            Manage your reading list, track your progress, and rate the books you've read
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '3rem 1rem' }}>
        {/* Enhanced Statistics Dashboard */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.3)';
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📚</div>
            <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>{totalBooks}</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Total Books</div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            color: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.boxShadow = '0 15px 30px rgba(16, 185, 129, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 25px rgba(16, 185, 129, 0.3)';
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>��️</div>
            <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>{currentlyReading}</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Currently Reading</div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            color: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(245, 158, 11, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.boxShadow = '0 15px 30px rgba(245, 158, 11, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 25px rgba(245, 158, 11, 0.3)';
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</div>
            <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>{completed}</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Completed</div>
          </div>
          
          <div style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            color: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(139, 92, 246, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.boxShadow = '0 15px 30px rgba(139, 92, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 25px rgba(139, 92, 246, 0.3)';
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⭐</div>
            <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>{rated}</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Rated</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
            color: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(6, 182, 212, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.boxShadow = '0 15px 30px rgba(6, 182, 212, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 25px rgba(6, 182, 212, 0.3)';
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📖</div>
            <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>{wantToRead}</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Want to Read</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: 'white',
            borderRadius: '1rem',
            padding: '1.5rem',
            textAlign: 'center',
            boxShadow: '0 10px 25px rgba(239, 68, 68, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.boxShadow = '0 15px 30px rgba(239, 68, 68, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 25px rgba(239, 68, 68, 0.3)';
          }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>❌</div>
            <div style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>{dropped}</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Dropped</div>
          </div>
        </div>

        {/* Enhanced Search and Filters */}
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Search Bar */}
            <div>
              <label htmlFor="search-books" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                🔍 Search Books
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="search-books"
                  type="text"
                  placeholder="Search by title or author..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.5rem',
                    border: '2px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <span style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                  fontSize: '1rem'
                }}>🔍</span>
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label htmlFor="status-filter" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                🏷️ Filter by Status
              </label>
              <select
                id="status-filter"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '2px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
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
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label htmlFor="sort-by" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                📊 Sort by
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '2px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
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
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.icon} {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                👁️ View Mode
              </label>
              <div style={{
                display: 'flex',
                border: '2px solid #d1d5db',
                borderRadius: '0.5rem',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    flex: '1',
                    padding: '0.75rem 1rem',
                    background: viewMode === 'grid' ? '#667eea' : 'white',
                    color: viewMode === 'grid' ? 'white' : '#374151',
                    border: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  📱 Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    flex: '1',
                    padding: '0.75rem 1rem',
                    background: viewMode === 'list' ? '#667eea' : 'white',
                    color: viewMode === 'list' ? 'white' : '#374151',
                    border: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  📋 List
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: '0.875rem',
              color: '#64748b',
              margin: '0'
            }}>
              📊 Showing {sortedBooks.length} of {totalBooks} books
              {searchQuery && ` matching "${searchQuery}"`}
              {filterStatus !== 'all' && ` with status "${filterStatus}"`}
            </p>
          </div>
        </div>

        {/* Enhanced Books Display */}
        {sortedBooks.length === 0 ? (
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
              {searchQuery 
                ? `No books found matching "${searchQuery}"`
                : filterStatus === 'all' 
                  ? "Your collection is empty"
                  : `No books with status "${filterStatus}"`
              }
            </h2>
            <p style={{
              color: '#6b7280',
              marginBottom: '1.5rem',
              maxWidth: '28rem',
              margin: '0 auto 1.5rem'
            }}>
              {searchQuery 
                ? "Try adjusting your search terms or filters."
                : filterStatus === 'all' 
                  ? "Start building your reading collection by adding books from the home page."
                  : "Try changing the filter or add more books to your collection."
              }
            </p>
            {filterStatus === 'all' && !searchQuery && (
              <button
                onClick={() => navigate('/')}
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
                <span style={{ fontSize: '1.25rem' }}>📖</span>
                Browse Books
              </button>
            )}
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gap: viewMode === 'grid' ? '1.5rem' : '1rem',
            gridTemplateColumns: viewMode === 'grid' 
              ? 'repeat(auto-fill, minmax(280px, 1fr))'
              : '1fr'
          }}>
            {sortedBooks.map((myBook, index) => (
              <div
                key={myBook._id}
                style={{
                  animation: 'fadeIn 0.6s ease-out',
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                <MyBookCard myBook={myBook} viewMode={viewMode} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBook;
