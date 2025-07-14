import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBook from './pages/MyBook';
import { AuthProvider } from './context/AuthContext';
import { BookProvider } from './context/BookContext';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BookProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <main className="pt-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/mybooks" element={<MyBook />} />
                </Routes>
              </main>
            </div>
          </Router>
        </BookProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
