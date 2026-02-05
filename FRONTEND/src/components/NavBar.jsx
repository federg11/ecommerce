import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ShoppingCart, 
  User, 
  Menu, 
  X, 
  Monitor, 
  LogOut, 
  Settings 
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-500 transition-colors">
              <Monitor size={24} className="text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter">
              TECH<span className="text-blue-500">INSUMOS</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-blue-400 font-medium transition">Inicio</Link>
            <Link to="/catalog" className="hover:text-blue-400 font-medium transition">Catálogo</Link>
            
            {/* Opciones de Admin */}
            {isAdmin && (
              <Link to="/admin/product-list" className="flex items-center gap-1 text-yellow-400 hover:text-yellow-300 font-bold transition">
                <Settings size={18} /> Admin
              </Link>
            )}
          </div>

          {/* Icons & Auth */}
          <div className="hidden md:flex items-center gap-5">
            <button className="relative hover:text-blue-400 transition">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                0
              </span>
            </button>

            {userInfo ? (
              <div className="flex items-center gap-4 border-l border-gray-700 pl-5">
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-400 italic">Bienvenido,</span>
                  <span className="text-sm font-bold">{userInfo.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-gray-800 p-2 rounded-full hover:bg-red-600 transition"
                  title="Cerrar Sesión"
                >
                  <LogOut size={18} />
                </button>
              </div>
             ) : (
              <div className="flex items-center gap-3">
                <Link 
                  to="/register" 
                  className="text-gray-300 hover:text-blue-400 px-3 py-2 rounded-lg font-medium transition"
                >
                  Registrarse
                </Link>
                <Link 
                  to="/login" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-bold transition"
                >
                  Ingresar
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-4 border-t border-gray-800 pt-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300">Inicio</Link>
            <Link to="/catalog" onClick={() => setIsOpen(false)} className="block py-2 text-gray-300">Catálogo</Link>
            {isAdmin && (
              <Link to="/admin/product-list" onClick={() => setIsOpen(false)} className="block py-2 text-yellow-400 font-bold">
                Panel Admin
              </Link>
            )}
            <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
              {userInfo ? (
                <button onClick={handleLogout} className="text-red-400 font-bold flex items-center gap-2">
                  <LogOut size={20} /> Cerrar Sesión
                </button>
              ) : (
                <div className="space-y-2">
                  <Link to="/register" onClick={() => setIsOpen(false)} className="block text-blue-400 font-medium">Registrarse</Link>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block text-blue-400 font-bold">Iniciar Sesión</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;