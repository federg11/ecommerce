import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './pages/LoginScreen';
import AdminProductForm from './pages/AdminProductForm';
import AdminEditProductForm from './pages/AdminEditProductForm';
import HomeScreen from './pages/HomeScreen';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProductList from './pages/AdminProductList';
import CatalogScreen from './pages/CatalogScreen';
import ProductDetailScreen from './pages/ProductDetailScreen';
import Navbar from './components/NavBar';
import { Toaster } from 'react-hot-toast';
import RegisterScreen from './pages/RegisterScreen';

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Navbar />
      <Routes>
        {/* --- RUTAS PÚBLICAS --- */}
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/catalog" element={<CatalogScreen />} />
        <Route path="/product/:id" element={<ProductDetailScreen />} />

        {/* --- RUTAS PROTEGIDAS (Solo Logueados) --- */}
        <Route element={<ProtectedRoute />}>
          {/* Aquí podrías poner el perfil del usuario, por ejemplo */}
          {/* <Route path="/profile" element={<ProfileScreen />} /> */}
        </Route>

        {/* --- RUTAS DE ADMINISTRADOR (Solo Admin) --- */}
        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/admin/product-list" element={<AdminProductList />} />
          <Route path="/admin/product-form" element={<AdminProductForm />} />
          <Route path="/admin/product-form/:id" element={<AdminEditProductForm />} />
          {/* Aquí irán más rutas como /admin/product-list o /admin/orders */}
        </Route>

        {/* Ruta para 404 - No encontrado */}
        <Route path="*" element={<div className="text-center mt-20">404 - Página no encontrada</div>} />
      </Routes>
    </Router>
  );
}

export default App;