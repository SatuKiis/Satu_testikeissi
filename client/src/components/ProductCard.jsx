import { useState } from 'react'

function ProductCard({ product, onDelete, onUpdateQuantity }) {
  const [isEditingQuantity, setIsEditingQuantity] = useState(false)
  const [newQuantity, setNewQuantity] = useState(product.quantity)

  const handleQuantitySubmit = (e) => {
    e.preventDefault()
    onUpdateQuantity(product.id, newQuantity)
    setIsEditingQuantity(false)
  }

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { text: 'Out of Stock', color: 'bg-red-100 text-red-800' }
    if (quantity < 20) return { text: 'Low Stock', color: 'bg-yellow-100 text-yellow-800' }
    return { text: 'In Stock', color: 'bg-green-100 text-green-800' }
  }

  const stockStatus = getStockStatus(product.quantity)

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stockStatus.color}`}>
            {stockStatus.text}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Category:</span>
            <span className="font-medium text-gray-700">{product.category}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Price:</span>
            <span className="font-bold text-indigo-600">${product.price.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Quantity:</span>
            {isEditingQuantity ? (
              <form onSubmit={handleQuantitySubmit} className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  className="w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  autoFocus
                />
                <button type="submit" className="text-green-600 hover:text-green-700">
                  ✓
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditingQuantity(false)
                    setNewQuantity(product.quantity)
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  ✕
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-800">{product.quantity}</span>
                <button
                  onClick={() => setIsEditingQuantity(true)}
                  className="text-indigo-600 hover:text-indigo-700 text-sm"
                  title="Edit quantity"
                >
                  ✏️
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={() => onDelete(product.id)}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            🗑️ Delete Product
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
