# 🍕 Bariis & Pizza House — Full MERN Stack Ordering System

A complete, production-ready restaurant ordering system with Next.js 15 frontend and Express/MongoDB backend.

---

## 📁 Project Structure

```
bariis-pizza/          ← Next.js 15 Frontend (your existing site + new features)
bariis-backend/        ← Express + MongoDB Backend API
```

---

## ✨ Features Added

### Frontend (Next.js)
| Feature | Details |
|---|---|
| 🛒 Cart Context | Global state via React Context + useReducer, persisted in localStorage |
| 🗂 Slide Cart Drawer | Framer Motion slide-in with quantity controls, remove, price totals |
| 🛍 Add to Cart | Every pizza (with size picker) + every simple item has Add to Cart |
| 💳 Checkout Page | Full form — name, phone, email, pickup/delivery, address, payment |
| ✅ Order Submission | Posts to backend API; graceful demo-mode fallback if backend is down |
| 📊 Admin Dashboard | Stats cards, recent orders, top items chart |
| 🧾 Admin Orders | Full list with status filter, detail drawer, one-click status update |
| 🍕 Admin Menu CRUD | Add/edit/delete items, toggle availability, Cloudinary image upload |
| 📋 Admin Leads | Customer inquiries, mark contacted, timestamps |
| 🔐 JWT Auth | Secure admin login; token stored in localStorage; protected routes |

### Backend (Express + MongoDB)
| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/api/orders` | POST | Public | Place a new order |
| `/api/orders/:id` | GET | Public | Get order status |
| `/api/menu` | GET | Public | Get available menu items |
| `/api/leads` | POST | Public | Submit contact/lead form |
| `/api/admin/login` | POST | — | Admin login → JWT |
| `/api/admin/stats` | GET | 🔒 | Analytics dashboard data |
| `/api/admin/orders` | GET | 🔒 | All orders (paginated, filterable) |
| `/api/admin/orders/:id/status` | PATCH | 🔒 | Update order status |
| `/api/admin/menu` | GET/POST | 🔒 | List / create menu items |
| `/api/admin/menu/:id` | PUT/PATCH/DELETE | 🔒 | Update / delete menu item |
| `/api/admin/menu/:id/image` | POST | 🔒 | Upload image via Cloudinary |
| `/api/admin/leads` | GET | 🔒 | All leads |
| `/api/admin/leads/:id` | PATCH/DELETE | 🔒 | Update / delete lead |

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd bariis-backend

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, Cloudinary keys
nano .env

# Seed database (creates admin user + sample data)
npm run seed

# Start development server
npm run dev
# → API running at http://localhost:4000
```

### 2. Frontend Setup

```bash
cd bariis-pizza

# Install dependencies
npm install

# Create .env.local (already included)
# NEXT_PUBLIC_API_URL=http://localhost:4000

# Start development server
npm run dev
# → Site running at http://localhost:3000
```

---

## 🔐 Admin Access

Default credentials (change after first login!):

| Field | Value |
|---|---|
| URL | `http://localhost:3000/admin` |
| Email | `admin@bariis.com` |
| Password | `admin123` |

> **Demo mode:** The admin panel works even without a backend — it uses hardcoded demo data as fallback.

---

## 🗄 MongoDB Setup

### Option A: Local MongoDB
```bash
# macOS
brew install mongodb-community && brew services start mongodb-community

# Ubuntu
sudo apt install mongodb && sudo service mongodb start
```

### Option B: MongoDB Atlas (Free Cloud)
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free cluster
3. Get your connection string
4. Set `MONGODB_URI=mongodb+srv://...` in `.env`

---

## ☁️ Cloudinary Setup (Image Uploads)

1. Sign up at [cloudinary.com](https://cloudinary.com) (free tier)
2. Get your Cloud Name, API Key, API Secret from the dashboard
3. Add to `bariis-backend/.env`:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🏗 Production Deployment

### Frontend → Vercel
```bash
cd bariis-pizza
npx vercel --prod
# Set NEXT_PUBLIC_API_URL to your backend URL in Vercel environment variables
```

### Backend → Railway / Render / Fly.io
```bash
cd bariis-backend
# Push to GitHub, connect to Railway/Render
# Set environment variables in platform dashboard
```

---

## 📂 Key Files Reference

### Frontend
```
src/
├── context/
│   └── CartContext.tsx          ← Cart state (add/remove/qty/persist)
├── components/
│   ├── cart/
│   │   ├── CartButton.tsx       ← Header cart icon with badge
│   │   └── CartDrawer.tsx       ← Slide-in cart panel
│   ├── checkout/
│   │   └── CheckoutPageClient.tsx ← Full checkout form
│   ├── admin/
│   │   ├── AdminShell.tsx       ← Sidebar layout for admin
│   │   ├── AdminLoginClient.tsx ← JWT login form
│   │   ├── AdminDashboardClient.tsx ← Stats + charts
│   │   ├── AdminOrdersClient.tsx ← Orders + status management
│   │   ├── AdminMenuClient.tsx  ← Menu CRUD
│   │   └── AdminLeadsClient.tsx ← Customer leads
│   └── MenuCard.tsx             ← Updated with Add to Cart
├── lib/
│   └── format.ts                ← formatCurrency util
└── app/
    ├── checkout/page.tsx
    └── admin/
        ├── login/page.tsx
        ├── dashboard/page.tsx
        ├── orders/page.tsx
        ├── menu/page.tsx
        └── leads/page.tsx
```

### Backend
```
src/
├── server.js          ← Express app entry point
├── seed.js            ← DB seed script
├── models/
│   ├── Order.js       ← Order schema + indexes
│   ├── Admin.js       ← Admin user + bcrypt
│   ├── MenuItem.js    ← Menu item schema
│   └── Lead.js        ← Customer lead schema
├── routes/
│   ├── orders.js      ← Public order routes
│   ├── leads.js       ← Public contact routes
│   └── admin.js       ← Protected admin routes (auth + CRUD)
└── middleware/
    ├── auth.js        ← JWT verification middleware
    └── upload.js      ← Cloudinary multer middleware
```

---

## 🎨 Design System

All existing styles preserved. New components use the same tokens:
- `text-gold` / `border-gold` / `bg-gold` — gold accent (#c99a3a)
- `text-cream` — off-white text (#f6e8c8)
- `bg-charcoal` — dark card backgrounds
- `font-display` — Cinzel serif for headings
- `ribbon-red` — red CTA button class
- Framer Motion for all animations (slide, fade, spring)

---

## 🔧 Customization

### Change admin password
```bash
cd bariis-backend
node -e "
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');
mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await Admin.findOneAndUpdate(
    { email: 'admin@bariis.com' },
    { password: 'your_new_password' }
  );
  console.log('Password updated');
  process.exit(0);
});
"
```

### Add a new admin
Edit `src/seed.js` or use the API with an existing JWT token.

### Change tax rate
Edit `CheckoutPageClient.tsx` line: `const tax = totalPrice * 0.13;`

---

Built with ❤️ for Bariis & Pizza House, Georgetown ON 🇨🇦
