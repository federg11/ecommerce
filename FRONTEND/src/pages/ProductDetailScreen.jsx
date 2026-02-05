import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, CheckCircle, AlertCircle } from 'lucide-react';
import api from '../api/unifiedApi';

const ProductDetailScreen = () => {
  const { id } = useParams(); // Capturamos el ID de la URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error al cargar el producto", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center py-20 font-mono">Cargando especificaciones...</div>;
  if (!product) return <div className="text-center py-20">Producto no encontrado.</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Botón Volver */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition mb-8 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
        Volver al catálogo
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        
        {/* Columna Izquierda: Imagen */}
        <div className="flex justify-center items-center bg-gray-50 rounded-2xl p-4">
          <img 
            src={product.image || product.imageUrl || 'https://via.placeholder.com/500x500?text=Sin+Imagen'} 
            alt={product.name} 
            className="max-h-[500px] w-full object-contain hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/500x500?text=Imagen+no+disponible';
            }}
          />
        </div>

        {/* Columna Derecha: Información */}
        <div className="flex flex-col">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2">
            {product.category}
          </span>
          <h1 className="text-4xl font-black text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            <div className="h-6 w-[1px] bg-gray-300"></div>
            {product.stock > 0 ? (
              <span className="flex items-center gap-1 text-green-600 font-medium">
                <CheckCircle size={18} /> En stock ({product.stock} unidades)
              </span>
            ) : (
              <span className="flex items-center gap-1 text-red-500 font-medium">
                <AlertCircle size={18} /> Sin stock disponible
              </span>
            )}
          </div>

          <div className="border-t border-b border-gray-100 py-6 mb-8">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Descripción Técnica</h3>
            <p className="text-gray-600 leading-relaxed">
              {product.description || "No hay una descripción detallada disponible para este insumo."}
            </p>
          </div>

          {/* Botones de Acción */}
          <div className="mt-auto space-y-4">
            <button 
              disabled={product.stock === 0}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:bg-gray-300 disabled:shadow-none"
            >
              <ShoppingCart size={22} /> Añadir al Carrito
            </button>
            
            <p className="text-center text-xs text-gray-400">
              Garantía oficial de 12 meses • Envío seguro a todo el país
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;