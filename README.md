# WESLEY STUDIO — Filmmaker Portfolio, Booking & Studio CMS

A React + TypeScript + Vite Single-Page Application (SPA) built for **Director Wesley** (`WESLEY STUDIO`), a filmmaker, cinematographer, and visual storyteller based in Kigali, Rwanda.

This document is written as an accurate technical reference for **developers and AI coding assistants** opening this repository. It describes what is currently implemented, what problems the codebase solves, its architectural limitations (including why CMS edits do not yet sync across devices), and unused legacy artifacts in the repo.

---

## 1. What This Codebase Does

The application is a client-side web platform combining a public creative portfolio, client booking/inquiry workflows, and an in-browser Studio CMS modal:

### Public Portfolio & Client Experience
- **Atmospheric Home Showcase (`src/pages/Home.tsx`)**:
  - Hero section spotlighting a featured production (prioritizing *THREE NIGHTS* or the first film) with instant trailer playback.
  - Infinite scrolling capability marquee (`src/components/MarqueeTicker.tsx`).
  - 7 Film & Video sector cards linking directly to filtered views.
  - Featured Productions grid (top 4 films) and Photography Galleries preview (6 category badges + top 6 photos).
  - Director's Statement & Spotlight section driven by `SiteSettings`.
- **Film & Video Portfolio (`src/pages/Films.tsx`)**:
  - Filterable across `All Work` and **7 cinema sectors**: Corporate Videos, Brand Films, Commercials & Ads, Short Films, Documentaries, Social Media Content, and Event Films.
  - Plays trailers in a 16:9 modal (`src/components/VideoModal.tsx`) or opens external watch links (`YouTube` / `Vimeo`).
  - Supports pre-filling the Booking page via `"Inquire Similar Project"`.
- **Photography Galleries (`src/pages/Photography.tsx`)**:
  - Filterable across `All Works` and **6 photography categories**: Portrait, Fashion, Lifestyle, Event, Brand, and Landscape.
  - Opens a fullscreen lightbox viewer (`src/components/LightboxModal.tsx`) with category, description, and location metadata.
- **About & Equipment Arsenal (`src/pages/About.tsx`)**:
  - Displays Director Wesley's biography, 4 core production disciplines, a 4-category cinema gear loadout (cameras, optics, lighting, audio/drones), and Kigali headquarters contact info.
- **Session Booking (`src/pages/Booking.tsx`)**:
  - Interactive package selector (`Corporate & Organizational Storytelling`, `Brand Films & Cinematic Commercials`, `Documentary & Narrative Commission`, `Portrait, Fashion & Brand Photography`, `Event Films & Conference Coverage`).
  - Displays included deliverables, captures client/date/time/location/brief details, generates a `BK-XXXX` reference ID, saves locally, opens a `mailto:` draft to the studio email, and provides a WhatsApp confirmation link.
- **Contact & Studio Suggestion Box (`src/pages/Contact.tsx`)**:
  - Studio coordinates card, a **Direct Inquiry** form (`MSG-XXXX`), and a **Studio Suggestion Box** (`SUG-XXXX` for film ideas, collaborations, website feedback, or general suggestions), each saving locally and launching a `mailto:` draft.
- **Global Navigation, Theme & WhatsApp Concierge**:
  - `src/components/Navbar.tsx`: Floating glass header with hover category dropdowns, mobile drawer, Light/Dark mode toggle, Booking CTA, and Admin Portal trigger.
  - `src/utils/theme.ts`: Persistent Light/Dark theme hook (`wesley_theme_mode` in `localStorage` + `prefers-color-scheme` fallback + cross-tab `storage` sync).
  - `src/components/WhatsAppFloatingButton.tsx`: Floating WhatsApp widget with quick-start prompts and custom message composer.
  - `src/components/Footer.tsx`: Multi-column footer with social links, sector links, theme toggle, and CMS Portal trigger.

