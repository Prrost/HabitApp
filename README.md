# HabitApp

## Description
HabitApp is a simple habit-tracking application built with Node.js, Express, and MongoDB. It allows users to register, log in, create, track, and manage their habits.

## Features
- User authentication (register, login)
- Create and manage habits
- Track habit progress
- Secure API with JWT authentication

## Installation

### Prerequisites
- Node.js (latest stable version recommended)
- MongoDB Atlas or local MongoDB instance

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/HabitApp.git
   cd HabitApp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```env
   PORT=8080
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in and receive a JWT token

### User Profile
- `GET /api/users/profile` - Get user profile (requires authentication)

### Habits
- `POST /api/habits` - Create a new habit
- `GET /api/habits` - Get all habits of the logged-in user
- `PUT /api/habits/:id` - Update a habit
- `DELETE /api/habits/:id` - Delete a habit
- `PUT /api/habits/:id/progress` - Increase habit progress

## Project Structure
```
HabitApp/
│-- config/
│   ├── db.js
│-- middleware/
│   ├── authMiddleware.js
│-- models/
│   ├── habit.js
│   ├── user.js
│-- routes/
│   ├── authRoutes.js
│   ├── habitRoutes.js
│   ├── userRoutes.js
│   ├── frontRoutes.js
│-- public/
│-- .env
│-- server.js
│-- package.json
```

## License
This project is licensed under the MIT License.

