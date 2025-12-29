# Next.js Frontend Assessment

This is a modern, responsive web application built as a technical assessment. It features authentication, data visualization, and complex state management using **Next.js (App Router)**, **Material UI (MUI)**, and **Zustand**.

## 🚀 Features

* **Authentication**: Admin login using NextAuth.js credentials provider (integrated with DummyJSON Auth).
* **State Management**: Centralized store using **Zustand** for managing auth, users, and products.
* **Data Fetching**: Async actions for server-side pagination, search, and category filtering.
* **UI/UX**: Fully responsive layout using Material UI v5.
    * Grid layouts for data presentation.
    * Detail views for individual users and products.
    * Real-time search and filtering.
* **Performance**: 
    * Client-side caching via Zustand (prevents re-fetching data unnecessarily).
    * Server-Side Rendering (SSR) compatibility with MUI's AppRouterCacheProvider.

## 🛠️ Tech Stack

* **Framework**: Next.js 14 (App Router)
* **UI Library**: Material UI (MUI)
* **State Management**: Zustand
* **Authentication**: NextAuth.js
* **Language**: TypeScript
* **API**: [DummyJSON](https://dummyjson.com/)

---

## 🏗️ Architecture Decisions

### Why Zustand?
I chose **Zustand** over Redux or Context API for this specific assessment because:
1.  **Simplicity**: It requires significantly less boilerplate than Redux.
2.  **Performance**: It solves the "zombie child" and excessive re-render issues inherent in standard React Context.
3.  **Async Handling**: Async actions (like API calls) are first-class citizens in Zustand, allowing me to keep the UI components clean and logic-free.

### Client-Side Caching Strategy
The Zustand store persists the `users` and `products` arrays in memory during the session. When navigating between the List View and Detail View, the app does not need to re-fetch the main list immediately, providing a snappy, app-like experience.

---

## ⚙️ Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Ahervar/my-assessment-app.git](https://github.com/Ahervar/my-assessment-app.git)
    cd my-assessment-app
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

## 🔐 Credentials

To log in to the admin dashboard, use the standard DummyJSON users:

* **Username:** `emilys`
* **Password:** `emilyspass`

---

## 📂 Folder Structure

* `src/app`: App Router pages and layouts.
* `src/components`: Reusable UI components (AuthSync, ThemeRegistry).
* `src/store`: Zustand store definition (`useStore.ts`).
* `src/theme`: MUI theme configuration.