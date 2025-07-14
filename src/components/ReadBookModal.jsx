import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateBookStatus } from '../store/slices/myBookSlice';

const ReadBookModal = ({ book, isOpen, onClose }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [notes, setNotes] = useState('');
  const [currentStatus, setCurrentStatus] = useState('Currently Reading');
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen && book) {
      // Reset form when modal opens
      setReadingProgress(0);
      setNotes('');
      setCurrentStatus('Currently Reading');
    }
  }, [isOpen, book]);

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    dispatch(updateBookStatus({ bookId: book._id, status: newStatus }));
  };

  const handleProgressChange = (e) => {
    const progress = parseInt(e.target.value);
    setReadingProgress(progress);
  };

  const handleSaveProgress = () => {
    // Here you could save reading progress to backend if needed
    console.log('Reading progress saved:', { progress: readingProgress, notes });
    onClose();
  };

  if (!isOpen || !book) return null;

  return (
    <div className="modal-overlay fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-content bg-white rounded-2xl p-8 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Reading: {book.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-8">
          {/* Book Info */}
          <div className="flex items-start space-x-6">
            {book.coverImage && (
              <div className="book-cover flex-shrink-0">
                <img 
                  src={book.coverImage} 
                  alt={book.title}
                  className="w-32 h-48 object-cover rounded-lg shadow-lg"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x400/f3f4f6/9ca3af?text=No+Cover';
                  }}
                />
              </div>
            )}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{book.title}</h3>
              <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
              <div className="flex items-center space-x-2">
                <span className={`status-badge ${
                  book.availability 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {book.availability ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </div>
          </div>

          {/* Reading Status */}
          <div className="bg-gray-50 rounded-xl p-6">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Reading Status
            </label>
            <select
              value={currentStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 form-input text-lg"
            >
              <option value="Want to Read">Want to Read</option>
              <option value="Currently Reading">Currently Reading</option>
              <option value="Read">Read</option>
              <option value="Dropped">Dropped</option>
            </select>
          </div>

          {/* Reading Progress */}
          <div className="bg-gray-50 rounded-xl p-6">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Reading Progress: {readingProgress}%
            </label>
            <div className="space-y-3">
              <input
                type="range"
                min="0"
                max="100"
                value={readingProgress}
                onChange={handleProgressChange}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer progress-bar"
                style={{
                  background: `linear-gradient(to right, #667eea 0%, #764ba2 ${readingProgress}%, #e5e7eb ${readingProgress}%, #e5e7eb 100%)`
                }}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Reading Notes */}
          <div className="bg-gray-50 rounded-xl p-6">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Reading Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 form-input"
              placeholder="Add your thoughts, quotes, or notes about this book..."
            />
          </div>

          {/* Reading Tips */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Reading Tips
            </h4>
            <ul className="text-blue-800 space-y-2">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Set aside dedicated reading time each day
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Find a comfortable, well-lit reading spot
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Take breaks to reflect on what you've read
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Consider joining a book club for discussion
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-all duration-200"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSaveProgress}
              className="btn-primary text-white px-8 py-3 rounded-lg font-semibold transform hover:scale-105 shadow-lg"
            >
              Save Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadBookModal; 