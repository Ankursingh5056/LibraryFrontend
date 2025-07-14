# BookTracker Frontend

A modern React application for managing your personal book collection. Built with React, Redux Toolkit, React Router, and Tailwind CSS.

## Features

- **User Authentication**: Register and login with email/password
- **Book Discovery**: Browse all available books in the library
- **Personal Collection**: Add books to your personal reading list
- **Reading Status**: Track books as "Want to Read", "Currently Reading", "Read", or "Dropped"
- **Rating System**: Rate books with a 5-star rating system
- **Filtering & Sorting**: Filter books by status and sort by title, author, status, or rating
- **Statistics Dashboard**: View reading statistics and progress
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **React 19** - Modern React with hooks
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:3000`

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── BookCard.jsx    # Book display component
│   ├── MyBookCard.jsx  # Personal book management component
│   ├── Navbar.jsx      # Navigation component
│   └── RatingStars.jsx # Star rating component
├── context/            # React Context providers
│   ├── AuthContext.jsx # Authentication context
│   └── BookContext.jsx # Book data context
├── pages/              # Page components
│   ├── Home.jsx        # Home page with all books
│   ├── Login.jsx       # Login page
│   ├── Register.jsx    # Registration page
│   └── MyBook.jsx      # Personal book collection page
├── store/              # Redux store configuration
│   ├── index.js        # Store setup
│   └── slices/         # Redux slices
│       ├── authSlice.js    # Authentication state
│       ├── bookSlice.js    # Book data state
│       └── myBookSlice.js  # Personal books state
├── App.jsx             # Main app component
├── main.jsx            # Application entry point
└── index.css           # Global styles
```

## API Integration

The frontend communicates with the backend API endpoints:

- **Authentication**: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- **Books**: `/api/books` (GET all books)
- **My Books**: `/api/mybooks` (GET, POST, PATCH for personal collection)

## Key Features

### Authentication
- Secure login/register with email validation
- JWT token-based authentication
- Automatic token management with localStorage
- Protected routes for authenticated users

### Book Management
- Browse all available books
- Add books to personal collection
- Update reading status (Want to Read, Currently Reading, Read, Dropped)
- Rate books with interactive star rating
- Filter and sort personal collection

### User Experience
- Responsive design for all screen sizes
- Loading states and error handling
- Form validation with real-time feedback
- Smooth transitions and hover effects
- Clean, modern UI with Tailwind CSS

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env` file in the client directory if you need to customize the API URL:

```
VITE_API_URL=http://localhost:3000/api
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
