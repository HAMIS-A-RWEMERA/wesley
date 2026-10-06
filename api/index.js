// server/app.ts
import express from "express";
import session from "express-session";
import path3 from "path";
import fs3 from "fs";
import { fileURLToPath as fileURLToPath2 } from "url";
import dotenv from "dotenv";

// server/routes/publicRoutes.ts
import { Router } from "express";

// server/database/db.ts
import initSqlJs from "sql.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var IS_VERCEL = Boolean(process.env.VERCEL);
function findFile(...relativePaths) {
  const bases = [
    process.cwd(),
    __dirname,
    path.join(__dirname, ".."),
    "/var/task"
  ];
  for (const rel of relativePaths) {
    for (const base of bases) {
      const candidate = path.join(base, rel);
      if (fs.existsSync(candidate)) return candidate;
    }
  }
  return null;
}
var BUNDLED_DB_FILE = findFile("database/wesley.db") || path.join(process.cwd(), "database", "wesley.db");
var DB_FILE = IS_VERCEL ? path.join("/tmp", "wesley.db") : BUNDLED_DB_FILE;
var dbInstance = null;
async function getDb() {
  if (dbInstance) {
    return dbInstance;
  }
  const wasmPath = findFile("database/sql-wasm.wasm", "node_modules/sql.js/dist/sql-wasm.wasm");
  let wasmBinary;
  if (wasmPath) {
    try {
      wasmBinary = fs.readFileSync(wasmPath);
    } catch (e) {
      console.warn("Could not read wasm binary:", e);
    }
  }
  const SQL = await initSqlJs(wasmBinary ? { wasmBinary } : {});
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch (err) {
      console.warn("Could not create DB directory:", err);
    }
  }
  if (IS_VERCEL && !fs.existsSync(DB_FILE) && fs.existsSync(BUNDLED_DB_FILE)) {
    try {
      fs.copyFileSync(BUNDLED_DB_FILE, DB_FILE);
    } catch (err) {
      console.warn("Could not copy bundled DB to /tmp:", err);
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
function saveDb(dbToSave) {
  const target = dbToSave || dbInstance;
  if (!target) return;
  try {
    const data = target.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_FILE, buffer);
  } catch (err) {
    console.warn("saveDb failed (likely read-only serverless environment):", err);
  }
}
async function queryAll(sql, params = []) {
  try {
    const db = await getDb();
    const stmt = db.prepare(sql);
    stmt.bind(params);
    const results = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject());
    }
    stmt.free();
    return results;
  } catch (err) {
    console.error("queryAll error:", err);
    return [];
  }
}
async function queryOne(sql, params = []) {
  const results = await queryAll(sql, params);
  return results.length > 0 ? results[0] : null;
}
async function execute(sql, params = []) {
  try {
    const db = await getDb();
    db.run(sql, params);
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
    console.error("execute error:", err);
    return { lastInsertId: 0, changes: 0 };
  }
}
async function initSchemaAndSeed(db) {
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
  const checkAdmin = db.exec("SELECT COUNT(*) FROM users");
  const userCount = checkAdmin.length > 0 ? Number(checkAdmin[0].values[0][0]) : 0;
  if (userCount === 0) {
    const hashedPassword = await bcrypt.hash("wesley2026!", 10);
    db.run("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", [
      "Wesley Studio",
      "rwemera30@gmail.com",
      hashedPassword,
      "admin"
    ]);
  } else {
    db.run("UPDATE users SET email = 'rwemera30@gmail.com' WHERE email = 'admin@wesley.rw'");
  }
  const checkServices = db.exec("SELECT COUNT(*) FROM services");
  const serviceCount = checkServices.length > 0 ? Number(checkServices[0].values[0][0]) : 0;
  if (serviceCount === 0) {
    db.run("INSERT INTO services (name, description, duration, price) VALUES (?, ?, ?, ?)", [
      "Portrait Session",
      "Editorial, fine-art or personal character portraits captured in Kigali studio or outdoor location.",
      "2 Hours",
      "$250"
    ]);
    db.run("INSERT INTO services (name, description, duration, price) VALUES (?, ?, ?, ?)", [
      "Wedding Photography & Film",
      "Full-day cinema and photography coverage of traditional and modern African wedding celebrations.",
      "Full Day",
      "$1,200"
    ]);
    db.run("INSERT INTO services (name, description, duration, price) VALUES (?, ?, ?, ?)", [
      "Documentary Filming",
      "In-depth storytelling and production for non-profits, cultural archives, or humanitarian features.",
      "Custom Project",
      "Quote Upon Request"
    ]);
    db.run("INSERT INTO services (name, description, duration, price) VALUES (?, ?, ?, ?)", [
      "Commercial & Brand Video",
      "Cinematic promo videos, television commercials, and brand visual stories for African and global brands.",
      "Half / Full Day",
      "$800"
    ]);
    db.run("INSERT INTO services (name, description, duration, price) VALUES (?, ?, ?, ?)", [
      "Creative Direction & Consulting",
      "Script development, visual treatment, and creative consulting for film projects across East Africa.",
      "3 Hours",
      "$400"
    ]);
  }
  const checkFilms = db.exec("SELECT COUNT(*) FROM films");
  const filmCount = checkFilms.length > 0 ? Number(checkFilms[0].values[0][0]) : 0;
  if (filmCount === 0) {
    db.run(`INSERT INTO films (title, description, poster, video, genre, duration, year, awards) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
      "The Echoes of Akagera",
      "A poignant narrative following a young Rwandan boy who discovers his grandfather's lost ancestral drum in the wildlife reserves of Akagera, symbolizing resilience and cultural rebirth.",
      "/src/assets/images/film_akagera_1785877508167.jpg",
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "Drama / Cultural Narrative",
      "24 min",
      2025,
      "FESPACO Official Selection 2025 \u2022 Durban Int Film Fest Award"
    ]);
    db.run(`INSERT INTO films (title, description, poster, video, genre, duration, year, awards) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
      "Whispers of Kigali",
      "An intimate urban documentary showcasing Kigali's vibrant night economy, young fashion designers, and street musicians shaping the modern identity of Rwanda.",
      "/src/assets/images/film_kigali_1785877521721.jpg",
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "Documentary / Urban Culture",
      "42 min",
      2024,
      "Silicon Valley African Film Festival Best Short Doc"
    ]);
    db.run(`INSERT INTO films (title, description, poster, video, genre, duration, year, awards) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
      "Threads of Heritage",
      "A short poetic film celebrating the intricate art of Rwandan Imigongo, weaving traditional patterns with modern cinematic lighting and music score.",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
      "https://www.youtube.com/embed/dQw4w9WgXcQ",
      "Poetic Short / Art Film",
      "14 min",
      2023,
      "Kigali Cine Festival Special Jury Prize"
    ]);
  }
  const checkPhotos = db.exec("SELECT COUNT(*) FROM photos");
  const photoCount = checkPhotos.length > 0 ? Number(checkPhotos[0].values[0][0]) : 0;
  if (photoCount === 0) {
    db.run(`INSERT INTO photos (title, description, filename, category, location) VALUES (?, ?, ?, ?, ?)`, [
      "Mist Over Lake Kivu",
      "Dawn breaking over the serene waters of Lake Kivu, featuring traditional fishermen casting nets.",
      "/src/assets/images/landscape_rwanda_1785877535052.jpg",
      "landscape",
      "Lake Kivu, Karongi, Rwanda"
    ]);
    db.run(`INSERT INTO photos (title, description, filename, category, location) VALUES (?, ?, ?, ?, ?)`, [
      "The Thousand Hills Canopy",
      "Panoramic sunset landscape capturing the endless layered green crests of Northern Province.",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80",
      "landscape",
      "Musanze, Rwanda"
    ]);
    db.run(`INSERT INTO photos (title, description, filename, category, location) VALUES (?, ?, ?, ?, ?)`, [
      "Nyungwe Rainforest Sanctuary",
      "Sunbeams penetrating the ancient rainforest canopy of Nyungwe National Park.",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
      "landscape",
      "Nyungwe, Rwanda"
    ]);
    db.run(`INSERT INTO photos (title, description, filename, category, location) VALUES (?, ?, ?, ?, ?)`, [
      "Kigali City Lights at Dusk",
      "A clean architectural twilight shot of Kigali's convention center and modern cityscape.",
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1000&q=80",
      "landscape",
      "Kigali, Rwanda"
    ]);
    db.run(`INSERT INTO photos (title, description, filename, category, location) VALUES (?, ?, ?, ?, ?)`, [
      "Dancer of Umushanana",
      "Fine art portrait highlighting the graceful movement and traditional attire of a Rwandan dancer.",
      "/src/assets/images/portrait_story_1785877547350.jpg",
      "portrait",
      "Kigali Cultural Village, Rwanda"
    ]);
    db.run(`INSERT INTO photos (title, description, filename, category, location) VALUES (?, ?, ?, ?, ?)`, [
      "The Master Craftsman",
      "An intimate character portrait of a veteran woodcarver in Nyamirambo with natural key lighting.",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80",
      "portrait",
      "Nyamirambo, Kigali"
    ]);
    db.run(`INSERT INTO photos (title, description, filename, category, location) VALUES (?, ?, ?, ?, ?)`, [
      "Youth of Kigali",
      "Editorial fashion portrait showcasing modern African creative youth culture.",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      "portrait",
      "Kacyiru, Kigali"
    ]);
  }
  const checkBookings = db.exec("SELECT COUNT(*) FROM bookings");
  const bookingCount = checkBookings.length > 0 ? Number(checkBookings[0].values[0][0]) : 0;
  if (bookingCount === 0) {
    db.run(`INSERT INTO bookings (client_name, email, phone, service_id, date, time, location, message, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      "Jean-Pierre Mugisha",
      "mugisha@example.com",
      "+250 788 123 456",
      1,
      "2026-08-15",
      "10:00",
      "Kigali Studio",
      "Looking for editorial headshots and character portraits for an upcoming theatre premiere.",
      "confirmed"
    ]);
    db.run(`INSERT INTO bookings (client_name, email, phone, service_id, date, time, location, message, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
      "Claire Habimana",
      "claire@example.rw",
      "+250 789 987 654",
      2,
      "2026-08-22",
      "09:00",
      "Lake Kivu Serena Hotel",
      "We would love Wesley to direct our wedding film and photo narrative.",
      "pending"
    ]);
  }
  const checkMessages = db.exec("SELECT COUNT(*) FROM messages");
  const msgCount = checkMessages.length > 0 ? Number(checkMessages[0].values[0][0]) : 0;
  if (msgCount === 0) {
    db.run(`INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)`, [
      "Kigali International Film Festival",
      "info@kiff.rw",
      "Guest Speaker & Film Screening Invitation",
      'Dear Wesley, We would love to feature "The Echoes of Akagera" as an opening film for our youth cinema showcase in October.'
    ]);
  }
}

// server/routes/publicRoutes.ts
var router = Router();
router.get("/", async (req, res) => {
  try {
    const featuredFilms = await queryAll("SELECT * FROM films ORDER BY year DESC, id DESC LIMIT 3");
    const featuredPhotos = await queryAll("SELECT * FROM photos ORDER BY id DESC LIMIT 6");
    const services = await queryAll("SELECT * FROM services LIMIT 4");
    res.render("index", {
      title: "WESLEY \u2014 African Cinema & Photography Studio",
      featuredFilms,
      featuredPhotos,
      services,
      path: "/"
    });
  } catch (error) {
    console.error("Home route error:", error);
    res.status(500).render("error", { message: "Failed to load home page" });
  }
});
router.get("/about", async (req, res) => {
  res.render("about", {
    title: "About Wesley \u2014 Filmmaker & Storyteller | Kigali, Rwanda",
    path: "/about"
  });
});
router.get("/landscape", async (req, res) => {
  try {
    const photos = await queryAll("SELECT * FROM photos WHERE category = 'landscape' ORDER BY id DESC");
    res.render("landscape", {
      title: "Landscape Photography \u2014 Wesley Studio",
      photos,
      path: "/landscape"
    });
  } catch (error) {
    console.error("Landscape route error:", error);
    res.status(500).render("error", { message: "Failed to load landscape gallery" });
  }
});
router.get("/portrait", async (req, res) => {
  try {
    const photos = await queryAll("SELECT * FROM photos WHERE category = 'portrait' ORDER BY id DESC");
    res.render("portrait", {
      title: "Portrait Photography \u2014 Wesley Studio",
      photos,
      path: "/portrait"
    });
  } catch (error) {
    console.error("Portrait route error:", error);
    res.status(500).render("error", { message: "Failed to load portrait gallery" });
  }
});
router.get("/films", async (req, res) => {
  try {
    const films = await queryAll("SELECT * FROM films ORDER BY year DESC, id DESC");
    res.render("films", {
      title: "Films & Cinema Showcase \u2014 Wesley Studio",
      films,
      path: "/films"
    });
  } catch (error) {
    console.error("Films route error:", error);
    res.status(500).render("error", { message: "Failed to load films showcase" });
  }
});
router.get("/booking", async (req, res) => {
  try {
    const services = await queryAll("SELECT * FROM services ORDER BY id ASC");
    const existingBookings = await queryAll("SELECT date, time, status FROM bookings WHERE status IN ('confirmed', 'pending')");
    const blockedAvailability = await queryAll("SELECT date, start_time, end_time, available FROM availability WHERE available = 0");
    res.render("booking", {
      title: "Book a Session \u2014 Wesley Studio",
      services,
      existingBookings,
      blockedAvailability,
      path: "/booking",
      queryService: req.query.service || null,
      success: req.query.success === "true"
    });
  } catch (error) {
    console.error("Booking page error:", error);
    res.status(500).render("error", { message: "Failed to load booking page" });
  }
});
router.post("/booking", async (req, res) => {
  try {
    const { client_name, email, phone, service_id, date, time, location, message } = req.body;
    if (!client_name || !email || !phone || !service_id || !date || !time) {
      return res.status(400).json({ success: false, message: "Please fill in all required fields." });
    }
    const doubleBook = await queryOne(
      "SELECT id FROM bookings WHERE date = ? AND time = ? AND status = 'confirmed'",
      [date, time]
    );
    if (doubleBook) {
      return res.status(409).json({
        success: false,
        message: "This time slot is already booked. Please choose another date or time."
      });
    }
    await execute(
      `INSERT INTO bookings (client_name, email, phone, service_id, date, time, location, message, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [client_name, email, phone, service_id, date, time, location || "Kigali", message || ""]
    );
    if (req.xhr || req.headers.accept?.includes("json")) {
      return res.json({ success: true, message: "Booking request submitted successfully!" });
    }
    res.redirect("/booking?success=true");
  } catch (error) {
    console.error("Booking post error:", error);
    res.status(500).json({ success: false, message: "Internal server error processing booking." });
  }
});
router.get("/contact", async (req, res) => {
  res.render("contact", {
    title: "Contact & Inquiry \u2014 Wesley Studio",
    path: "/contact",
    sent: req.query.sent === "true"
  });
});
router.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
    await execute(
      "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)",
      [name, email, subject, message]
    );
    if (req.xhr || req.headers.accept?.includes("json")) {
      return res.json({ success: true, message: "Your message has been sent!" });
    }
    res.redirect("/contact?sent=true");
  } catch (error) {
    console.error("Contact post error:", error);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
});
var publicRoutes_default = router;

