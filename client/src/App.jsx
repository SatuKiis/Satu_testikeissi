import { useState, useEffect } from 'react'
import ProductList from './components/ProductList'
import AddProductForm from './components/AddProductForm'

const API_URL = 'http://localhost:3001/api/products'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error('Failed to fetch products')
      const data = await response.json()
      setProducts(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = async (productData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })
      if (!response.ok) throw new Error('Failed to add product')
      await fetchProducts()
      setShowAddForm(false)
    } catch (err) {
      alert('Error adding product: ' + err.message)
    }
  }

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete product')
      await fetchProducts()
    } catch (err) {
      alert('Error deleting product: ' + err.message)
    }
  }

  const handleUpdateQuantity = async (id, quantity) => {
    try {
      const response = await fetch(`${API_URL}/${id}/quantity`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: parseInt(quantity) })
      })
      if (!response.ok) throw new Error('Failed to update quantity')
      await fetchProducts()
    } catch (err) {
      alert('Error updating quantity: ' + err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            📦 Inventory Management System
          </h1>
          <p className="text-gray-600">Manage your retail store inventory with ease</p>
        </header>

        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-200 flex items-center gap-2"
          >
            {showAddForm ? '✕ Cancel' : '+ Add New Product'}
          </button>
        </div>

        {showAddForm && (
          <div className="mb-8">
            <AddProductForm
              onSubmit={handleAddProduct}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {!loading && !error && (
          <ProductList
            products={products}
            onDelete={handleDeleteProduct}
            onUpdateQuantity={handleUpdateQuantity}
          />
        )}
      </div>
    </div>
  )
}

export default App
