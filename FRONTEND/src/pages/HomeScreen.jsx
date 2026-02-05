import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ShieldCheck, Truck } from 'lucide-react';

const HomeScreen = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Potencia tu Setup con <span className="text-blue-500">Insumos Pro</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10">
            Hardware de última generación, periféricos y todo lo que necesitas para tu workstation o gaming rig.
          </p>
          <Link
            to="/catalog"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition shadow-xl"
          >
            Ver Catálogo Completo
          </Link>
        </div>
      </div>

      {/* Características Breves */}
      <div className="py-16 container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6 text-center">
        <div className="p-6">
          <Cpu className="mx-auto text-blue-600 mb-4" size={48} />
          <h3 className="font-bold text-xl mb-2">Hardware Original</h3>
          <p className="text-gray-600">Garantía oficial en todos nuestros procesadores y placas.</p>
        </div>
        <div className="p-6">
          <Truck className="mx-auto text-blue-600 mb-4" size={48} />
          <h3 className="font-bold text-xl mb-2">Envíos Rápidos</h3>
          <p className="text-gray-600">Despachamos tus insumos en menos de 24 horas.</p>
        </div>
        <div className="p-6">
          <ShieldCheck className="mx-auto text-blue-600 mb-4" size={48} />
          <h3 className="font-bold text-xl mb-2">Compra Segura</h3>
          <p className="text-gray-600">Tus pagos están protegidos con tecnología SSL.</p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;