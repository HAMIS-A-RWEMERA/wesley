import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';
import publicRoutes from './server/routes/publicRoutes';
import adminRoutes from './server/routes/adminRoutes';
import { getDb } from './server/database/db';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Ensure SQLite database is ready before processing requests
app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getDb();
    next();
  } catch (err) {
    next(err);
  }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'wesley-studio-kigali-film-secret-2026',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set to true in HTTPS production if proxy is enabled
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }) as unknown as express.RequestHandler
);

// View Engine Setup (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Static Assets Serving
app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/public', express.static(path.join(process.cwd(), 'public')));
app.use('/src', express.static(path.join(process.cwd(), 'src')));
app.use('/uploads', express.static(path.join(process.cwd(), 'public', 'uploads')));

// Routes
app.use('/', publicRoutes);
app.use('/admin', adminRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).render('error', {
    title: 'Page Not Found — Wesley Studio',
    message: 'The requested page or resource could not be found.',
    path: req.path
  });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Server Error:', err);
  res.status(500).render('error', {
    title: 'Studio Server Error',
    message: err.message || 'An unexpected error occurred.',
    path: req.path
  });
});

async function startServer() {
  await getDb();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🎬 Wesley Studio Platform running at http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
