import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col">
      {/* Imagen del Producto */}
      <div className="relative h-56 overflow-hidden group">
        <Link to={`/product/${product._id}`}>
        <img
          src={product.image || product.imageUrl || '/placeholder-image.jpg'}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x200?text=Sin+Imagen';
          }}
        />
        </Link>
        <div className="absolute top-2 right-2">
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            {product.category}
          </span>
        </div>
      </div>

      {/* Info del Producto */}
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-extrabold text-blue-600">${product.price}</span>
            <span className={`text-xs font-semibold ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {product.stock > 0 ? `${product.stock} disponibles` : 'Sin stock'}
            </span>
          </div>

          <button
            disabled={product.stock === 0}
            className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={18} /> Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;