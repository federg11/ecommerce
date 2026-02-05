import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/unifiedApi';
import { Upload, ArrowLeft } from 'lucide-react';

const AdminProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Validar que haya imagen seleccionada
  if (!image) {
    alert('Por favor selecciona una imagen');
    setLoading(false);
    return;
  }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('image', image); // El archivo binario

    try {
      const {data} = await api.post('/products', formData);
      alert('¡Insumo creado con éxito!', data);
      navigate('/admin/product-list');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Error creating product';
      console.error('Product creation error:', error);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition"
      >
        <ArrowLeft size={20} /> Volver al inventario
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Registrar Nuevo Insumo</h2>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 p-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Precio (USD)</label>
            <input type="number" required value={price} onChange={(e) => setPrice(e.target.value)} className="w-full mt-1 p-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Imagen del Insumo</label>
            <input type="file" accept="image/*" required onChange={(e) => setImage(e.target.files[0])} className="w-full mt-1 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <select required value={category} onChange={(e) => setCategory(e.target.value)} className="w-full mt-1 p-2 border rounded-lg">
              <option value="">Seleccionar...</option>
              <option value="Procesadores">Procesadores</option>
              <option value="Placas de Video">Placas de Video</option>
              <option value="Periféricos">Periféricos</option>
              <option value="Monitores">Monitores</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input type="number" required value={stock} onChange={(e) => setStock(e.target.value)} className="w-full mt-1 p-2 border rounded-lg" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Descripción Técnica</label>
            <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full mt-1 p-2 border rounded-lg"></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition shadow-lg disabled:bg-gray-400"
          >
            <Upload size={20} /> {loading ? 'Subiendo a Cloudinary...' : 'Publicar Insumo'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;