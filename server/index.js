const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Get all products
app.get('/api/products', (req, res) => {
  try {
    const products = db.prepare('SELECT * FROM products ORDER BY created_at DESC').all();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  try {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new product
app.post('/api/products', (req, res) => {
  try {
    const { name, description, quantity, price, category } = req.body;
    
    if (!name || quantity === undefined || !price) {
      return res.status(400).json({ error: 'Name, quantity, and price are required' });
    }

    const result = db.prepare(
      'INSERT INTO products (name, description, quantity, price, category) VALUES (?, ?, ?, ?, ?)'
    ).run(name, description || '', quantity, price, category || '');

    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update product quantity
app.patch('/api/products/:id/quantity', (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (quantity === undefined || quantity < 0) {
      return res.status(400).json({ error: 'Valid quantity is required' });
    }

    const result = db.prepare('UPDATE products SET quantity = ? WHERE id = ?').run(quantity, req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete product
app.delete('/api/products/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
});
