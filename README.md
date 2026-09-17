# 🚀 Techcorp — Enterprise-Grade Next-Gen E-Commerce Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript%205-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

**A high-performance, resilient, full-stack e-commerce experience crafted with Next.js 16 (App Router), React 19, Tailwind CSS v4, and Express REST API.**

[Key Features](#-key-features) • [UI Showcase](#-visual-showcase) • [Technology Rationale](#-technical-stack--architectural-rationale) • [Getting Started](#-getting-started--local-development) • [Deployment](#-deployment-guide)

</div>

---

## 📸 Visual Showcase

Captured directly from the live application environment:

### 1. Storefront & Featured Carousel
*Dark aesthetic with glassmorphic accents, gradient dynamic headers, and responsive category showcases.*
![Techcorp Home Showcase](docs/images/home.png)

---

### 2. Product Catalog with Dynamic Filtering
*Instant keyword search, category facets, real-time price & rating sorting with zero lag.*
![Techcorp Products Catalog](docs/images/products.png)

---

### 3. Detailed Product View & Hardware Specifications
*Multi-angle gallery, high-res previews, stock counters, and comprehensive hardware spec tables.*
![Techcorp Product Details](docs/images/product-detail.png)

---

### 4. Interactive Cart & Real-Time Checkout Pipeline
*Instant client-side synchronization with localStorage, asynchronous API syncing, dynamic tax and shipping calculations.*
![Techcorp Shopping Cart](docs/images/cart.png)

---

## 🌟 Key Features

- ⚡ **Next.js 16 & React 19 Core:** Optimized Server-Side Rendering (SSR) and Client Components with React 19 concurrent capabilities.
- 🎨 **Modern Glassmorphism UI:** Built from the ground up using **Tailwind CSS v4** without external CSS bloat.
- 🛡️ **Fault-Tolerant Hybrid Data Engine:** Built-in resilient fallback mechanism ensuring that the client continues working seamlessly with built-in mock data even if the MongoDB database or backend service is offline.
- 🛒 **Optimistic Cart State Management:** `CartContext` architecture supporting seamless offline/online state synchronization across browser tabs via `localStorage` and backend persistence.
- 🔍 **URL-Driven Filtering & Search:** Search queries, category selections, and sorting options reflect directly in URL search parameters for shareable states and SEO compatibility.
- 📱 **Fully Responsive Layout:** Pixel-perfect user experience designed for mobile devices, tablets, laptops, and ultra-wide displays.

---

## 🛠️ Technical Stack & Architectural Rationale

Why were these specific technologies selected?

### 1. Frontend Architecture

| Technology | Version | Architectural Decision & Rationale |
| :--- | :--- | :--- |
| **Next.js (App Router)** | `v16.3.5` | Provides best-in-class Server-Side Rendering (SSR) for SEO, Turbopack for rapid compilation, and native Vercel deployment support. |
| **React** | `v19.2.8` | Utilizes latest hydration optimizations, concurrent transitions, and clean hook structures. |
| **Tailwind CSS** | `v4.0` | Ultra-fast JIT engine with modern CSS variable tokens, enabling consistent glassmorphic dark-mode aesthetics with zero runtime cost. |
| **TypeScript** | `v5.x` | Strict type safety for data models (`Product`, `CartItem`, API responses), mitigating runtime errors and accelerating refactoring. |
| **Lucide React** | `^1.46.0` | Lightweight, consistent SVG icon set optimized for modern web interfaces. |

### 2. Backend & Persistence Layer

| Technology | Version | Architectural Decision & Rationale |
| :--- | :--- | :--- |
| **Node.js & Express.js** | `v5.x` | Minimalist, non-blocking asynchronous RESTful API framework providing clean endpoint segregation. |
| **MongoDB & Mongoose** | `v9.x` | NoSQL document store perfectly suited for nested e-commerce product structures (technical specs, feature lists, varied attributes). |
| **CORS & Dotenv** | `Latest` | Enterprise-standard cross-origin resource sharing policies and secure environment variable separation. |

### 3. Developer Experience (DX)

- **Concurrently:** Orchestrates both frontend and backend dev servers concurrently through a single terminal command (`npm run dev`).
- **Resilient Fallback Engine:** Allows front-end contributors to develop and test UI features immediately without requiring a local MongoDB instance.

---

## 📂 Monorepo Project Structure

```text
TechcorpE-ticaret/
├── client/                     # Next.js 16 Web Application
│   ├── src/
│   │   ├── app/                # App Router Routes & Pages
│   │   │   ├── page.tsx        # Storefront Homepage
│   │   │   ├── products/       # Products Catalog & Dynamic Search
│   │   │   │   └── [id]/       # Dynamic Product Specification Page
│   │   │   ├── cart/           # Shopping Cart Page
│   │   │   ├── about/          # About Us Page
│   │   │   └── contact/        # Contact & Support Page
│   │   ├── components/         # Modular UI Components (Navbar, Footer, ProductCard, Toast)
│   │   ├── context/            # Global State Management (CartContext)
│   │   ├── lib/                # API Client & Resilient Offline Data Fallbacks
│   │   └── types/              # Domain TypeScript Declarations
│   └── package.json
│
├── server/                     # Express.js RESTful API Backend
│   ├── config/                 # Database Configuration (db.js)
│   ├── controllers/            # Route Controllers (productController, cartController)
│   ├── models/                 # Mongoose Schemas (Product, Cart)
│   ├── routes/                 # REST Route Definitions (/api/products, /api/cart)
│   ├── seeds/                  # Seed Script & Mock Data (seed.js)
│   ├── server.js               # Express Application Server Entrypoint
│   └── package.json
│
├── docs/                       # Architecture & Documentation Assets
│   └── images/                 # High-Resolution UI Showcase Screenshots
├── package.json                # Monorepo Concurrently Orchestrator
└── README.md
```

---

## 💻 Getting Started & Local Development

### Prerequisites
- **Node.js**: `v18.18.0` or higher
- **npm**: `v9.0.0` or higher
- *(Optional)* Local **MongoDB** instance or a **MongoDB Atlas** cluster URI

### 1. Clone the Repository
```bash
git clone https://github.com/cladiusweb/techcorp-e-commerce.git
cd techcorp-e-commerce
```

### 2. Install Dependencies
Install dependencies for root orchestrator, frontend client, and backend server:
```bash
# Install root orchestrator packages
npm install

# Install client packages
npm install --prefix client

# Install server packages
npm install --prefix server
```

### 3. Configure Environment Variables (Optional)
- `client/.env.local`:
  ```env
  NEXT_PUBLIC_API_URL=http://localhost:5000/api
  ```
- `server/.env`:
  ```env
  PORT=5000
  MONGODB_URI=mongodb://127.0.0.1:27017/techcorp
  ```

### 4. Run Development Servers
Start both the **Next.js Client** and the **Express REST API** with a single command:
```bash
npm run dev
```

- **Frontend Application:** [http://localhost:3000](http://localhost:3000)
- **Backend API Health:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

*(Optional: Seed your MongoDB database with sample catalog items: `npm run seed`)*

---

## 🚀 Deployment Guide

### Deploying Frontend to Vercel
1. Import the repository at [vercel.com/new](https://vercel.com/new).
2. Set **Root Directory** to `client`.
3. Framework Preset will automatically detect **Next.js**.
4. Configure Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Your live backend API endpoint (e.g., `https://api.techcorp.com/api`).
5. Click **Deploy**.

### Deploying Backend to Render / Railway
1. Create a new **Web Service** on [Render.com](https://render.com) or [Railway.app](https://railway.app).
2. Set **Root Directory** to `server`.
3. Set **Build Command** to `npm install` and **Start Command** to `node server.js`.
4. Add Environment Variables:
   - `MONGODB_URI`: Connection string from MongoDB Atlas.
   - `PORT`: `5000`

---

## 👨‍💻 Author & Contributions

Engineered to showcase modern full-stack application development, resilient software design, and scalable frontend UI patterns.

- **Author:** [@cladiusweb](https://github.com/cladiusweb)
- **Contributions:** Contributions and feedback are welcome. Feel free to submit a Pull Request or open an Issue.

---

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).
