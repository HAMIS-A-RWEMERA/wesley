import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import publicRoutes from './routes/publicRoutes';
import adminRoutes from './routes/adminRoutes';
import { getDb } from './database/db';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Resolve directories reliably in local, container, and Vercel serverless environments
function findDirectory(dirName: string): string {
  const candidates = [
    path.join(process.cwd(), dirName),
    path.join(__dirname, '..', dirName),
    path.join(__dirname, dirName),
    path.join('/var/task', dirName)
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }
  return path.join(process.cwd(), dirName);
}

const viewsDir = findDirectory('views');
const publicDir = findDirectory('public');
const srcDir = findDirectory('src');
const IS_VERCEL = Boolean(process.env.VERCEL);
const uploadsDir = IS_VERCEL ? path.join('/tmp', 'uploads') : path.join(publicDir, 'uploads');

try {
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (e) {
  console.warn('Uploads directory warning:', e);
}

// Trust proxy for Vercel and Cloud Run HTTPS termination
app.set('trust proxy', 1);

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
      secure: 'auto', // Automatically true on HTTPS (Vercel) and false on HTTP localhost
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }) as unknown as express.RequestHandler
);

// View Engine Setup (EJS)
app.set('view engine', 'ejs');
app.set('views', viewsDir);

// Static Assets Serving
app.use(express.static(publicDir));
app.use('/public', express.static(publicDir));
app.use('/src', express.static(srcDir));
app.use('/uploads', express.static(uploadsDir));

// Routes
app.use('/', publicRoutes);
app.use('/admin', adminRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  try {
    res.status(404).render('error', {
      title: 'Page Not Found — Wesley Studio',
      message: 'The requested page or resource could not be found.',
      path: req.path
    });
  } catch {
    res.status(404).send('<h1>404 Not Found</h1><p>The requested page could not be found.</p>');
  }
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Server Error:', err);
  try {
    res.status(500).render('error', {
      title: 'Studio Server Error',
      message: err.message || 'An unexpected error occurred.',
      path: req.path
    });
  } catch {
    res.status(500).send(`<h1>Studio Server Error</h1><p>${err?.message || 'An unexpected error occurred.'}</p>`);
  }
});

export default app;
