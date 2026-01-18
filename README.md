# Hubly - Customer Support Platform

A full-stack customer support platform built with React, Node.js, and MongoDB. Features real-time chat, ticket management, team collaboration, and analytics dashboard.

## 🌟 Features

- **Real-time Chat System**: Live chat between customers and support agents
- **Ticket Management**: Create, assign, and track support tickets
- **Team Collaboration**: Multi-user support with role-based access
- **Analytics Dashboard**: Track performance metrics and chat statistics
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Error Handling**: Comprehensive error boundaries and loading states
- **Performance Optimized**: React.memo, debounced API calls, and loading skeletons

## 🚀 Live Demo

Visit the live application: [Hubly Demo](https://hubly-mxct-git-master-rutvija-malis-projects.vercel.app/)

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Toastify** - Notifications
- **Recharts** - Data visualization
- **Tailwind CSS** - Styling (via CSS modules)
- **React Icons** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **node-cron** - Scheduled tasks

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd hubly
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env.development` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env.local` file in the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```

## 🚀 Deployment

### Vercel (Frontend)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard:
   - `VITE_API_BASE_URL`: Your backend API URL
3. Deploy automatically on push to main branch

### Backend Deployment
The backend can be deployed to platforms like:
- **Railway**
- **Render**
- **Heroku**
- **DigitalOcean**

Make sure to:
1. Set production environment variables
2. Update CORS origins in `backend/index.js`
3. Use production MongoDB URI

## 📁 Project Structure

```
hubly/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middlewares/     # Custom middlewares
│   ├── logs/           # Application logs
│   └── index.js        # Server entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── context/    # React context providers
│   │   ├── services/   # API service functions
│   │   ├── styles/     # CSS modules
│   │   └── assets/     # Static assets
│   └── public/         # Public assets
└── README.md
```

## 🔐 API Endpoints

### Authentication
- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration
- `POST /api/users/logout` - User logout

### Tickets
- `GET /api/tickets/:userId` - Get user tickets
- `POST /api/tickets/add/` - Create new ticket
- `PUT /api/tickets/:id` - Update ticket

### Chats
- `GET /api/chats/` - Get chat messages
- `POST /api/chats/` - Send message
- `PUT /api/chats/assign/` - Assign chat to ticket

### Users
- `GET /api/users/all/` - Get current user
- `GET /api/users/admin/:adminId` - Get team members
- `POST /api/users/customer` - Create customer

## 🎯 Key Features Implementation

### Performance Optimizations
- **React.memo()** for preventing unnecessary re-renders
- **Debounced search** to optimize API calls
- **Loading skeletons** for better UX
- **Error boundaries** for graceful error handling

### Security Features
- JWT-based authentication
- Password hashing with bcryptjs
- CORS configuration
- Input validation

### Real-time Features
- Live chat system
- Automatic ticket assignment
- Cron job for missed chat detection

## 🧪 Testing

Run the linter:
```bash
cd frontend
npm run lint
```

## 🔑 Demo Credentials

**Admin Login:**
- Username: `Xyz@123`
- Password: `Pass@123`

---

⭐ Star this repository if you found it helpful!