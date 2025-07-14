import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{ 
      backgroundColor: 'white', 
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
      position: 'sticky', 
      top: 0, 
      zIndex: 50,
      borderBottom: '1px solid #e5e7eb'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              textDecoration: 'none',
              color: '#4f46e5',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              <div style={{ 
                width: '2rem', 
                height: '2rem', 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: 'white', fontSize: '0.875rem' }}>📚</span>
              </div>
              <span>BookTracker</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <Link to="/" style={{ 
              color: isActive('/') ? '#4f46e5' : '#374151', 
              textDecoration: 'none',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              background: isActive('/') ? '#eef2ff' : 'transparent',
              transition: 'all 0.2s ease'
            }}>
              Home
            </Link>
            
            {isAuthenticated && (
              <Link to="/mybooks" style={{ 
                color: isActive('/mybooks') ? '#4f46e5' : '#374151', 
                textDecoration: 'none',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                background: isActive('/mybooks') ? '#eef2ff' : 'transparent',
                transition: 'all 0.2s ease'
              }}>
                My Books
              </Link>
            )}
            
            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: '600' }}>
                      {user?.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280', display: 'none', '@media (min-width: 1024px)': { display: 'block' } }}>
                    Welcome, {user?.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link to="/login" style={{ 
                  color: '#374151', 
                  textDecoration: 'none',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}>
                  Login
                </Link>
                <Link to="/register" style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.375rem',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  transition: 'all 0.2s ease'
                }}>
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div style={{ display: 'none', '@media (max-width: 768px)': { display: 'block' } }}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#374151',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                transition: 'all 0.2s ease'
              }}
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div style={{
          background: 'white',
          borderTop: '1px solid #e5e7eb',
          padding: '1rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link to="/" style={{ 
              color: isActive('/') ? '#4f46e5' : '#374151', 
              textDecoration: 'none',
              padding: '0.75rem',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              fontWeight: '500',
              background: isActive('/') ? '#eef2ff' : 'transparent'
            }}>
              Home
            </Link>
            
            {isAuthenticated && (
              <Link to="/mybooks" style={{ 
                color: isActive('/mybooks') ? '#4f46e5' : '#374151', 
                textDecoration: 'none',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                fontSize: '1rem',
                fontWeight: '500',
                background: isActive('/mybooks') ? '#eef2ff' : 'transparent'
              }}>
                My Books
              </Link>
            )}
            
            {isAuthenticated ? (
              <div style={{ padding: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div style={{
                    width: '2rem',
                    height: '2rem',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: '600' }}>
                      {user?.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {user?.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                    color: 'white',
                    padding: '0.75rem',
                    borderRadius: '0.375rem',
                    border: 'none',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link to="/login" style={{ 
                  color: '#374151', 
                  textDecoration: 'none',
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}>
                  Login
                </Link>
                <Link to="/register" style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  textDecoration: 'none',
                  fontSize: '1rem',
                  fontWeight: '500',
                  textAlign: 'center'
                }}>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
