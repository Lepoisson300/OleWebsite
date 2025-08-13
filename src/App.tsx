import { useState } from "react";
import ActualitesPage from "./Pages/ActualitePage";
import ContactPage from "./Pages/ContactPage";
import GaleriePage from "./Pages/GaleriePage";
import AccueilPage from "./Pages/HomePage";
import MenusPage from "./Pages/MenuPage";
import './index.css'; // Assuming you have a global CSS file for styles

import { Clock, MapPin, Phone, Mail, Star, ChefHat } from 'lucide-react';
import MenuJourPage from "./Pages/MenuJourPage";


// Main App Component
const OleRestaurant = () => {
  const [currentPage, setCurrentPage] = useState('accueil');

  const renderPage = () => {
    switch(currentPage) {
      case 'accueil':
        return <AccueilPage setCurrentPage={setCurrentPage} />;
      case 'menus':
        return <MenusPage />;
      case 'actualites':
        return <ActualitesPage />;
      case 'galerie':
        return <GaleriePage />;
      case 'contact':
        return <ContactPage />;
      case 'menuJour':
        return <MenuJourPage />;
      default:
        return <AccueilPage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/**Logo of the ole */}
              <img src="/logoOle.png" alt="Olé Restaurant" className="h-8 w-8" />
              <h1 className="text-3xl font-bold text-green-900">Olé Restaurant</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-stone-600">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">10h00 - 22h00</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+41 32 751 66 55</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Top Navigation Menu */}
      <nav className="bg-slate-900 text-stone-300 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 md:gap-16">
        <button 
          onClick={() => setCurrentPage('accueil')}
          className={`hover:text-amber-600 transition-colors text-base md:text-lg font-light tracking-wide ${
            currentPage === 'accueil' ? 'text-amber-600' : ''
          }`}
        >
          Accueil
        </button>
        <button 
          onClick={() => setCurrentPage('menus')}
          className={`hover:text-amber-600 transition-colors text-base md:text-lg font-light tracking-wide ${
            currentPage === 'menus' ? 'text-amber-600' : ''
          }`}
        >
          Menus
        </button>
        <button 
          onClick={() => setCurrentPage('actualites')}
          className={`hover:text-amber-600 transition-colors text-base md:text-lg font-light tracking-wide ${
            currentPage === 'actualites' ? 'text-amber-600' : ''
          }`}
        >
          Actualités
        </button>
        <button 
          onClick={() => setCurrentPage('galerie')}
          className={`hover:text-amber-600 transition-colors text-base md:text-lg font-light tracking-wide ${
            currentPage === 'galerie' ? 'text-amber-600' : ''
          }`}
        >
          Galerie
        </button>
        <button 
          onClick={() => setCurrentPage('contact')}
          className={`hover:text-amber-600 transition-colors text-base md:text-lg font-light tracking-wide ${
            currentPage === 'contact' ? 'text-amber-600' : ''
          }`}
        >
          Contact
        </button>
        <button
          onClick={() => setCurrentPage('menuJour')}
          className={`hover:text-amber-600 transition-colors text-base md:text-lg font-light tracking-wide ${
            currentPage === 'menuJour' ? 'text-amber-600' : ''
          }`}
        >
          Menu du Jour
        </button>
      </div>
    </div>
  </nav>

      {/* Main Content */}
      <main>
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-stone-800 text-stone-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Restaurant Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <h3 className="text-xl font-bold text-white">Olé Restaurant</h3>
              </div>
                <p className="text-stone-400 mb-4">
                Nos clients apprécient particulièrement l'ambiance chaleureuse, la qualité des plats et le service attentionné. Leur satisfaction se reflète dans leurs avis positifs et leur fidélité à Olé Restaurant.
                </p>
              <div className="flex space-x-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-amber-800" />
                  <span className="text-sm">O'lé Restaurant Lounge Chemin de Saint-Joux 222520 La Neuveville</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-amber-800" />
                <span className="text-sm">+41 32 751 66 55</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-amber-800" />
                  <span className="text-sm">contact@olerestaurant.fr</span>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Horaires</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Lundi - mercredi</span>
                  <span>10h00 - 22h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Mercredi - Sam</span>
                  <span>10h00 - 00h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span>10h00 - 17h00</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Navigation</h4>
              <div className="space-y-2">
                <button 
                  onClick={() => setCurrentPage('accueil')}
                  className="block text-sm hover:text-amber-600 transition-colors"
                >
                  Accueil
                </button>
                <button 
                  onClick={() => setCurrentPage('menus')}
                  className="block text-sm hover:text-amber-600 transition-colors"
                >
                  Nos Menus
                </button>
                <button 
                  onClick={() => setCurrentPage('actualites')}
                  className="block text-sm hover:text-amber-600 transition-colors"
                >
                  Actualités
                </button>
                <button 
                  onClick={() => setCurrentPage('galerie')}
                  className="block text-sm hover:text-amber-600 transition-colors"
                >
                  Galerie
                </button>
                <button 
                  onClick={() => setCurrentPage('contact')}
                  className="block text-sm hover:text-amber-600 transition-colors"
                >
                  Réservation
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-stone-700 mt-8 pt-8 text-center">
            <p className="text-stone-400 text-sm">
              © 2025 Olé Restaurant. Tous droits réservés. | 
              <span className="mx-2">•</span>
              Mentions légales | 
              <span className="mx-2">•</span>
              Politique de confidentialité
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OleRestaurant;