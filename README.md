# Better Bets Calculator with Authentication

A betting arbitrage calculator with user authentication and calculation storage.

## Features

- **Google OAuth Authentication** via Clerk
- **User-specific calculation storage** in MongoDB
- **Arbitrage calculation** across multiple bookmakers
- **Calculation history** with load/delete functionality
- **Responsive design** with Tailwind CSS

## Setup Instructions

### 1. Clerk Setup

1. Go to [clerk.com](https://clerk.com) and create an account
2. Create a new application
3. In the Clerk dashboard, go to "Authentication" → "Social Connections"
4. Enable Google OAuth and configure it
5. Copy your publishable key and secret key

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_secret_here

# MongoDB
MONGO_URI=mongodb://localhost:27017/better-bets

# API
VITE_API_URL=http://localhost:3000/api
```

### 3. MongoDB Setup

Make sure MongoDB is running locally or update the `MONGO_URI` to point to your MongoDB instance.

### 4. Installation

```bash
npm install
```

### 5. Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 6. Deployment

The app is configured for Vercel deployment. Make sure to set the environment variables in your Vercel project settings.

## API Endpoints

- `POST /api/calculations/save` - Save a calculation
- `GET /api/calculations/list` - List user's calculations
- `GET /api/calculations/[id]` - Get specific calculation
- `DELETE /api/calculations/[id]` - Delete calculation

## Architecture

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Authentication**: Clerk (Google OAuth)
- **Backend**: Vercel Serverless Functions
- **Database**: MongoDB
- **Deployment**: Vercel

## Page Structure

- **`/` (index.html)** - Landing page with marketing content and sign-in
- **`/calculator.html`** - Protected calculator page (requires authentication)

## User Flow

1. **Landing Page**: Users see marketing content and can sign in
2. **Authentication**: Click "Sign In" → Google OAuth via Clerk
3. **Auto-redirect**: After login, automatically redirected to `/calculator.html`
4. **Calculator**: Full-featured calculator with save/load functionality
5. **History**: View and manage saved calculations