### In-Browser Studio CMS (`src/components/AdminModal.tsx`)
Accessible via the lock icon in the Navbar/Footer or `#admin` URL hash:
- **Bookings Tab**: View reservations, open the Director Decision modal to **Accept** or **Deny** with a customized note, save status/decision locally, launch a `mailto:` reply to the client, or message them on WhatsApp.
- **Inquiries Tab**: Read visitor contact messages, mark as read, and launch `mailto:` replies.
- **Suggestions Tab**: Review community/visitor suggestions, mark as reviewed, and thank contributors via `mailto:`.
- **Prices & Services Tab**: Live-edit package prices and durations (`onBlur` auto-save).
- **Bio & Content Tab**: Edit Home hero heading/subheading, director quote, two bio paragraphs, studio email, phone, social channel URLs (YouTube, Instagram, Vimeo, LinkedIn), and CMS password.
- **Films & Photos Tab**:
  - **Films**: Add, edit, test-play, and delete films. Includes real-time video URL parsing (`src/utils/video.ts`) supporting YouTube (`watch?v=`, `youtu.be/`, `shorts/`, `live/`, `embed/`, `m.youtube.com`, raw 11-char IDs, full `<iframe>` snippets), Vimeo URLs, and generic `http(s)://` links, plus one-click YouTube thumbnail extraction for posters and Base64 file upload.
  - **Photos**: Add (URL or Base64 file upload) and delete gallery photos.

---

## 2. What Is Already Done vs. Current Architecture

| Layer | Current Status | Details |
| :--- | :--- | :--- |
| **Frontend UI & Styling** | **Done** | React 19, TypeScript 5.8, Tailwind CSS v4 (`@tailwindcss/vite`), Lucide icons, custom atmospheric CSS (`src/index.css`), Light & Dark themes. |
| **Client-Side Routing** | **Done (Hash-based)** | Managed in `src/App.tsx` via `window.location.hash` (`#home`, `#about`, `#films`, `#photography`, `#booking`, `#contact`, `#admin`, plus legacy `#landscape`/`#portrait` redirects). |
| **Video URL Normalization** | **Done** | `src/utils/video.ts` converts YouTube/Vimeo/iframe inputs into clean embed URLs, watch URLs, and thumbnails. |
| **Reactivity Across Views** | **Done (Local)** | `src/data.ts` dispatches `wesley_content_changed` custom window events; `App.tsx` and page components subscribe and re-render. |
| **Backend API & Database** | **Not Implemented** | **No server routes, database client, or API calls exist.** All CRUD reads/writes go only to browser `localStorage`. |
| **Media / File Storage** | **Not Implemented** | Uploaded images are converted to Base64 strings via `FileReader` and stored in `localStorage`. |
| **Transactional Email** | **Not Implemented** | Forms and booking decisions use `mailto:` links rather than an email delivery API. |
| **Production Auth** | **Not Implemented** | Login checks plain-text credentials stored in `DEFAULT_SITE_SETTINGS` / `localStorage`. |

---

## 3. What Problems This Codebase Solves

1. **Unified Showcase for Film & Photography**: Organizes Wesley Studio's multi-disciplinary work into 7 film sectors and 6 photography galleries with embedded playback and lightbox inspection.
2. **Frictionless Video Embedding**: Eliminates broken embeds when non-technical admins paste `youtu.be`, Shorts, Live, raw IDs, or full `<iframe>` HTML snippets instead of `/embed/` URLs.
3. **Structured Client Intake**: Captures package-specific shoot briefs, preferred dates/time slots, and creative suggestions with instant WhatsApp and email handoff options.
4. **Zero-Infrastructure Prototype / Demo**: Runs immediately as a static Vite build (`npm run build` -> `dist/`) on Vercel or any static host without needing server setup to preview the UI.

---

## 4. Known Limitations & Technical Debt (Read Before Extending)

