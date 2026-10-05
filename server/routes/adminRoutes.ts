import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { queryAll, queryOne, execute } from '../database/db';
import { requireAdmin } from '../auth';
import { upload } from '../upload';

const router = Router();

// GET /admin/login - Login Form
router.get('/login', (req: Request, res: Response) => {
  if (req.session && req.session.user) {
    return res.redirect('/admin/dashboard');
  }
  res.render('admin/login', {
    title: 'Admin Login — Wesley Studio CMS',
    error: req.query.error ? 'Invalid email or password.' : null,
    path: '/admin/login'
  });
});

// POST /admin/login - Authenticate Admin
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.redirect('/admin/login?error=1');
    }

    const user = await queryOne('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.redirect('/admin/login?error=1');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.redirect('/admin/login?error=1');
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Admin login error:', error);
    res.redirect('/admin/login?error=1');
  }
});

// GET /admin/logout - Logout
router.get('/logout', (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.redirect('/admin/login');
  });
});

// Apply requireAdmin middleware to all remaining /admin routes
router.use(requireAdmin);

// GET /admin/dashboard - Overview & Stats
router.get('/dashboard', async (req: Request, res: Response) => {
  try {
    const totalPhotosRes = await queryOne('SELECT COUNT(*) as count FROM photos');
    const totalFilmsRes = await queryOne('SELECT COUNT(*) as count FROM films');
    const pendingBookingsRes = await queryOne("SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'");
    const upcomingBookingsRes = await queryOne("SELECT COUNT(*) as count FROM bookings WHERE status = 'confirmed'");
    const unreadMessagesRes = await queryOne('SELECT COUNT(*) as count FROM messages WHERE is_read = 0');

    const recentBookings = await queryAll(
      `SELECT b.*, s.name as service_name FROM bookings b 
       JOIN services s ON b.service_id = s.id 
       ORDER BY b.id DESC LIMIT 5`
    );

    const recentMessages = await queryAll('SELECT * FROM messages ORDER BY id DESC LIMIT 5');

    res.render('admin/dashboard', {
      title: 'Studio Dashboard — Wesley CMS',
      stats: {
        photos: totalPhotosRes ? totalPhotosRes.count : 0,
        films: totalFilmsRes ? totalFilmsRes.count : 0,
        pendingBookings: pendingBookingsRes ? pendingBookingsRes.count : 0,
        upcomingBookings: upcomingBookingsRes ? upcomingBookingsRes.count : 0,
        unreadMessages: unreadMessagesRes ? unreadMessagesRes.count : 0
      },
      recentBookings,
      recentMessages,
      user: req.session.user,
      path: '/admin/dashboard'
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).send('Dashboard Error');
  }
});

// GET /admin/photos - Photo Management
router.get('/photos', async (req: Request, res: Response) => {
  try {
    const photos = await queryAll('SELECT * FROM photos ORDER BY id DESC');
    res.render('admin/photos', {
      title: 'Photo Management — Wesley Studio',
      photos,
      user: req.session.user,
      path: '/admin/photos'
    });
  } catch (error) {
    console.error('Admin photos page error:', error);
    res.status(500).send('Error loading photos');
  }
});

// POST /admin/photos/upload - Upload Photo
router.post('/photos/upload', upload.single('photo_file') as any, async (req: Request, res: Response) => {
  try {
    const { title, description, category, location, photo_url } = req.body;
    let filename = photo_url || '';

    if (req.file) {
      filename = `/uploads/${req.file.filename}`;
    }

    if (!title || !category || !filename) {
      return res.status(400).send('Title, category, and photo file/URL are required.');
    }

    await execute(
      'INSERT INTO photos (title, description, filename, category, location) VALUES (?, ?, ?, ?, ?)',
      [title, description || '', filename, category, location || 'Kigali, Rwanda']
    );

    res.redirect('/admin/photos');
  } catch (error) {
    console.error('Upload photo error:', error);
    res.status(500).send('Failed to upload photo');
  }
});

// POST /admin/photos/edit/:id - Edit Photo Details
router.post('/photos/edit/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { title, description, category, location } = req.body;

    await execute(
      'UPDATE photos SET title = ?, description = ?, category = ?, location = ? WHERE id = ?',
      [title, description, category, location, id]
    );

    res.redirect('/admin/photos');
  } catch (error) {
    console.error('Edit photo error:', error);
    res.status(500).send('Failed to update photo');
  }
});

// POST /admin/photos/delete/:id - Delete Photo
router.post('/photos/delete/:id', async (req: Request, res: Response) => {
  try {
    await execute('DELETE FROM photos WHERE id = ?', [req.params.id]);
    res.redirect('/admin/photos');
  } catch (error) {
    console.error('Delete photo error:', error);
    res.status(500).send('Failed to delete photo');
  }
});

// GET /admin/films - Film Management
router.get('/films', async (req: Request, res: Response) => {
  try {
    const films = await queryAll('SELECT * FROM films ORDER BY year DESC, id DESC');
    res.render('admin/films', {
      title: 'Film Portfolio Management — Wesley Studio',
      films,
      user: req.session.user,
      path: '/admin/films'
    });
  } catch (error) {
    console.error('Admin films error:', error);
    res.status(500).send('Error loading films management');
  }
});

