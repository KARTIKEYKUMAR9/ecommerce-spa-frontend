# 🛒 E-Commerce SPA (MERN Stack)

A full-stack single page e-commerce web application built with the **MERN stack**.  
Users can browse products, filter by category and price, and add items to a shopping cart.  
The app has a clean, responsive UI and demonstrates both frontend and backend integration.

---

## 🚀 Live Demo

- **Frontend (Vercel):** [Live Website](https://ecommerce-spa-frontend.vercel.app/)  
- **Backend (Render):** [API Server](https://ecommerce-spa-backend.onrender.com)  
- **GitHub Repository:** [Source Code](https://github.com/KARTIKEYKUMAR9/ecommerce-spa-backend  &&  https://github.com/KARTIKEYKUMAR9/ecommerce-spa-frontend)

---

## ✨ Features

- Browse all products with images, categories, and prices  
- Filter products by **category** and **price range**  
- Add to Cart with persistent storage (localStorage + backend support)  
- View and remove items from Cart  
- Fully responsive design with **Tailwind CSS**  
- REST API built with **Express + MongoDB**  

---

## 🛠️ Tech Stack

**Frontend**  
- React (Vite)  
- Tailwind CSS  
- Axios for API calls  

**Backend**  
- Node.js + Express  
- MongoDB (Mongoose ODM)  
- JWT Authentication (for protected routes)  

**Deployment**  
- Vercel (Frontend)  
- Render (Backend)  

---

## 📂 Project Structure

```
ecommerce-spa/
 ├── backend/         # Express + MongoDB API
 │   ├── models/      # Mongoose models
 │   ├── routes/      # API routes (items, cart, auth, etc.)
 │   ├── server.js    # Main entry point
 │   └── .env         # Environment variables
 │
 ├── frontend/        # React (Vite) app
 │   ├── src/
 │   │   ├── pages/   # Pages (Listing, Cart, etc.)
 │   │   ├── components/
 |   |   └── api.js   # API config  
 │   │   
 │   ├── index.css
 │   └── vite.config.js
 │
 └── README.md        # Project documentation
```

---

## ⚙️ Installation & Setup (For Local Development)

1. **Clone the repo**
   ```bash
   git clone https://github.com/KARTIKEYKUMAR9/ecommerce-spa-backend.git
   git clone https://github.com/KARTIKEYKUMAR9/ecommerce-spa-frontend.git
   cd ecommerce-spa
   ```

2. **Backend setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file inside `backend/`:
   ```env
   PORT=5000
   MONGO_URI=MongoDB_Atlas_Connection_String
   JWT_SECRET=secret-key
   ```

   Start backend:
   ```bash
   npm start
   ```

3. **Frontend setup**
   ```bash
   cd frontend
   npm install
   ```
   Create a `.env` file inside `frontend/`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

   Start frontend:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:5173`

---

## 📌 Notes

- If backend is offline (free Render hosting may sleep), product categories will fall back to defaults.  
- Cart data is stored in **localStorage** for guests, and synced with backend when logged in.  

---

## 👨‍💻 Author

Developed by KARTIKEY KUMAR  
For assignment submission – Web Developer position.
