import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const IS_VERCEL = Boolean(process.env.VERCEL);

function findFile(...relativePaths: string[]): string | null {
  const bases = [
    process.cwd(),
    __dirname,
    path.join(__dirname, '..'),
    '/var/task'
  ];
  for (const rel of relativePaths) {
    for (const base of bases) {
      const candidate = path.join(base, rel);
      if (fs.existsSync(candidate)) return candidate;
    }
  }
  return null;
}

const BUNDLED_DB_FILE = findFile('database/wesley.db') || path.join(process.cwd(), 'database', 'wesley.db');
const DB_FILE = IS_VERCEL ? path.join('/tmp', 'wesley.db') : BUNDLED_DB_FILE;

let dbInstance: SqlJsDatabase | null = null;

export async function getDb(): Promise<SqlJsDatabase> {
  if (dbInstance) {
    return dbInstance;
  }

  const wasmPath = findFile('database/sql-wasm.wasm', 'node_modules/sql.js/dist/sql-wasm.wasm');
  let wasmBinary: Buffer | undefined;
  if (wasmPath) {
    try {
      wasmBinary = fs.readFileSync(wasmPath);
    } catch (e) {
      console.warn('Could not read wasm binary:', e);
    }
  }

  const SQL = await initSqlJs(wasmBinary ? { wasmBinary } : {});

  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (err) {
      console.warn('Could not create DB directory:', err);
    }
  }

  if (IS_VERCEL && !fs.existsSync(DB_FILE) && fs.existsSync(BUNDLED_DB_FILE)) {
    try {
      fs.copyFileSync(BUNDLED_DB_FILE, DB_FILE);
    } catch (err) {
      console.warn('Could not copy bundled DB to /tmp:', err);
    }
  }

  if (fs.existsSync(DB_FILE)) {
    const filebuffer = fs.readFileSync(DB_FILE);
    dbInstance = new SQL.Database(filebuffer);
  } else if (fs.existsSync(BUNDLED_DB_FILE)) {
    const filebuffer = fs.readFileSync(BUNDLED_DB_FILE);
    dbInstance = new SQL.Database(filebuffer);
  } else {
    dbInstance = new SQL.Database();
  }

  await initSchemaAndSeed(dbInstance);
  saveDb(dbInstance);

  return dbInstance;
}

export function saveDb(dbToSave?: SqlJsDatabase) {
  const target = dbToSave || dbInstance;
  if (!target) return;
  try {
    const data = target.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_FILE, buffer);
  } catch (err) {
    console.warn('saveDb failed (likely read-only serverless environment):', err);
  }
}

export async function queryAll<T = any>(sql: string, params: any[] = []): Promise<T[]> {
  try {
    const db = await getDb();
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const results: T[] = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject() as T);
    }
    stmt.free();
    return results;
  } catch (err) {
    console.error('queryAll error:', err);
    return [];
  }
}

export async function queryOne<T = any>(sql: string, params: any[] = []): Promise<T | null> {
  const results = await queryAll<T>(sql, params);
  return results.length > 0 ? results[0] : null;
}

export async function execute(sql: string, params: any[] = []): Promise<{ lastInsertId: number; changes: number }> {
  try {
    const db = await getDb();
    db.run(sql, params);
    
    // Get last insert rowid
    const res = db.exec("SELECT last_insert_rowid() as id, changes() as count");
    let lastInsertId = 0;
    let changes = 0;
    if (res.length > 0 && res[0].values.length > 0) {
      lastInsertId = Number(res[0].values[0][0]);
      changes = Number(res[0].values[0][1]);
    }
    saveDb(db);
    return { lastInsertId, changes };
  } catch (err) {
    console.error('execute error:', err);
    return { lastInsertId: 0, changes: 0 };
  }
}

