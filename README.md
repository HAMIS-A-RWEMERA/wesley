# 🎬 WESLEY STUDIO — African Cinema & Fine Art Platform

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Deployment_Ready-000000?logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-gold.svg)](LICENSE)

A high-performance cinematic portfolio and studio management platform engineered for **Director Wesley**, an acclaimed filmmaker and fine-art visual storyteller based in Kigali, Rwanda. 

Combining an ultra-luxury dark obsidian aesthetic with an in-browser Content Management System (CMS), interactive film and photo galleries, instant WhatsApp concierge, and an end-to-end booking dispatch system.

---

## 🌟 Live Demo & Preview

- **Production URL**: [https://wesley-rho.vercel.app](https://wesley-rho.vercel.app)
- **Official Contact**: `+250 792 087 787` (Kigali, Rwanda)
- **Studio Email**: `rwemera30@gmail.com`

---

## 🚀 Key Features & Highlights

### 1. 🎥 Cinema Productions & Interactive Video Modal
- **Cinematic Film Showcase**: Displays documentary films, narrative dramas, commercials, and fine-art video projects.
- **Embedded Theater Modal**: Responsive 16:9 trailer playback supporting YouTube, Vimeo, and custom stream embeds.
- **Festival Laurels & Accolades**: Dedicated metadata ribbons showcasing official selections (FESPACO, Durban Int. Film Festival, Silicon Valley African Film Festival).

### 2. 📸 Fine-Art Landscape & Portrait Galleries
- **Curated Collections**: High-resolution photography captured across East Africa (Lake Kivu, Musanze Volcanoes, Kigali Cityscape, Cultural Fine-Art).
- **Interactive Lightbox Modal**: High-definition image view with EXIF details, shooting locations, and smooth keyboard/backdrop closing.
- **Instant Category Filtering**: Filter between landscapes and intimate editorial portraits effortlessly.

### 3. 📅 Interactive Booking & Scheduling Engine
- **Session Reservations**: Clients can book Portrait Sessions, Commercial Shoots, or Full Documentary Production Crews.
- **Real-Time Calendar & Slots**: Custom time slots and location presets across Rwanda and East Africa.
- **Dual Notification Flow**:
  - Automatically records the booking in the Studio CMS with a unique reference number (e.g., `BK-8492`).
  - Automatically prepares an email draft to Director Wesley with complete shoot specs, client contacts, and special requirements.

### 4. 💡 Studio Suggestion Box & Client Inquiries
- **Creative Collaboration Hub**: Dedicated suggestion box for film pitches, co-production opportunities, and website feedback.
- **Direct Email Forwarding**: Submissions are preserved in the CMS and routed directly to the studio inbox.

### 5. 💬 Instant WhatsApp Floating Concierge
- **Direct Rwandan WhatsApp Integration**: Connected to Director Wesley's verified number (`+250 792 087 787`).
- **Interactive Quick Prompts**: One-tap conversation starters for documentary inquiries, portrait sessions, and general greetings.
- **Pulse Status Indicator**: Displays real-time online availability with a dark-mode floating popup.

### 6. 🛡️ Comprehensive Studio CMS (Admin Management Portal)
Accessible directly via the lock icon or footer portal with secure credentials:
- **Unified Identity Architecture**: Changing the studio email updates:
  1. The **CMS Login Email** for authentication.
  2. The **Target Inbox** where bookings and suggestions are routed.
  3. The **Public Website** contact details in real-time.
- **Password Security Management**: Built-in credential updating with instant confirmation.
- **Live Content Editing**: Edit hero taglines, headlines, director artistic quotes, biography paragraphs, studio hours, and address without redeploying code.
- **Dynamic Pricing Editor**: Adjust package prices, durations, and inclusions in seconds.
- **Media Upload Manager**: Add new film productions and upload gallery photos directly from the browser (with native FileReader Base64 support and CDN URL inputs).
- **Director Decision Dispatcher**: Review pending bookings, click **Accept** or **Deny**, type a personalized director's note, and launch an email response to the client with one click.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** | Latest modern React with cutting-edge state primitives and concurrent rendering |
| **Language** | **TypeScript 5.8** | 100% strict type safety across all models, interfaces, and state handlers |
| **Build Tool** | **Vite 6** | Sub-second HMR and optimized tree-shaken static production builds |
| **Styling** | **Tailwind CSS v4** | Modern utility-first styling with zero runtime overhead |
| **Icons** | **Lucide React** | Lightweight, tree-shakeable SVG icons |
| **Typography** | **Cinzel & Plus Jakarta Sans** | Classical serif grandeur paired with ultra-clean modern legibility |
| **Data Layer** | **Reactive LocalStorage Engine** | Zero-latency client persistence with production seed data fallbacks |
| **Hosting Platform** | **Vercel** | Optimized as a pure Single-Page Application (SPA) eliminating cold-starts |

---

## 📂 Project Directory Structure

```text
wesley-website/
├── public/                     # Static assets, favicons, robots.txt
├── src/
│   ├── assets/                 # High-resolution film posters & photography
│   │   └── images/
│   ├── components/             # Reusable UI components
│   │   ├── AdminModal.tsx      # Studio CMS dashboard & content editor
│   │   ├── Footer.tsx          # Cinematic footer with quick links & CMS trigger
│   │   ├── LightboxModal.tsx   # Fullscreen photo lightbox
│   │   ├── Navbar.tsx          # Responsive navigation header
│   │   ├── VideoModal.tsx      # Cinematic 16:9 trailer player modal
│   │   └── WhatsAppFloatingButton.tsx # Interactive WhatsApp quick-chat
│   ├── pages/                  # Route view components
│   │   ├── About.tsx           # Biography, artist statement & gear loadout
│   │   ├── Booking.tsx         # Reservation form & quotation calculator
│   │   ├── Contact.tsx         # Direct contact details & suggestion box
│   │   ├── Films.tsx           # Complete documentary & narrative filmography
│   │   ├── Home.tsx            # Cinematic hero, featured works & testimonials
│   │   ├── Landscape.tsx       # East African landscape photography gallery
│   │   └── Portrait.tsx        # Cultural and editorial portraiture gallery
│   ├── App.tsx                 # Core application router & modal state manager
│   ├── data.ts                 # Type definitions, seed data & storage layer
│   ├── index.css               # Global Tailwind CSS v4 styling rules
│   └── main.tsx                # React 19 application entry point
├── index.html                  # HTML entry point with rich SEO & OpenGraph tags
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript compiler configuration
├── vercel.json                 # Vercel SPA routing and cache configuration
└── vite.config.ts              # Vite build setup with Tailwind CSS v4 plugin
```

---

## ⚡ Getting Started Locally

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** or **bun** / **yarn**

### 1. Clone the repository
```bash
git clone https://github.com/HAMIS-A-RWEMERA/wesley-website.git
cd wesley-website
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` to explore the website.

### 4. Build for production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory.

---

## 🔐 CMS Access & Credentials

To access the studio management portal:
1. Click the **CMS Portal / Lock Icon** in the navigation bar or footer.
2. Enter the active studio credentials:
   - **Email**: `rwemera30@gmail.com` *(or the custom email configured in the CMS)*
   - **Password**: `wesley2026!` *(can be updated anytime inside the CMS)*
3. From the dashboard, manage bookings, review client suggestions, edit prices, upload works, and update website copy in real time.

---

## 🌐 Deploying to Vercel

This repository is pre-configured for one-click deployment on **Vercel**:
1. Push your changes to GitHub.
2. Import the repository into your Vercel Dashboard.
3. Keep the default settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy! Vercel will instantly distribute the application across its global edge network.

---

## 👨‍💻 Engineering Highlights & Portfolio Showcase

This project demonstrates core competencies in modern full-stack web engineering:
- **Design System Architecture**: Translating luxury branding into responsive UI using Tailwind CSS v4, custom CSS filters, and responsive typography.
- **Client-Side State Management**: Architecting reactive storage layers with automatic synchronization across isolated components.
- **Human-Centric UX Flows**: Streamlining booking inquiries and suggestions with immediate client feedback and zero-barrier contact options (WhatsApp / Mailto).
- **Production Resilience**: Eliminating single-point-of-failure database dependencies for frontend portfolios, guaranteeing 100% uptime on static CDNs.

---

## 📄 License

This project is licensed under the MIT License — feel free to explore, learn from, and adapt the code for your own creative portfolios.
