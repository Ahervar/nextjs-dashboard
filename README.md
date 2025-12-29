# Next.js Frontend Assessment

A modern, responsive admin dashboard built as a technical assessment. This application features authentication, role-based routing, and complex state management, focusing on pixel-perfect design and responsive layouts.

## 🚀 Key Features

* **Landing Page**: A custom-designed "Hero" entry page with glassmorphism effects and modern typography.
* **Authentication**: Secure admin login using NextAuth.js (integrated with DummyJSON Auth).
* **Dashboard**: Protected routes for managing Users and Products.
* **Data Visualization**:
    * **Uniform Card Layouts**: Custom Flexbox implementation to ensure 100% consistent card heights and alignment across all devices.
    * **Advanced Filtering**: Real-time search and category filtering for products.
    * **Pagination**: Server-side style pagination handling.
* **State Management**: Centralized store using **Zustand** for performant, non-blocking data updates.

## 🛠️ Tech Stack

* **Framework**: Next.js 14 (App Router)
* **Language**: TypeScript
* **UI Library**: Material UI (MUI)
* **State Management**: Zustand
* **Auth**: NextAuth.js
* **Data Source**: DummyJSON API

---

## 🏗️ Technical Decisions

### 1. State Management (Zustand)
I chose **Zustand** over Redux or Context API to minimize boilerplate and prevent unnecessary re-renders. It handles the async data fetching for Users and Products efficiently, caching data in memory for a snappy user experience.

### 2. Layout & Responsiveness
To solve common layout instability issues where cards have different heights based on content:
* I implemented a **strict Flexbox architecture** using MUI's `Box` component instead of the standard Grid v2 (to avoid version conflicts).
* Cards enforce **fixed vertical dimensions** with text truncation, ensuring a polished, uniform look regardless of the data length.
* The layout seamlessly adapts from a single column on mobile to a 3-column grid on desktop.

---

## ⚙️ Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Ahervar/nextjs-dashboard.git](https://github.com/Ahervar/nextjs-dashboard.git)
    cd nextjs-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the app:**
    Visit [http://localhost:3000](http://localhost:3000)

## 🔐 Test Credentials

To log in to the admin dashboard, use these standard DummyJSON credentials:

* **Username:** `emilys`
* **Password:** `emilyspass`

---

## 📂 Folder Structure

* `src/app`: App Router pages (Login, Dashboard, Landing Page).
* `src/components`: Reusable UI wrappers (AuthSync, ThemeRegistry).
* `src/store`: Zustand store definition (`useStore.ts`) handling all API logic.