async function initSchemaAndSeed(db: SqlJsDatabase) {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      filename TEXT NOT NULL,
      category TEXT NOT NULL,
      location TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS films (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      poster TEXT NOT NULL,
      video TEXT,
      genre TEXT,
      duration TEXT,
      year INTEGER,
      awards TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      duration TEXT NOT NULL,
      price TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      service_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      location TEXT,
      message TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (service_id) REFERENCES services(id)
    );

    CREATE TABLE IF NOT EXISTS availability (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date TEXT NOT NULL,
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      available INTEGER DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default Admin if none exists
  const checkAdmin = db.exec("SELECT COUNT(*) FROM users");
  const userCount = checkAdmin.length > 0 ? Number(checkAdmin[0].values[0][0]) : 0;

  if (userCount === 0) {
    const hashedPassword = await bcrypt.hash('wesley2026!', 10);
    db.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [
      'Wesley Studio',
      'rwemera30@gmail.com',
      hashedPassword,
      'admin'
    ]);
  } else {
    // Ensure admin user email is updated to rwemera30@gmail.com
    db.run("UPDATE users SET email = 'rwemera30@gmail.com' WHERE email = 'admin@wesley.rw'");
  }

  // Seed Services
  const checkServices = db.exec("SELECT COUNT(*) FROM services");
  const serviceCount = checkServices.length > 0 ? Number(checkServices[0].values[0][0]) : 0;

  if (serviceCount === 0) {
    db.run("INSERT INTO services (name, description, duration, price) VALUES (?, ?, ?, ?)", [
      'Portrait Session',
      'Editorial, fine-art or personal character portraits captured in Kigali studio or outdoor location.',
      '2 Hours',
      '$250'
    ]);
    db.run("INSERT INTO services (name, description, duration, price) VALUES (?, ?, ?, ?)", [
      'Wedding Photography & Film',
      'Full-day cinema and photography coverage of traditional and modern African wedding celebrations.',
      'Full Day',
      '$1,200'
    ]);
    db.run("INSERT INTO services (name, description, duration, price) VALUES (?, ?, ?, ?)", [
      'Documentary Filming',
      'In-depth storytelling and production for non-profits, cultural archives, or humanitarian features.',
      'Custom Project',
      'Quote Upon Request'
    ]);
    db.run("INSERT INTO services (name, description, duration, price) VALUES (?, ?, ?, ?)", [
      'Commercial & Brand Video',
      'Cinematic promo videos, television commercials, and brand visual stories for African and global brands.',
      'Half / Full Day',
      '$800'
    ]);
    db.run("INSERT INTO services (name, description, duration, price) VALUES (?, ?, ?, ?)", [
      'Creative Direction & Consulting',
      'Script development, visual treatment, and creative consulting for film projects across East Africa.',
      '3 Hours',
      '$400'
    ]);
  }

  // Seed Initial Films
  const checkFilms = db.exec("SELECT COUNT(*) FROM films");
  const filmCount = checkFilms.length > 0 ? Number(checkFilms[0].values[0][0]) : 0;

  if (filmCount === 0) {
    db.run(`INSERT INTO films (title, description, poster, video, genre, duration, year, awards) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
      'The Echoes of Akagera',
      'A poignant narrative following a young Rwandan boy who discovers his grandfather\'s lost ancestral drum in the wildlife reserves of Akagera, symbolizing resilience and cultural rebirth.',
      '/src/assets/images/film_akagera_1785877508167.jpg',
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
      'Drama / Cultural Narrative',
      '24 min',
      2025,
      'FESPACO Official Selection 2025 • Durban Int Film Fest Award'
    ]);

    db.run(`INSERT INTO films (title, description, poster, video, genre, duration, year, awards) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
      'Whispers of Kigali',
      'An intimate urban documentary showcasing Kigali\'s vibrant night economy, young fashion designers, and street musicians shaping the modern identity of Rwanda.',
      '/src/assets/images/film_kigali_1785877521721.jpg',
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
      'Documentary / Urban Culture',
      '42 min',
      2024,
      'Silicon Valley African Film Festival Best Short Doc'
    ]);

    db.run(`INSERT INTO films (title, description, poster, video, genre, duration, year, awards) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
      'Threads of Heritage',
      'A short poetic film celebrating the intricate art of Rwandan Imigongo, weaving traditional patterns with modern cinematic lighting and music score.',
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80',
      'https://www.youtube.com/embed/dQw4w9WgXcQ',
      'Poetic Short / Art Film',
      '14 min',
      2023,
      'Kigali Cine Festival Special Jury Prize'
    ]);
  }

  // Seed Initial Photos
  const checkPhotos = db.exec("SELECT COUNT(*) FROM photos");
  const photoCount = checkPhotos.length > 0 ? Number(checkPhotos[0].values[0][0]) : 0;

  if (photoCount === 0) {
    // Landscape photos
    db.run(`INSERT INTO photos (title, description, filename, category, location) VALUES (?, ?, ?, ?, ?)`, [
      'Mist Over Lake Kivu',
      'Dawn breaking over the serene waters of Lake Kivu, featuring traditional fishermen casting nets.',
      '/src/assets/images/landscape_rwanda_1785877535052.jpg',
      'landscape',
      'Lake Kivu, Karongi, Rwanda'
    ]);
    db.run(`INSERT INTO photos (title, description, filename, category, location) VALUES (?, ?, ?, ?, ?)`, [
      'The Thousand Hills Canopy',
      'Panoramic sunset landscape capturing the endless layered green crests of Northern Province.',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
      'landscape',
      'Musanze, Rwanda'
    ]);
    db.run(`INSERT INTO photos (title, description, filename, category, location) VALUES (?, ?, ?, ?, ?)`, [
      'Nyungwe Rainforest Sanctuary',
      'Sunbeams penetrating the ancient rainforest canopy of Nyungwe National Park.',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80',
      'landscape',
      'Nyungwe, Rwanda'
    ]);
    db.run(`INSERT INTO photos (title, description, filename, category, location) VALUES (?, ?, ?, ?, ?)`, [
      'Kigali City Lights at Dusk',
      'A clean architectural twilight shot of Kigali\'s convention center and modern cityscape.',
      'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=80',
      'landscape',
      'Kigali, Rwanda'
    ]);

    // Portrait photos
    db.run(`INSERT INTO photos (title, description, filename, category, location) VALUES (?, ?, ?, ?, ?)`, [
      'Dancer of Umushanana',
      'Fine art portrait highlighting the graceful movement and traditional attire of a Rwandan dancer.',
      '/src/assets/images/portrait_story_1785877547350.jpg',
      'portrait',
      'Kigali Cultural Village, Rwanda'
    ]);
    db.run(`INSERT INTO photos (title, description, filename, category, location) VALUES (?, ?, ?, ?, ?)`, [
      'The Master Craftsman',
      'An intimate character portrait of a veteran woodcarver in Nyamirambo with natural key lighting.',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
      'portrait',
      'Nyamirambo, Kigali'
    ]);
    db.run(`INSERT INTO photos (title, description, filename, category, location) VALUES (?, ?, ?, ?, ?)`, [
      'Youth of Kigali',
      'Editorial fashion portrait showcasing modern African creative youth culture.',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
      'portrait',
      'Kacyiru, Kigali'
    ]);
  }

  // Seed sample bookings
  const checkBookings = db.exec("SELECT COUNT(*) FROM bookings");
  const bookingCount = checkBookings.length > 0 ? Number(checkBookings[0].values[0][0]) : 0;

  if (bookingCount === 0) {
    db.run(`INSERT INTO bookings (client_name, email, phone, service_id, date, time, location, message, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      'Jean-Pierre Mugisha',
      'mugisha@example.com',
      '+250 788 123 456',
      1,
      '2026-08-15',
      '10:00',
      'Kigali Studio',
      'Looking for editorial headshots and character portraits for an upcoming theatre premiere.',
      'confirmed'
    ]);

    db.run(`INSERT INTO bookings (client_name, email, phone, service_id, date, time, location, message, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      'Claire Habimana',
      'claire@example.rw',
      '+250 789 987 654',
      2,
      '2026-08-22',
      '09:00',
      'Lake Kivu Serena Hotel',
      'We would love Wesley to direct our wedding film and photo narrative.',
      'pending'
    ]);
  }

  // Seed sample messages
  const checkMessages = db.exec("SELECT COUNT(*) FROM messages");
  const msgCount = checkMessages.length > 0 ? Number(checkMessages[0].values[0][0]) : 0;

  if (msgCount === 0) {
    db.run(`INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)`, [
      'Kigali International Film Festival',
      'info@kiff.rw',
      'Guest Speaker & Film Screening Invitation',
      'Dear Wesley, We would love to feature "The Echoes of Akagera" as an opening film for our youth cinema showcase in October.'
    ]);
  }
}