// server/routes/adminRoutes.ts
import { Router as Router2 } from "express";
import bcrypt2 from "bcryptjs";

// server/auth.ts
function requireAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === "admin") {
    return next();
  }
  return res.redirect("/admin/login");
}

// server/upload.ts
import multer from "multer";
import path2 from "path";
import fs2 from "fs";
var IS_VERCEL2 = Boolean(process.env.VERCEL);
var uploadDir = IS_VERCEL2 ? path2.join("/tmp", "uploads") : path2.join(process.cwd(), "public", "uploads");
try {
  if (!fs2.existsSync(uploadDir)) {
    fs2.mkdirSync(uploadDir, { recursive: true });
  }
} catch (err) {
  console.warn("Could not create upload directory:", err);
}
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path2.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});
var upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  // 50MB max file size
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp|gif|mp4|webm|quicktime/;
    const extname = allowedTypes.test(path2.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname || mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only images (JPEG, PNG, WEBP) and videos (MP4, WEBM) are allowed."));
    }
  }
});

// server/routes/adminRoutes.ts
var router2 = Router2();
router2.get("/login", (req, res) => {
  if (req.session && req.session.user) {
    return res.redirect("/admin/dashboard");
  }
  res.render("admin/login", {
    title: "Admin Login \u2014 Wesley Studio CMS",
    error: req.query.error ? "Invalid email or password." : null,
    path: "/admin/login"
  });
});
router2.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.redirect("/admin/login?error=1");
    }
    const user = await queryOne("SELECT * FROM users WHERE email = ?", [email]);
    if (!user) {
      return res.redirect("/admin/login?error=1");
    }
    const match = await bcrypt2.compare(password, user.password);
    if (!match) {
      return res.redirect("/admin/login?error=1");
    }
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };
    res.redirect("/admin/dashboard");
  } catch (error) {
    console.error("Admin login error:", error);
    res.redirect("/admin/login?error=1");
  }
});
router2.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin/login");
  });
});
router2.use(requireAdmin);
router2.get("/dashboard", async (req, res) => {
  try {
    const totalPhotosRes = await queryOne("SELECT COUNT(*) as count FROM photos");
    const totalFilmsRes = await queryOne("SELECT COUNT(*) as count FROM films");
    const pendingBookingsRes = await queryOne("SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'");
    const upcomingBookingsRes = await queryOne("SELECT COUNT(*) as count FROM bookings WHERE status = 'confirmed'");
    const unreadMessagesRes = await queryOne("SELECT COUNT(*) as count FROM messages WHERE is_read = 0");
    const recentBookings = await queryAll(
      `SELECT b.*, s.name as service_name FROM bookings b 
       JOIN services s ON b.service_id = s.id 
       ORDER BY b.id DESC LIMIT 5`
    );
    const recentMessages = await queryAll("SELECT * FROM messages ORDER BY id DESC LIMIT 5");
    res.render("admin/dashboard", {
      title: "Studio Dashboard \u2014 Wesley CMS",
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
      path: "/admin/dashboard"
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    res.status(500).send("Dashboard Error");
  }
});
router2.get("/photos", async (req, res) => {
  try {
    const photos = await queryAll("SELECT * FROM photos ORDER BY id DESC");
    res.render("admin/photos", {
      title: "Photo Management \u2014 Wesley Studio",
      photos,
      user: req.session.user,
      path: "/admin/photos"
    });
  } catch (error) {
    console.error("Admin photos page error:", error);
    res.status(500).send("Error loading photos");
  }
});
router2.post("/photos/upload", upload.single("photo_file"), async (req, res) => {
  try {
    const { title, description, category, location, photo_url } = req.body;
    let filename = photo_url || "";
    if (req.file) {
      filename = `/uploads/${req.file.filename}`;
    }
    if (!title || !category || !filename) {
      return res.status(400).send("Title, category, and photo file/URL are required.");
    }
    await execute(
      "INSERT INTO photos (title, description, filename, category, location) VALUES (?, ?, ?, ?, ?)",
      [title, description || "", filename, category, location || "Kigali, Rwanda"]
    );
    res.redirect("/admin/photos");
  } catch (error) {
    console.error("Upload photo error:", error);
    res.status(500).send("Failed to upload photo");
  }
});
router2.post("/photos/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, category, location } = req.body;
    await execute(
      "UPDATE photos SET title = ?, description = ?, category = ?, location = ? WHERE id = ?",
      [title, description, category, location, id]
    );
    res.redirect("/admin/photos");
  } catch (error) {
    console.error("Edit photo error:", error);
    res.status(500).send("Failed to update photo");
  }
});
router2.post("/photos/delete/:id", async (req, res) => {
  try {
    await execute("DELETE FROM photos WHERE id = ?", [req.params.id]);
    res.redirect("/admin/photos");
  } catch (error) {
    console.error("Delete photo error:", error);
    res.status(500).send("Failed to delete photo");
  }
});
router2.get("/films", async (req, res) => {
  try {
    const films = await queryAll("SELECT * FROM films ORDER BY year DESC, id DESC");
    res.render("admin/films", {
      title: "Film Portfolio Management \u2014 Wesley Studio",
      films,
      user: req.session.user,
      path: "/admin/films"
    });
  } catch (error) {
    console.error("Admin films error:", error);
    res.status(500).send("Error loading films management");
  }
});
router2.post("/films/add", upload.fields([{ name: "poster_file", maxCount: 1 }, { name: "video_file", maxCount: 1 }]), async (req, res) => {
  try {
    const files = req.files;
    const { title, description, poster_url, video_url, genre, duration, year, awards } = req.body;
    let poster = poster_url || "";
    if (files && files["poster_file"] && files["poster_file"][0]) {
      poster = `/uploads/${files["poster_file"][0].filename}`;
    }
    let video = video_url || "";
    if (files && files["video_file"] && files["video_file"][0]) {
      video = `/uploads/${files["video_file"][0].filename}`;
    }
    if (!title || !poster) {
      return res.status(400).send("Title and poster image are required.");
    }
    await execute(
      `INSERT INTO films (title, description, poster, video, genre, duration, year, awards)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description || "",
        poster,
        video || "",
        genre || "Drama",
        duration || "Short Film",
        Number(year) || (/* @__PURE__ */ new Date()).getFullYear(),
        awards || ""
      ]
    );
    res.redirect("/admin/films");
  } catch (error) {
    console.error("Add film error:", error);
    res.status(500).send("Failed to add film");
  }
});
router2.post("/films/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, poster, video, genre, duration, year, awards } = req.body;
    await execute(
      `UPDATE films SET title = ?, description = ?, poster = ?, video = ?, genre = ?, duration = ?, year = ?, awards = ?
       WHERE id = ?`,
      [title, description, poster, video, genre, duration, Number(year), awards, id]
    );
    res.redirect("/admin/films");
  } catch (error) {
    console.error("Edit film error:", error);
    res.status(500).send("Failed to update film");
  }
});
router2.post("/films/delete/:id", async (req, res) => {
  try {
    await execute("DELETE FROM films WHERE id = ?", [req.params.id]);
    res.redirect("/admin/films");
  } catch (error) {
    console.error("Delete film error:", error);
    res.status(500).send("Failed to delete film");
  }
});
router2.get("/bookings", async (req, res) => {
  try {
    const bookings = await queryAll(
      `SELECT b.*, s.name as service_name, s.price as service_price 
       FROM bookings b 
       JOIN services s ON b.service_id = s.id 
       ORDER BY b.id DESC`
    );
    res.render("admin/bookings", {
      title: "Booking Requests & Calendar \u2014 Wesley Studio",
      bookings,
      user: req.session.user,
      path: "/admin/bookings"
    });
  } catch (error) {
    console.error("Admin bookings error:", error);
    res.status(500).send("Error loading bookings");
  }
});
router2.post("/bookings/status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const bookingId = req.params.id;
    await execute("UPDATE bookings SET status = ? WHERE id = ?", [status, bookingId]);
    if (status === "confirmed") {
      const booking = await queryOne("SELECT date, time FROM bookings WHERE id = ?", [bookingId]);
      if (booking) {
        await execute(
          "INSERT INTO availability (date, start_time, end_time, available) VALUES (?, ?, ?, 0)",
          [booking.date, booking.time, booking.time]
        );
      }
    }
    res.redirect("/admin/bookings");
  } catch (error) {
    console.error("Update booking status error:", error);
    res.status(500).send("Failed to update booking status");
  }
});
router2.get("/availability", async (req, res) => {
  try {
    const blockedSlots = await queryAll("SELECT * FROM availability ORDER BY date ASC, start_time ASC");
    res.render("admin/availability", {
      title: "Availability & Working Hours \u2014 Wesley Studio",
      blockedSlots,
      user: req.session.user,
      path: "/admin/availability"
    });
  } catch (error) {
    console.error("Admin availability error:", error);
    res.status(500).send("Error loading availability");
  }
});
router2.post("/availability/block", async (req, res) => {
  try {
    const { date, start_time, end_time } = req.body;
    if (!date || !start_time) {
      return res.status(400).send("Date and start time required.");
    }
    await execute(
      "INSERT INTO availability (date, start_time, end_time, available) VALUES (?, ?, ?, 0)",
      [date, start_time, end_time || start_time]
    );
    res.redirect("/admin/availability");
  } catch (error) {
    console.error("Block slot error:", error);
    res.status(500).send("Failed to block availability slot");
  }
});
router2.post("/availability/delete/:id", async (req, res) => {
  try {
    await execute("DELETE FROM availability WHERE id = ?", [req.params.id]);
    res.redirect("/admin/availability");
  } catch (error) {
    console.error("Delete slot error:", error);
    res.status(500).send("Failed to unblock slot");
  }
});
router2.get("/messages", async (req, res) => {
  try {
    const messages = await queryAll("SELECT * FROM messages ORDER BY id DESC");
    res.render("admin/messages", {
      title: "Client Inquiries & Messages \u2014 Wesley Studio",
      messages,
      user: req.session.user,
      path: "/admin/messages"
    });
  } catch (error) {
    console.error("Admin messages error:", error);
    res.status(500).send("Error loading messages");
  }
});
router2.post("/messages/read/:id", async (req, res) => {
  try {
    const { is_read } = req.body;
    await execute("UPDATE messages SET is_read = ? WHERE id = ?", [is_read ? 1 : 0, req.params.id]);
    res.redirect("/admin/messages");
  } catch (error) {
    console.error("Read status error:", error);
    res.status(500).send("Failed to update read status");
  }
});
router2.post("/messages/delete/:id", async (req, res) => {
  try {
    await execute("DELETE FROM messages WHERE id = ?", [req.params.id]);
    res.redirect("/admin/messages");
  } catch (error) {
    console.error("Delete message error:", error);
    res.status(500).send("Failed to delete message");
  }
});
var adminRoutes_default = router2;

// server/app.ts
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = path3.dirname(__filename2);
dotenv.config();
var app = express();
function findDirectory(dirName) {
  const candidates = [
    path3.join(process.cwd(), dirName),
    path3.join(__dirname2, "..", dirName),
    path3.join(__dirname2, dirName),
    path3.join("/var/task", dirName)
  ];
  for (const candidate of candidates) {
    if (fs3.existsSync(candidate)) {
      return candidate;
    }
  }
  return path3.join(process.cwd(), dirName);
}
var viewsDir = findDirectory("views");
var publicDir = findDirectory("public");
var srcDir = findDirectory("src");
var IS_VERCEL3 = Boolean(process.env.VERCEL);
var uploadsDir = IS_VERCEL3 ? path3.join("/tmp", "uploads") : path3.join(publicDir, "uploads");
try {
  if (!fs3.existsSync(uploadsDir)) {
    fs3.mkdirSync(uploadsDir, { recursive: true });
  }
} catch (e) {
  console.warn("Uploads directory warning:", e);
}
app.set("trust proxy", 1);
app.use(async (req, res, next) => {
  try {
    await getDb();
    next();
  } catch (err) {
    next(err);
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "wesley-studio-kigali-film-secret-2026",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: "auto",
      // Automatically true on HTTPS (Vercel) and false on HTTP localhost
      maxAge: 24 * 60 * 60 * 1e3
      // 24 hours
    }
  })
);
app.set("view engine", "ejs");
app.set("views", viewsDir);
app.use(express.static(publicDir));
app.use("/public", express.static(publicDir));
app.use("/src", express.static(srcDir));
app.use("/uploads", express.static(uploadsDir));
app.use("/", publicRoutes_default);
app.use("/admin", adminRoutes_default);
app.use((req, res) => {
  try {
    res.status(404).render("error", {
      title: "Page Not Found \u2014 Wesley Studio",
      message: "The requested page or resource could not be found.",
      path: req.path
    });
  } catch {
    res.status(404).send("<h1>404 Not Found</h1><p>The requested page could not be found.</p>");
  }
});
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  try {
    res.status(500).render("error", {
      title: "Studio Server Error",
      message: err.message || "An unexpected error occurred.",
      path: req.path
    });
  } catch {
    res.status(500).send(`<h1>Studio Server Error</h1><p>${err?.message || "An unexpected error occurred."}</p>`);
  }
});
var app_default = app;

// api/index.ts
async function handler(req, res) {
  try {
    await getDb();
  } catch (err) {
    console.warn("Pre-warming DB warning in serverless handler:", err);
  }
  return app_default(req, res);
}
export {
  handler as default
};
