# Event Registration System

A full-stack web application for managing events and registrations. Built with React (frontend) and Node.js/Express/MongoDB (backend).

## Features

- User registration and authentication (JWT-based)
- Role-based access (admin/user)
- Admins can create, update, and delete events
- Users can view events and register for them
- Users can view and cancel their registrations
- Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend:** React, Vite, Axios, React Router, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
- **Other:** ESLint, dotenv, CORS

## Folder Structure

```
event-registration-backend/
  controllers/
  middleware/
  model/
  routes/
  config/
  .env
  package.json
  server.js

eventRegistrationFrontend/
  src/
    components/
    pages/
    services/
    App.jsx
    main.jsx
    index.css
  package.json
  vite.config.js
  README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or cloud instance)

### Backend Setup

1. **Install dependencies:**
   ```sh
   cd event-registration-backend
   npm install
   ```

2. **Configure environment variables:**
   Edit `.env`:
   ```
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/event-registration
   JWT_SECRET=your_jwt_secret
   ```

3. **Start the backend server:**
   ```sh
   npm run dev
   ```
   The backend will run on `http://localhost:4000`.

### Frontend Setup

1. **Install dependencies:**
   ```sh
   cd eventRegistrationFrontend
   npm install
   ```

2. **Start the frontend dev server:**
   ```sh
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (default Vite port).

## Usage

- Register a new user or login.
- Admin users can add/manage events.
- Regular users can view events and register.
- Users can view and cancel their registrations.

## Environment Variables

- **Backend:** See `.env` in `event-registration-backend`
- **Frontend:** API base URL is set in [`src/services/api.js`](src/services/api.js)

## Scripts

### Backend

- `npm run dev` — Start backend with auto-reload

### Frontend

- `npm run dev` — Start frontend dev server
- `npm run build` — Build frontend for production
- `npm run preview` — Preview production build


**Author:** Selamawit Shimeles
**Contact:** selamshimeles9@gmail.com
