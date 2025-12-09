import ProductCard from './ProductCard'

function ProductList({ products, onDelete, onUpdateQuantity }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-lg">
        <p className="text-gray-500 text-lg">No products found. Add your first product to get started!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={onDelete}
          onUpdateQuantity={onUpdateQuantity}
        />
      ))}
    </div>
  )
}

export default ProductList
