import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBook, clearError } from '../store/slices/bookSlice';

const AddBookModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    coverImage: '',
    availability: true,
  });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.books);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());
    
    if (validateForm()) {
      const result = await dispatch(createBook(formData));
      if (createBook.fulfilled.match(result)) {
        setFormData({
          title: '',
          author: '',
          coverImage: '',
          availability: true,
        });
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(8px)'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        width: '100%',
        maxWidth: '28rem',
        margin: '0 1rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative background */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '200%',
          height: '200%',
          background: 'linear-gradient(45deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
          borderRadius: '50%',
          zIndex: 0
        }}></div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '2.5rem',
                height: '2.5rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}>
                <span style={{ fontSize: '1rem', color: 'white' }}>📚</span>
              </div>
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                color: '#1f2937'
              }}>
                Add New Book
              </h2>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6b7280',
                fontSize: '1.5rem',
                padding: '0.25rem',
                borderRadius: '0.375rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#374151';
                e.target.style.background = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#6b7280';
                e.target.style.background = 'transparent';
              }}
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                marginBottom: '1.5rem',
                fontSize: '0.875rem'
              }}>
                {error}
              </div>
            )}

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="title" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: `2px solid ${errors.title ? '#fca5a5' : '#d1d5db'}`,
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
                }}
                placeholder="Enter book title"
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.title ? '#fca5a5' : '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.title && (
                <p style={{
                  marginTop: '0.25rem',
                  fontSize: '0.75rem',
                  color: '#dc2626'
                }}>
                  {errors.title}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="author" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Author *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: `2px solid ${errors.author ? '#fca5a5' : '#d1d5db'}`,
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box'
                }}
                placeholder="Enter author name"
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.author ? '#fca5a5' : '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {errors.author && (
                <p style={{
                  marginTop: '0.25rem',
                  fontSize: '0.75rem',
                  color: '#dc2626'
                }}>
                  {errors.author}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="coverImage" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Cover Image URL
              </label>
              <input
                type="url"
                id="coverImage"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
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
                placeholder="https://example.com/image.jpg"
                onFocus={(e) => {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <p style={{
                marginTop: '0.25rem',
                fontSize: '0.75rem',
                color: '#6b7280'
              }}>
                Optional: Add a cover image URL
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '2rem',
              padding: '0.75rem',
              background: '#f8fafc',
              borderRadius: '0.5rem',
              border: '1px solid #e2e8f0'
            }}>
              <input
                type="checkbox"
                id="availability"
                name="availability"
                checked={formData.availability}
                onChange={handleChange}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                  accentColor: '#667eea',
                  marginRight: '0.75rem'
                }}
              />
              <label htmlFor="availability" style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                cursor: 'pointer'
              }}>
                Available for reading
              </label>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.75rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid #e5e7eb'
            }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '0.75rem 1.5rem',
                  color: '#6b7280',
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#e5e7eb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#f3f4f6';
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{
                      width: '1rem',
                      height: '1rem',
                      border: '2px solid transparent',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      marginRight: '0.5rem'
                    }}></div>
                    Adding...
                  </span>
                ) : (
                  'Add Book'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal; 