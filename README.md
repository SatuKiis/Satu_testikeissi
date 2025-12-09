# 📦 Inventory Management System

A modern, full-stack web application for managing retail store inventory. Built with React, Express, and SQLite.

## Features

- 📋 Browse all products in a beautiful card-based layout
- ➕ Add new products with detailed information
- 🗑️ Delete products with confirmation
- 🔢 Update product quantities inline
- 🎨 Modern, responsive UI with Tailwind CSS
- 💾 Local SQLite database with 20 pre-populated products
- 🔄 Real-time inventory status indicators (In Stock, Low Stock, Out of Stock)

## Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS

**Backend:**
- Node.js
- Express
- SQLite with better-sqlite3

## Prerequisites

- Node.js (v18 or higher)
- npm

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Satu_testikeissi
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

## Running the Application

### Option 1: Run both servers separately

**Terminal 1 - Start the backend server:**
```bash
npm run server
```
The backend API will run on `http://localhost:3001`

**Terminal 2 - Start the frontend development server:**
```bash
npm run client
```
The frontend will run on `http://localhost:5173`

### Option 2: Run both servers concurrently (Unix/Mac)
```bash
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. The app will display 20 pre-populated products from various categories
3. **Browse Products**: Scroll through the product cards to view inventory
4. **Add Product**: Click "Add New Product" button, fill in the form, and submit
5. **Update Quantity**: Click the pencil icon (✏️) next to any product's quantity, enter the new value, and confirm
6. **Delete Product**: Click "Delete Product" button on any card and confirm the deletion

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a single product
- `POST /api/products` - Create a new product
- `PATCH /api/products/:id/quantity` - Update product quantity
- `DELETE /api/products/:id` - Delete a product

## Database

The SQLite database is automatically created and seeded with 20 products when you first run the backend server. The database file is located at `server/inventory.db`.

### Pre-populated Product Categories:
- Electronics (laptops, monitors, keyboards, etc.)
- Furniture (desks, chairs, bookshelves)
- Office supplies (organizers, lamps, calendars)
- Stationery (notebooks, pens)
- Accessories (cables, mouse pads, phone stands)

## Project Structure

```
Satu_testikeissi/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── AddProductForm.jsx
│   │   ├── App.jsx        # Main app component
│   │   └── index.css      # Tailwind CSS
│   └── package.json
├── server/                # Express backend
│   ├── database.js        # Database setup and seeding
│   ├── index.js           # API routes
│   └── inventory.db       # SQLite database (auto-generated)
├── package.json
└── README.md
```

## License

ISC