### Critical Limitations
1. **Browser-Only Persistence (`localStorage`) — Root Cause of Sync Issues**:
   - `src/data.ts` stores all changes under `wesley_studio_*_v4` keys in `window.localStorage`.
   - **Impact**: When Director Wesley adds a film link, updates a photo, or changes text/prices in the CMS, **only his own browser sees those updates**. Clients visiting the deployed site from other browsers/devices only see the hardcoded `INITIAL_FILMS`, `INITIAL_PHOTOS`, `INITIAL_SERVICES`, and `DEFAULT_SITE_SETTINGS` bundled in `src/data.ts`.
   - **Impact (Reverse)**: Bookings, contact inquiries, and suggestions submitted by visitors are stored only in *that visitor's* `localStorage` and never reach Director Wesley's CMS dashboard.
2. **No Backend API or Database Connection**:
   - Even if you provision a database (e.g., Neon PostgreSQL) and add environment variables in Vercel, **nothing in this codebase currently reads `DATABASE_URL` or calls `/api/*`**. A backend API layer and DB client must be implemented and wired into `src/data.ts`.
3. **Insecure Client-Side Authentication**:
   - `AdminModal.tsx` validates login against `settings.adminPassword` in the browser and displays the active email/password directly in the login UI (`Active Portal Credentials: ...`). Anyone inspecting the frontend bundle or opening the modal can view or bypass credentials.
4. **Base64 Media Storage in `localStorage`**:
   - Uploading images via `<input type="file">` converts files into Base64 strings inside `localStorage` (~5 MB browser quota limit). High-resolution photos will quickly exceed storage quota and fail to persist. Production requires object storage (e.g., Vercel Blob, Cloudinary, or S3).
5. **No Automated Email Delivery**:
   - `Booking.tsx`, `Contact.tsx`, and `AdminModal.tsx` rely on `mailto:` links, which require the user's device to have a configured email app and manually hit Send.

### Secondary Issues & Repo Debt
6. **Unbundled Asset Paths in `src/data.ts`**:
   - Default images in `src/data.ts` use string paths like `'/src/assets/images/film_kigali_1785877521721.jpg'` rather than static ES imports or `/public/` paths. During `vite build`, Vite does not copy unimported `/src/assets/...` paths into `dist/`, which can cause broken default images in production builds.
7. **Unused Dependencies & Legacy Files**:
   - `package.json` includes unused backend/AI packages (`express`, `express-session`, `sql.js`, `ejs`, `multer`, `bcryptjs`, `@google/genai`, `@vercel/node`) and `.env.example` defines `SESSION_SECRET=`, none of which are imported by the React app.
   - `public/css/style.css` and `public/js/script.js` are leftover vanilla JS/CSS files from an earlier server-rendered (`POST /booking`, `POST /contact`) version and are not loaded by `index.html`.
8. **Minor UI / Data Gaps**:
   - `AdminModal.tsx` supports editing Films, but Photos only support Add and Delete (no Edit Photo flow).
   - `savePhoto` and `deletePhoto` in `src/data.ts` do not call `notifyContentChanged()` (unlike film/settings mutations), relying instead on `AdminModal`'s `onDataChanged` callback.
   - A few components still contain hardcoded fallback contact values (e.g., `Footer.tsx` lines 138–144, `Booking.tsx` line 149, `WhatsAppFloatingButton.tsx` line 10) instead of reading dynamically from `settings`.
   - Some `SiteSettings` fields (`heroTagline`, `studioName`, `creatorName`, `creatorRole`, `address`, `workingHours`, `whatsapp`, `profileImage`, `heroBg`) do not yet have edit inputs in `AdminModal.tsx`.

---

## 5. Project Directory Structure

