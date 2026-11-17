import { useEffect, useState } from "react";
import ActualitesPage from "./Pages/ActualitePage";
import ContactPage from "./Pages/ContactPage";
import GaleriePage from "./Pages/GaleriePage";
import AccueilPage from "./Pages/HomePage";
import MenusPage from "./Pages/MenuPage";
import './index.css'; // Assuming you have a global CSS file for styles
import type { Horaire } from './types/horaires';
import logo from '/logoOle.png';

import { Clock, MapPin, Phone, Mail, Star, Utensils, CalendarCheck } from 'lucide-react';
import MenuJourPage from "./Pages/MenuJourPage";


// Main App Component
const OleRestaurant = () => {
  const [currentPage, setCurrentPage] = useState('accueil');

  const [listesHoraires, setListesHoraires] = useState<Horaire[]>([]);

  const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID as string;
  const API_KEY = import.meta.env.VITE_API_KEY as string;
  const RANGE_HORAIRES = import.meta.env.VITE_RANGE_HORAIRES as string;

  useEffect(() => {

    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE_HORAIRES}?key=${API_KEY}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.values && data.values.length > 1) {
          // Skip the header row (index 0) and map the rest
          const horaires: Horaire[] = data.values.slice(1).map((row: string[]) => ({
            jours: row[0] || '',
            ouverture: row[1] || '',
            fermeture: row[2] || '',
          }));
          setListesHoraires(horaires);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [SHEET_ID, API_KEY, RANGE_HORAIRES]);

  useEffect(() => {
  }, [listesHoraires]);

  const renderPage = () => {
    switch (currentPage) {
      case 'accueil':
        return <AccueilPage setCurrentPage={setCurrentPage} listesHoraires={listesHoraires} />;
      case 'menus':
        return <MenusPage />;
      case 'actualites':
        return <ActualitesPage />;
      case 'galerie':
        return <GaleriePage />;
      case 'contact':
        return <ContactPage listesHoraires={listesHoraires} />;
      case 'menuJour':
        return <MenuJourPage />;
      default:
        return <AccueilPage setCurrentPage={setCurrentPage} listesHoraires={listesHoraires} />;
    }
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-200 flex flex-col">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet" />

      <header className="bg-gray-950/95 backdrop-blur-sm border-b border-stone-800/80 shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo & Titre */}
            <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
              <button
                type="button"
                onClick={() => setCurrentPage('accueil')}
                aria-label="Accueil"
                title="Accueil"
                className="shrink-0"
              >
                <img
                  className="rounded-full w-10 h-10 sm:w-12 sm:h-12 cursor-pointer"
                  src={logo}
                  alt="Olé Restaurant"
                />
              </button>
              <h1 className="text-xl sm:text-3xl font-bold text-amber-50 font-['Dancing_Script'] truncate">
                O'lé Restaurant Lounge
              </h1>
            </div>

            {/* Infos pratiques + Boutons condensés */}
            <div className="flex items-center space-x-3 lg:space-x-6 text-stone-200 shrink-0">
              {/* Horaires & Téléphone */}
              <div className="hidden xl:flex items-center space-x-5 text-stone-300">
                <div className="flex items-center space-x-1.5">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span className="text-sm">10h00 - 00h00</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Phone className="h-4 w-4 text-amber-500" />
                  <span className="text-sm">+41 32 751 66 55</span>
                </div>
              </div>

              {/* Bloc combiné : Icônes seules sur mobile, Icônes + Texte sur desktop */}
              <div className="inline-flex items-center rounded-lg bg-stone-900 p-1 border border-stone-700/80 shadow-inner gap-1 sm:gap-0">
                <button
                  type="button"
                  onClick={() => setCurrentPage('menus')}
                  aria-label="Voir le Menu"
                  title="Voir le Menu"
                  className="inline-flex items-center justify-center gap-1.5 p-2 sm:px-4 sm:py-2 rounded-md text-sm font-semibold text-stone-200 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  <Utensils className="w-4 h-4 text-amber-400 sm:text-current" />
                  <span className="hidden sm:inline">Menu</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentPage('contact')}
                  aria-label="Réserver une table"
                  title="Réserver une table"
                  className="inline-flex items-center justify-center gap-1.5 p-2 sm:px-4 sm:py-2 rounded-md text-sm font-semibold bg-amber-800 text-stone-100 hover:bg-amber-700 transition-colors shadow-sm cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span className="hidden sm:inline">Réserver</span>
                </button>
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
              className={`hover:text-amber-600 transition-colors text-base md:text-lg font-light tracking-wide ${currentPage === 'accueil' ? 'text-amber-600' : ''
                }`}
            >
              Accueil
            </button>
            <button
              onClick={() => setCurrentPage('menus')}
              className={`hover:text-amber-600 transition-colors text-base md:text-lg font-light tracking-wide ${currentPage === 'menus' ? 'text-amber-600' : ''
                }`}
            >
              Menus
            </button>
            <button
              onClick={() => setCurrentPage('menuJour')}
              className={`hover:text-amber-600 transition-colors text-base md:text-lg font-light tracking-wide ${currentPage === 'menuJour' ? 'text-amber-600' : ''
                }`}
            >
              Menu du Jour
            </button>
            <button
              onClick={() => setCurrentPage('actualites')}
              className={`hover:text-amber-600 transition-colors text-base md:text-lg font-light tracking-wide ${currentPage === 'actualites' ? 'text-amber-600' : ''
                }`}
            >
              Actualités
            </button>
            <button
              onClick={() => setCurrentPage('galerie')}
              className={`hover:text-amber-600 transition-colors text-base md:text-lg font-light tracking-wide ${currentPage === 'galerie' ? 'text-amber-600' : ''
                }`}
            >
              Galerie
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className={`hover:text-amber-600 transition-colors text-base md:text-lg font-light tracking-wide ${currentPage === 'contact' ? 'text-amber-600' : ''
                }`}
            >
              Contact
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
                <div>
                  <div className="flex items-center space-x-3">
                    <a
                      href="https://www.instagram.com/olerestaurantlounge"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Olé Restaurant on Instagram"
                      title="Instagram"
                      className="flex items-center space-x-2 hover:text-amber-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-amber-800"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      <span className="text-sm">@olerestaurantlounge</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">

                  <Mail className="h-4 w-4 text-amber-800" />
                  <a href="mailto:info@restaurantole.com" className="font-semibold hover:no-underline">info@restaurantole.com</a>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Horaires</h4>
              <div className="space-y-2 text-sm">
                {listesHoraires.length > 0 ? (
                  listesHoraires.map((horaire, idx) => (
                    <div className="flex justify-between" key={idx}>
                      <span>{horaire.jours}</span>
                      <span>
                        {horaire.ouverture} - {horaire.fermeture}
                      </span>
                    </div>
                  ))
                ) : (
                  <div>Chargement...</div>
                )}
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
                <button
                  onClick={() => setCurrentPage('menuJour')}
                  className="block text-sm hover:text-amber-600 transition-colors"
                >
                  Menu du Jour
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-stone-700 mt-8 pt-8 text-center">
            <p className="text-stone-400 text-sm">
              © 2025 O'lé Restaurant. Tous droits réservés. |
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