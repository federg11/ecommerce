import React, { useState, useEffect } from 'react';
import api from '../api/unifiedApi';
import ProductCard from '../components/ProductCard';
import { Filter } from 'lucide-react';

const categories = ['Todos', 'Procesadores', 'Placas de Video', 'Almacenamiento', 'Periféricos', 'Monitores'];

const CatalogScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Todos');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error cargando el catálogo", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  // Lógica de filtrado
  useEffect(() => {
    if (activeCategory === 'Todos') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, products]);

  if (loading) return <div className="text-center py-20 font-bold text-xl">Cargando Hardware...</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900">Catálogo Técnico</h1>
          <p className="text-gray-500 mt-2">Encuentra los mejores insumos para tu próximo upgrade.</p>
        </div>

        {/* Filtros de Categoría */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat 
                ? 'bg-blue-600 text-white shadow-lg scale-105' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Productos */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-400 text-lg">No hay productos disponibles en esta categoría.</p>
        </div>
      )}
    </div>
  );
};

export default CatalogScreen;