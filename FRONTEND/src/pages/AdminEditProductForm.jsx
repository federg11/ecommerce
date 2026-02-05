import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/unifiedApi';
import { Upload, ArrowLeft } from 'lucide-react';

const AdminEditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setName(data.name);
        setPrice(data.price);
        setDescription(data.description);
        setCategory(data.category);
        setStock(data.stock);
        setCurrentImage(data.image || data.imageUrl);
      } catch (error) {
        console.error('Error fetching product:', error);
        alert('Error al cargar el producto');
        navigate('/admin/product-list');
      } finally {
        setFetchLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('stock', stock);
    
    // Solo agregar imagen si se seleccionó una nueva
    if (image) {
      formData.append('image', image);
    }

    try {
      const { data } = await api.put(`/products/${id}`, formData);
      toast.success('Producto actualizado exitosamente!');
      navigate('/admin/product-list');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error al actualizar producto';
      console.error('Product update error:', error);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="container mx-auto p-6 max-w-3xl">
        <div className="text-center py-20">
          <div className="text-xl font-bold">Cargando producto...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition"
      >
        <ArrowLeft size={20} /> Volver al inventario
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Editar Insumo</h2>
        
        {/* Mostrar imagen actual */}
        {currentImage && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Imagen Actual</label>
            <img 
              src={currentImage} 
              alt="Imagen actual del producto" 
              className="w-32 h-32 object-cover rounded-lg border"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
            <input 
              type="text" 
              required 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full mt-1 p-2 border rounded-lg" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Precio (USD)</label>
            <input 
              type="number" 
              required 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              className="w-full mt-1 p-2 border rounded-lg" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nueva Imagen (opcional)</label>
            <input 
              type="file" 
              accept="image/*" 
              onChange={(e) => setImage(e.target.files[0])} 
              className="w-full mt-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <select 
              required 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
              className="w-full mt-1 p-2 border rounded-lg"
            >
              <option value="">Seleccionar...</option>
              <option value="Procesadores">Procesadores</option>
              <option value="Placas de Video">Placas de Video</option>
              <option value="Periféricos">Periféricos</option>
              <option value="Monitores">Monitores</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input 
              type="number" 
              required 
              value={stock} 
              onChange={(e) => setStock(e.target.value)} 
              className="w-full mt-1 p-2 border rounded-lg" 
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Descripción Técnica</label>
            <textarea 
              rows="4" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="w-full mt-1 p-2 border rounded-lg"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition shadow-lg disabled:bg-gray-400"
          >
            <Upload size={20} /> {loading ? 'Actualizando...' : 'Actualizar Insumo'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditProductForm;