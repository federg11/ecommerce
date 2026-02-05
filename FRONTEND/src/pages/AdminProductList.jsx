import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Monitor } from 'lucide-react'; // Iconos modernos
import api from '../api/unifiedApi';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Obtener productos del backend
  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (error) {
      console.error('Error al traer productos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  
  // 2. Función para eliminar (por ahora solo el log)
  const deleteHandler = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este insumo?')) {
      try {
        await api.delete(`/products/${id}`);
        // Refrescamos la lista filtrando el eliminado del estado local
        setProducts(products.filter((p) => p._id !== id));
        toast.success('Producto Eliminado');
      } catch (error) {
        toast.error('Error al eliminar');
      }
    }
  };

  if (loading) return <div className="text-center mt-20 font-bold">Cargando inventario...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Monitor size={32} /> Inventario de Insumos
        </h1>
        {/* Botón para ir al formulario de creación */}
        <Link
          to="/admin/product-form"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-lg"
        >
          <Plus size={20} /> Nuevo Insumo
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Imagen</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Nombre</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Categoría</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Precio</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600">Stock</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition">
                 <td className="px-6 py-4">
                   <img
                     src={product.image || product.imageUrl || 'https://via.placeholder.com/48x48?text=No+Img'}
                     alt={product.name}
                     className="w-12 h-12 object-cover rounded-md border"
                     onError={(e) => {
                       e.target.onerror = null;
                       e.target.src = 'https://via.placeholder.com/48x48?text=Sin+Imagen';
                     }}
                   />
                 </td>
                <td className="px-6 py-4 font-medium text-gray-800">{product.name}</td>
                <td className="px-6 py-4 text-gray-600">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-800 font-semibold">${product.price}</td>
                <td className="px-6 py-4">
                   <span className={product.stock < 5 ? 'text-red-500 font-bold' : 'text-gray-600'}>
                    {product.stock} un.
                   </span>
                </td>
                <td className="px-6 py-4">
                   <div className="flex justify-center gap-3">
                     <Link 
                       to={`/admin/product-form/${product._id}`}
                       className="text-blue-600 hover:text-blue-800 transition"
                     >
                       <Edit size={18} />
                     </Link>
                     <button 
                       onClick={() => deleteHandler(product._id)}
                       className="text-red-500 hover:text-red-700 transition"
                     >
                       <Trash2 size={18} />
                     </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProductList;