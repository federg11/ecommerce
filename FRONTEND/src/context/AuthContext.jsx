import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/unifiedApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Inicializamos el estado buscando en localStorage
  const [userInfo, setUserInfo] = useState(
    localStorage.getItem('userInfo') 
      ? JSON.parse(localStorage.getItem('userInfo')) 
      : null
  );

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const { data } = await api.post('/users/login', { email, password });
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al iniciar sesión' 
      };
    }
  };

  // Función para registrar nuevo usuario
  const register = async (name, email, password) => {
    try {
      const { data } = await api.post('/users', { name, email, password });
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Error al registrar usuario' 
      };
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUserInfo(null);
    localStorage.removeItem('userInfo');
    // Redirigir opcionalmente
    window.location.href = '/login';
  };

  // Efecto para verificar si el token expiró (opcional pero recomendado)
  useEffect(() => {
    if (userInfo) {
      // Aquí podrías validar el token con el backend si quisieras
    }
  }, [userInfo]);

  return (
    <AuthContext.Provider value={{ userInfo, login, register, logout, isAdmin: userInfo?.isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};