```text
.
├── index.html                  # Vite HTML entry point (loads Google Fonts & /src/main.tsx)
├── package.json                # React 19, Vite 6, Tailwind v4 + unused legacy backend deps
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite + React + Tailwind v4 configuration
├── vercel.json                 # SPA rewrite rule (all routes -> /index.html)
├── .env.example                # Contains unused SESSION_SECRET=
├── public/                     # Unused legacy static CSS/JS from earlier EJS prototype
│   ├── css/style.css
│   └── js/script.js
└── src/
    ├── main.tsx                # React root mount
    ├── App.tsx                 # Hash router, global state, modals & layout shell
    ├── index.css               # Tailwind v4 import, light/dark CSS variables, marquee & glow styles
    ├── data.ts                 # TypeScript interfaces, seed data & localStorage CRUD layer
    ├── assets/images/          # Local JPG assets
    ├── utils/
    │   ├── theme.ts            # Light/Dark theme hook & cross-tab sync
    │   └── video.ts            # YouTube/Vimeo/iframe URL parser & thumbnail resolver
    ├── components/
    │   ├── AdminModal.tsx      # 6-tab Studio CMS portal
    │   ├── Footer.tsx          # Global footer
    │   ├── LightboxModal.tsx   # Fullscreen photography modal
    │   ├── MarqueeTicker.tsx   # Scrolling capabilities banner
    │   ├── Navbar.tsx          # Sticky glass navigation bar & dropdowns
    │   ├── VideoModal.tsx      # 16:9 trailer modal
    │   └── WhatsAppFloatingButton.tsx # Floating WhatsApp quick-chat widget
    └── pages/
        ├── About.tsx           # Biography, disciplines, gear list, Kigali HQ
        ├── Booking.tsx         # Package selector & booking request form
        ├── Contact.tsx         # Studio coordinates, inquiry form & suggestion box
        ├── Films.tsx           # 7-sector filterable filmography
        ├── Home.tsx            # Landing page hero, sectors, featured films & photos
        └── Photography.tsx     # 6-category filterable photography gallery
```

---

## 6. Local Development & Build

### Prerequisites
- Node.js 18+ (Node 22 recommended)
- npm

### Commands
```bash
npm install      # Install dependencies
npm run dev      # Start Vite dev server on http://0.0.0.0:3000
npm run lint     # Type-check with TypeScript (tsc --noEmit)
npm run build    # Build production static bundle into dist/
```

---

## 7. Roadmap to Make This Production-Ready (Multi-User / Shared Database)

For any developer or AI migrating this app from `localStorage` to a real shared backend (such as **Neon PostgreSQL + Vercel**):

1. **Provision a Dedicated Database**: Create a dedicated Neon PostgreSQL database for Wesley Studio (do not share a database or schema with unrelated applications).
2. **Add Backend API Routes**: Create Vercel Serverless Functions (`/api/films.ts`, `/api/photos.ts`, `/api/services.ts`, `/api/settings.ts`, `/api/bookings.ts`, `/api/messages.ts`, `/api/suggestions.ts`, `/api/auth/login.ts`) or a full-stack server connecting via `process.env.DATABASE_URL` (server-side only — never expose `DATABASE_URL` with a `VITE_` prefix).
3. **Replace `localStorage` in `src/data.ts`**: Convert synchronous `getStored*` / `save*` helpers into async `fetch('/api/...')` calls and manage loading/error states in page components and `AdminModal.tsx`.
4. **Secure Admin Auth**: Move password verification to `/api/auth/login` using hashed passwords (`bcryptjs`) and `HttpOnly` signed session/JWT cookies; remove the hardcoded credential hint from `AdminModal.tsx`.
5. **Move Media Uploads to Object Storage**: Replace `FileReader` Base64 storage with uploads to Vercel Blob, Cloudinary, or S3, storing only the resulting CDN URL in PostgreSQL.
6. **Add Server-Side Email Delivery**: Integrate Resend, Nodemailer, or SendGrid in `/api/bookings`, `/api/messages`, and `/api/suggestions` so notifications send automatically without relying on `mailto:`.
7. **Fix Bundled Default Images**: Import local images from `src/assets/images/` via ES module imports (or move them into `public/images/`) so `vite build` includes them in `dist/`.