// POST /admin/films/add - Add New Film
router.post('/films/add', upload.fields([{ name: 'poster_file', maxCount: 1 }, { name: 'video_file', maxCount: 1 }]) as any, async (req: Request, res: Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const { title, description, poster_url, video_url, genre, duration, year, awards } = req.body;

    let poster = poster_url || '';
    if (files && files['poster_file'] && files['poster_file'][0]) {
      poster = `/uploads/${files['poster_file'][0].filename}`;
    }

    let video = video_url || '';
    if (files && files['video_file'] && files['video_file'][0]) {
      video = `/uploads/${files['video_file'][0].filename}`;
    }

    if (!title || !poster) {
      return res.status(400).send('Title and poster image are required.');
    }

    await execute(
      `INSERT INTO films (title, description, poster, video, genre, duration, year, awards)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description || '',
        poster,
        video || '',
        genre || 'Drama',
        duration || 'Short Film',
        Number(year) || new Date().getFullYear(),
        awards || ''
      ]
    );

    res.redirect('/admin/films');
  } catch (error) {
    console.error('Add film error:', error);
    res.status(500).send('Failed to add film');
  }
});

// POST /admin/films/edit/:id - Edit Film
router.post('/films/edit/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { title, description, poster, video, genre, duration, year, awards } = req.body;

    await execute(
      `UPDATE films SET title = ?, description = ?, poster = ?, video = ?, genre = ?, duration = ?, year = ?, awards = ?
       WHERE id = ?`,
      [title, description, poster, video, genre, duration, Number(year), awards, id]
    );

    res.redirect('/admin/films');
  } catch (error) {
    console.error('Edit film error:', error);
    res.status(500).send('Failed to update film');
  }
});

// POST /admin/films/delete/:id - Delete Film
router.post('/films/delete/:id', async (req: Request, res: Response) => {
  try {
    await execute('DELETE FROM films WHERE id = ?', [req.params.id]);
    res.redirect('/admin/films');
  } catch (error) {
    console.error('Delete film error:', error);
    res.status(500).send('Failed to delete film');
  }
});

// GET /admin/bookings - Booking Management
router.get('/bookings', async (req: Request, res: Response) => {
  try {
    const bookings = await queryAll(
      `SELECT b.*, s.name as service_name, s.price as service_price 
       FROM bookings b 
       JOIN services s ON b.service_id = s.id 
       ORDER BY b.id DESC`
    );

    res.render('admin/bookings', {
      title: 'Booking Requests & Calendar — Wesley Studio',
      bookings,
      user: req.session.user,
      path: '/admin/bookings'
    });
  } catch (error) {
    console.error('Admin bookings error:', error);
    res.status(500).send('Error loading bookings');
  }
});

// POST /admin/bookings/status/:id - Change Booking Status
router.post('/bookings/status/:id', async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const bookingId = req.params.id;

    await execute('UPDATE bookings SET status = ? WHERE id = ?', [status, bookingId]);

    // If booking confirmed, automatically block availability
    if (status === 'confirmed') {
      const booking = await queryOne('SELECT date, time FROM bookings WHERE id = ?', [bookingId]);
      if (booking) {
        await execute(
          'INSERT INTO availability (date, start_time, end_time, available) VALUES (?, ?, ?, 0)',
          [booking.date, booking.time, booking.time]
        );
      }
    }

    res.redirect('/admin/bookings');
  } catch (error) {
    console.error('Update booking status error:', error);
    res.status(500).send('Failed to update booking status');
  }
});

// GET /admin/availability - Availability Management
router.get('/availability', async (req: Request, res: Response) => {
  try {
    const blockedSlots = await queryAll('SELECT * FROM availability ORDER BY date ASC, start_time ASC');
    res.render('admin/availability', {
      title: 'Availability & Working Hours — Wesley Studio',
      blockedSlots,
      user: req.session.user,
      path: '/admin/availability'
    });
  } catch (error) {
    console.error('Admin availability error:', error);
    res.status(500).send('Error loading availability');
  }
});

// POST /admin/availability/block - Block date/time slot
router.post('/availability/block', async (req: Request, res: Response) => {
  try {
    const { date, start_time, end_time } = req.body;
    if (!date || !start_time) {
      return res.status(400).send('Date and start time required.');
    }

    await execute(
      'INSERT INTO availability (date, start_time, end_time, available) VALUES (?, ?, ?, 0)',
      [date, start_time, end_time || start_time]
    );

    res.redirect('/admin/availability');
  } catch (error) {
    console.error('Block slot error:', error);
    res.status(500).send('Failed to block availability slot');
  }
});

// POST /admin/availability/delete/:id - Delete availability rule
router.post('/availability/delete/:id', async (req: Request, res: Response) => {
  try {
    await execute('DELETE FROM availability WHERE id = ?', [req.params.id]);
    res.redirect('/admin/availability');
  } catch (error) {
    console.error('Delete slot error:', error);
    res.status(500).send('Failed to unblock slot');
  }
});

// GET /admin/messages - Messages Inbox
router.get('/messages', async (req: Request, res: Response) => {
  try {
    const messages = await queryAll('SELECT * FROM messages ORDER BY id DESC');
    res.render('admin/messages', {
      title: 'Client Inquiries & Messages — Wesley Studio',
      messages,
      user: req.session.user,
      path: '/admin/messages'
    });
  } catch (error) {
    console.error('Admin messages error:', error);
    res.status(500).send('Error loading messages');
  }
});

// POST /admin/messages/read/:id - Toggle read status
router.post('/messages/read/:id', async (req: Request, res: Response) => {
  try {
    const { is_read } = req.body;
    await execute('UPDATE messages SET is_read = ? WHERE id = ?', [is_read ? 1 : 0, req.params.id]);
    res.redirect('/admin/messages');
  } catch (error) {
    console.error('Read status error:', error);
    res.status(500).send('Failed to update read status');
  }
});

// POST /admin/messages/delete/:id - Delete message
router.post('/messages/delete/:id', async (req: Request, res: Response) => {
  try {
    await execute('DELETE FROM messages WHERE id = ?', [req.params.id]);
    res.redirect('/admin/messages');
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).send('Failed to delete message');
  }
});

export default router;
