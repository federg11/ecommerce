import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validaciones básicas
    if (name.length < 3) {
      alert('El nombre debe tener al menos 3 caracteres');
      setLoading(false);
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      alert('Por favor ingresa un email válido');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    const result = await register(name, email, password);
    
    if (result.success) {
      alert('¡Usuario registrado exitosamente!');
      // Redirigir según rol del usuario recién creado
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo?.isAdmin) {
        navigate('/admin/product-list'); // Panel de admin
      } else {
        navigate('/catalog'); // Catálogo para usuarios normales
      }
    } else {
      alert(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="text-blue-600" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Crear Cuenta</h2>
          <p className="text-gray-500 mt-2">Regístrate para acceder al sistema</p>
        </div>
    
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Nombre Completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={3}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Juan Pérez"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="nombre@tech.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link 
              to="/login" 
              className="text-blue-600 hover:text-blue-800 font-semibold hover:underline flex items-center justify-center gap-1 inline-flex"
            >
              <LogIn size={16} /> Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;