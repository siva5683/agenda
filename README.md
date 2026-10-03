# 🍔 FoodHub — Modern Food Ordering Platform

[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-black?logo=express&logoColor=white)](https://expressjs.com/)
[![Google_GenAI](https://img.shields.io/badge/Google_GenAI-Gemini_3_Pro-ea4335?logo=google&logoColor=white)](https://ai.google.dev/)

A modern, responsive full-stack **food ordering and delivery web application** built with React, TypeScript, Tailwind CSS, Express, and Google Gemini GenAI. Featuring authentic Indian and international menus in **₹ (INR)**, a dynamic cart with coupon discounts, 3-step checkout, real-time visual 5-stage order tracking, an admin control center, and an **AI Dish Studio** to generate studio-quality food photography.

---

## 🚀 Key Features

### 1. 🏠 Homepage
- Food-themed hero section: **“Delicious Food, Delivered to Your Door”**.
- CTA buttons: **Order Now** and **Explore Menu** with live metrics.
- Popular food category showcase, featured dishes, best-sellers, customer testimonials, and special discount vouchers.
- Comprehensive footer with city hubs (Bengaluru, Mumbai, Delhi, Hyderabad), contact support, and newsletter subscription.

### 2. 🧭 Responsive Navigation Bar
- Responsive navbar with mobile hamburger drawer.
- Live keyword search across dish names, ingredients, and categories.
- Real-time shopping cart badge with total price counter.
- User profile & authentication dropdown.

### 3. 🍽️ Complete Food Menu
- Category filters: **All**, **Pizza**, **Burgers**, **Indian**, **Chinese**, **Desserts**, **Drinks**, **Snacks**.
- Dietary toggles: **Pure Veg** 🟢 and **Non-Veg** 🔴.
- Sort by: **Popular First**, **Top Rated ★**, **Price: Low to High**, **Price: High to Low**.
- Food cards with preparation time, ratings, reviews count, favorite toggle, and quick add-to-cart.

### 4. 🔍 Dish Details Modal
- Large high-resolution photography.
- Detailed ingredients, preparation time, spice level, and calorie metrics.
- Customizable add-ons (extra cheese, dips, gravies, beverages) with live price updates.
- Special chef cooking instructions textarea.

### 5. 🛒 Shopping Cart
- Slideover drawer with quantity adjustment and item removal.
- Free delivery progress goal bar (unlocks at ₹499).
- Promo code application (`FIRST20`, `BOGO`, `FREEDEL`, `WEEKEND50`) with instant savings.
- Clear bill breakdown: Subtotal, Restaurant GST (5%), Delivery Fee, and Grand Total.

### 6. 💳 Checkout & Payment System
- Customer address management (supports pre-saved addresses and custom addresses).
- Delivery instructions for the rider.
- Payment options:
  - **Instant UPI** (Google Pay, PhonePe, Paytm, BHIM with ID validation)
  - **Credit / Debit Card** (Visa, MasterCard, RuPay mock processor)
  - **Cash on Delivery**
- Places order and routes directly to the live order tracker.

### 7. 📍 5-Stage Visual Order Tracking
- Real-time step progress indicator:
  1. **Order Placed**
  2. **Order Confirmed**
  3. **Food Being Prepared**
  4. **Out for Delivery**
  5. **Delivered**
- Interactive **"Simulate Next Step"** button for testing and demonstration.
- Delivery hero card (Rider name, photo, vehicle number, rating, direct call button).
- Simulated live GPS satellite map tracking.

### 8. 👤 User Authentication & Profile
- Sign In, Registration, and Forgot Password modals with **1-Click Demo Login**.
- Profile management: Reward points, saved delivery addresses, order history, and re-order button.
- Saved favorite dishes collection.

### 9. 🏷️ Offers & Promotional Vouchers
- Discount cards with copyable promo codes and 1-click cart application.
- Expiration dates and terms explanation.

### 10. 🛡️ Admin Dashboard
- Live sales statistics: Total Revenue (₹), Completed Orders, Active Customers, Average Order Value (AOV).
- Dish Catalog Manager: Add, edit, delete dishes, and toggle kitchen in-stock status.
- Live Order Status Dispatcher: Advancing status updates the customer's tracking screen instantly.
- Promo code creator and customer directory.

### 11. 🎨 AI Food Image & Dish Studio
- Powered by `@google/genai` on server-side.
- Select between `gemini-3-pro-image-preview` (Studio Pro) and `gemini-3.1-flash-image-preview` (Ultra Fast).
- Affordances for **Image Size**: `1K`, `2K`, and `4K`.
- Affordances for **Aspect Ratio**: `1:1`, `2:3`, `3:2`, `3:4`, `4:3`, `9:16`, `16:9`, and `21:9`.
- **"Publish to FoodHub Menu"**: Adds generated dishes straight into the live restaurant menu.

---

## 📁 Repository File Structure

```text
foodhub/
├── .env.example                     # Environment variables template
├── .gitignore                       # Ignored build artifacts & node_modules
├── index.html                       # HTML5 entry point with SEO metadata
├── metadata.json                    # Project configuration & major capabilities
├── package.json                     # NPM packages & scripts
├── README.md                        # Documentation & setup guide
├── server.ts                        # Full-stack Express server with Gemini API routes
├── tsconfig.json                    # TypeScript compiler configuration
├── vite.config.ts                   # Vite configuration
└── src/
    ├── main.tsx                     # React application entry point
    ├── App.tsx                      # App router, modals & toast notifications
    ├── index.css                    # Tailwind CSS v4 styling & typography layers
    ├── types/
    │   └── index.ts                 # TypeScript data contracts & models
    ├── data/
    │   └── sampleData.ts            # Realistic Indian dishes, coupons, orders & reviews
    ├── context/
    │   └── AppContext.tsx           # Global state manager (Cart, Auth, Orders, Menu)
    ├── components/
    │   ├── Navbar.tsx               # Responsive header, search bar & cart badge
    │   ├── Footer.tsx               # Footer with links, city hubs & newsletter
    │   ├── FoodCard.tsx             # Food card with veg/non-veg tags & cart actions
    │   ├── FoodDetailModal.tsx      # Dish modal with ingredients & add-on customizer
    │   ├── CartSlideover.tsx        # Slideout cart drawer with dynamic bill calculation
    │   └── AuthModal.tsx            # Login, register & forgot password modal
    └── pages/
        ├── HomePage.tsx             # Hero section, categories, bestsellers & reviews
        ├── MenuPage.tsx             # Filterable food menu with dietary switches & sort
        ├── CategoriesPage.tsx       # Dedicated category showcase
        ├── OffersPage.tsx           # Discount vouchers & copyable coupons
        ├── CheckoutPage.tsx         # Delivery form & payment method selector
        ├── OrderTrackingPage.tsx    # 5-step visual tracking & live rider simulator
        ├── UserProfilePage.tsx      # Order history, profile edit & saved favorites
        ├── AdminDashboard.tsx       # Menu management, analytics & order dispatcher
        ├── AiStudioPage.tsx         # AI dish image generator (1K/2K/4K, aspect ratios)
        ├── AboutPage.tsx            # Kitchen story, hygiene standards & chef team
        └── ContactPage.tsx          # Contact form, city hubs & 24/7 support lines
```

---

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ or 20+ recommended)
- `npm` or `pnpm` / `yarn`

### 1. Clone the repository
```bash
git clone https://github.com/<YOUR_USERNAME>/foodhub.git
cd foodhub
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```
Add your Google Gemini API key:
```env
GEMINI_API_KEY="your_gemini_api_key_here"
PORT=3000
```

### 4. Run the development server
```bash
npm run dev
```
The app will be running at [http://localhost:3000](http://localhost:3000).

### 5. Build for production
```bash
npm run build
npm start
```

---

## 🌿 How to Push to GitHub

If you are initializing a new GitHub repository:

```bash
# 1. Initialize git (if not already initialized)
git init

# 2. Stage all organized files
git add .

# 3. Commit your changes
git commit -m "feat: complete FoodHub food ordering platform with AI dish studio"

# 4. Set default branch to main
git branch -M main

# 5. Link your GitHub remote repository
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO_NAME>.git

# 6. Push to GitHub
git push -u origin main
```

---

## 📄 License
This project is licensed under the Apache-2.0 License.
