const Database = require('better-sqlite3');
const path = require('path');

// Create database connection
const db = new Database(path.join(__dirname, 'inventory.db'));

// Create products table
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    quantity INTEGER NOT NULL DEFAULT 0,
    price REAL NOT NULL,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Seed data with 20 products
const seedData = () => {
  const count = db.prepare('SELECT COUNT(*) as count FROM products').get();
  
  if (count.count === 0) {
    const products = [
      { name: 'Laptop Computer', description: 'High-performance laptop for professionals', quantity: 15, price: 999.99, category: 'Electronics' },
      { name: 'Wireless Mouse', description: 'Ergonomic wireless mouse', quantity: 45, price: 29.99, category: 'Electronics' },
      { name: 'Mechanical Keyboard', description: 'RGB mechanical gaming keyboard', quantity: 30, price: 89.99, category: 'Electronics' },
      { name: 'USB-C Cable', description: 'Durable USB-C charging cable', quantity: 100, price: 12.99, category: 'Accessories' },
      { name: 'Desk Lamp', description: 'LED desk lamp with adjustable brightness', quantity: 25, price: 34.99, category: 'Office' },
      { name: 'Office Chair', description: 'Ergonomic office chair with lumbar support', quantity: 12, price: 199.99, category: 'Furniture' },
      { name: 'Standing Desk', description: 'Electric height-adjustable standing desk', quantity: 8, price: 449.99, category: 'Furniture' },
      { name: 'Monitor 27"', description: '4K UHD 27-inch monitor', quantity: 20, price: 349.99, category: 'Electronics' },
      { name: 'Webcam HD', description: '1080p HD webcam with microphone', quantity: 35, price: 69.99, category: 'Electronics' },
      { name: 'Headphones', description: 'Noise-cancelling wireless headphones', quantity: 40, price: 149.99, category: 'Electronics' },
      { name: 'Notebook Pack', description: 'Pack of 5 lined notebooks', quantity: 60, price: 15.99, category: 'Stationery' },
      { name: 'Pen Set', description: 'Premium ballpoint pen set', quantity: 80, price: 9.99, category: 'Stationery' },
      { name: 'Desk Organizer', description: 'Wooden desk organizer with compartments', quantity: 22, price: 24.99, category: 'Office' },
      { name: 'Coffee Mug', description: 'Insulated stainless steel coffee mug', quantity: 50, price: 19.99, category: 'Accessories' },
      { name: 'Mouse Pad', description: 'Extra-large gaming mouse pad', quantity: 55, price: 14.99, category: 'Accessories' },
      { name: 'Phone Stand', description: 'Adjustable smartphone stand', quantity: 38, price: 16.99, category: 'Accessories' },
      { name: 'Portable SSD 1TB', description: '1TB external solid-state drive', quantity: 18, price: 129.99, category: 'Electronics' },
      { name: 'Desk Calendar', description: '2024 desktop calendar planner', quantity: 28, price: 11.99, category: 'Stationery' },
      { name: 'Cable Management', description: 'Cable organizer clip set', quantity: 70, price: 8.99, category: 'Accessories' },
      { name: 'Bookshelf', description: '5-tier modern bookshelf', quantity: 10, price: 89.99, category: 'Furniture' }
    ];

    const insert = db.prepare('INSERT INTO products (name, description, quantity, price, category) VALUES (?, ?, ?, ?, ?)');
    
    for (const product of products) {
      insert.run(product.name, product.description, product.quantity, product.price, product.category);
    }
    
    console.log('✓ Database seeded with 20 products');
  }
};

// Initialize database with seed data
seedData();

module.exports = db;
