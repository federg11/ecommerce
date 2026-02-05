import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, User } from 'lucide-react';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      // Redirigir según rol
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo?.isAdmin) {
        navigate('/admin/product-list'); // Panel de admin
      } else {
        navigate('/catalog'); // Catálogo para usuarios normales
      }
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-blue-600" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Bienvenido de nuevo</h2>
          <p className="text-gray-500">Ingresa a tu panel administrativo</p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="admin@tech.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700">Contraseña</label>
            <input
              type="password"
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 shadow-lg"
          >
            Iniciar Sesión
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link 
              to="/register" 
              className="text-blue-600 hover:text-blue-800 font-semibold hover:underline flex items-center justify-center gap-1 inline-flex"
            >
              <User size={16} /> Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;