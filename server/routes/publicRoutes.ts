import { Router, Request, Response } from 'express';
import { films, landscapePhotos, portraitPhotos, allPhotos, services } from '../data/portfolio';

const router = Router();

// GET / - Home Page
router.get('/', (req: Request, res: Response) => {
  res.render('index', {
    title: 'WESLEY — African Cinema & Photography Studio',
    featuredFilms: films.slice(0, 3),
    featuredPhotos: allPhotos.slice(0, 6),
    services: services.slice(0, 4),
    path: '/'
  });
});

// GET /about - About Wesley
router.get('/about', (req: Request, res: Response) => {
  res.render('about', {
    title: 'About Wesley — Filmmaker & Storyteller | Kigali, Rwanda',
    path: '/about'
  });
});

// GET /landscape - Landscape Photography Showcase
router.get('/landscape', (req: Request, res: Response) => {
  res.render('landscape', {
    title: 'Landscape Photography — Wesley Studio',
    photos: landscapePhotos,
    path: '/landscape'
  });
});

// GET /portrait - Portrait Photography Showcase
router.get('/portrait', (req: Request, res: Response) => {
  res.render('portrait', {
    title: 'Portrait Photography — Wesley Studio',
    photos: portraitPhotos,
    path: '/portrait'
  });
});

// GET /films - Films Portfolio & Cinema Showcase
router.get('/films', (req: Request, res: Response) => {
  res.render('films', {
    title: 'Films & Cinema Showcase — Wesley Studio',
    films,
    path: '/films'
  });
});

// GET /booking - Booking Consultation & Appointments
router.get('/booking', (req: Request, res: Response) => {
  res.render('booking', {
    title: 'Book a Session — Wesley Studio',
    services,
    existingBookings: [],
    blockedAvailability: [],
    path: '/booking',
    queryService: req.query.service || null,
    success: req.query.success === 'true'
  });
});

// POST /booking - Fallback route if submitted to server instead of FormSubmit
router.post('/booking', (req: Request, res: Response) => {
  if (req.xhr || req.headers.accept?.includes('json')) {
    return res.json({ success: true, message: 'Booking request received!' });
  }
  res.redirect('/booking?success=true');
});

// GET /contact - Contact & Inquiries
router.get('/contact', (req: Request, res: Response) => {
  res.render('contact', {
    title: 'Contact & Inquiry — Wesley Studio',
    path: '/contact',
    sent: req.query.sent === 'true'
  });
});

// POST /contact - Fallback route if submitted to server instead of FormSubmit
router.post('/contact', (req: Request, res: Response) => {
  if (req.xhr || req.headers.accept?.includes('json')) {
    return res.json({ success: true, message: 'Your message has been sent!' });
  }
  res.redirect('/contact?sent=true');
});

export default router;
