# URL Shortener

A full-stack URL shortener application built with React and Node.js.

## Features

- Shorten long URLs
- Copy short URLs to clipboard
- Test redirect functionality
- Click analytics
- Rate limiting
- Input validation
- Responsive design

## Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS
- Axios

**Backend:**
- Node.js + Express
- MongoDB
- Rate limiting

## Quick Start

### Development
```bash
# Install all dependencies
npm run install-all

# Start both frontend and backend
npm run dev
```

### Production

1. **Environment Setup:**
   - Copy `.env.example` to `.env` in BACKEND folder
   - Update MongoDB URI and other production values

2. **Build:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   npm start
   ```

## Environment Variables

**Backend (.env):**
```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
APP_URL=https://yourdomain.com/
CORS_ORIGIN=https://yourfrontend.com
```

**Frontend (.env):**
```
VITE_API_URL=https://yourbackend.com
VITE_APP_NAME=URL Shortener
```

## API Endpoints

- `POST /api/create` - Create short URL
- `GET /:id` - Redirect to original URL

## Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist` folder

### Backend (Railway/Heroku)
1. Set environment variables
2. Deploy BACKEND folder

## License

MIT
