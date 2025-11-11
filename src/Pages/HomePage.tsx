import React from 'react';
import {Star, Utensils, Wine, Users} from 'lucide-react';

// Accueil Page Component
interface AccueilPageProps {
  setCurrentPage: (page: string) => void;
  listesHoraires: { jours: string; ouverture: string; fermeture: string }[];
}

const AccueilPage: React.FC<AccueilPageProps> = ({ setCurrentPage, listesHoraires }) => (
  <>
    {/* Hero Section */}
    <section className="py-8 md:py-24 relative min-h-[300px] flex items-center max-w-7xl mt-10 mb-10 rounded-lg overflow-hidden mx-auto">
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet"/>
      <img
      src='/OlRestaurant.png'
      className="absolute inset-0 h-full w-full object-cover object-center z-0"
      style={{ pointerEvents: 'none' }}
      alt=""
      />
      <img
      src='/olebanniere.png'
      className='absolute top-3/7 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 max-w-[350px] w-full px-4' 
      />
      <style>{`@media (max-width: 640px) {
        img[src*="olebanniere.png"] {
          max-width: 270px !important;
          width: auto !important;
        }
      }`}</style>
      <div className="container mx-auto px-4 text-center relative z-20 w-full flex flex-col items-center justify-center h-full min-h-[300px]">
      {/* Welcome text above logo */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-['Dancing_Script'] text-center leading-tight mb-7">
        ¡Bienvenidos a O'lé!
      </h2>
      
      {/* Logo would go here - you can add your logo image */}
      <div className="mb-8">
        {/* Add your logo here if you have one */}
        {/* <img src="your-logo.png" alt="O'lé Logo" className="h-24 w-24 mx-auto" /> */}
      </div>
      
      {/* French description text below logo */}
      <div className="max-w-5xl mx-auto mt-[220px]">
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-['Dancing_Script'] text-white text-center font-bold leading-relaxed px-4">
        Situé au bord du lac de Bienne, sur la plus belle plage de la région, 
        ce restaurant lounge propose une carte de mets inspirés des voyages du chef de cuisine, tout en utilisant des produits locaux.
        </p>
      </div>
      </div>
    </section>

    <div className="bg-stone-800 flex flex-row justify-center p-4 min-h-[90px] gap-4 max-w-7xl mx-auto mb-16 rounded-lg">
        <button 
          onClick={() => setCurrentPage('menus')}
          className="bg-amber-800 text-stone-100 sm:mx-2 px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors w-full sm:w-auto"
          >
          Voir le Menu
        </button>
        <button 
          onClick={() => setCurrentPage('contact')}
          className="border-2 border-stone-300 text-stone-100 px-8 py-3 rounded-lg font-semibold hover:bg-stone-100 hover:text-stone-800 transition-colors w-full sm:w-auto"
          >
          Réserver une Table
        </button>
        </div>

    {/* Features */}
    <section className="py-16 bg-gray-950">
      
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-6 h-64">
              <img 
                src="https://cdn.passeports.world/pictures/square/pictures/6363/802e5/6363802e55b08/pg23-60038-ole-1a-compressed.jpg?c=1667465262" 
                alt="Authentic Spanish Cuisine" 
                className="w-full h-full object-cover "
              />
              <div className="absolute inset-0  bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30"></div>
              <div className="absolute top-4 left-4">
                <div className="w-12 h-12 bg-stone-800 text-stone-200 rounded-full flex items-center justify-center">
                  <Utensils className="h-6 w-6" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-amber-500">Cuisine Authentique</h3>
            <p className="text-amber-200">Recettes espagnoles traditionnelles transmises à travers les générations, élaborées avec passion et ingrédients de premier choix</p>
          </div>
          
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-6 h-64">
              <img 
                src="https://le-de.cdn-website.com/63bbc12fb217440382108fff4b533128/dms3rep/multi/opt/OlRestaurantLounge-003+%281%29-432w.jpg" 
                alt="Premium Spanish Wines" 
                className="w-full h-full object-cover  "
              />
              <div className="absolute inset-0 bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30"></div>
              <div className="absolute top-4 left-4">
                <div className="w-12 h-12 bg-stone-800 text-stone-200 rounded-full flex items-center justify-center">
                  <Wine className="h-6 w-6" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-amber-500">Vins de Qualité</h3>
            <p className="text-amber-200">Sélection soigneusement élaborée de vins espagnols</p>
          </div>
          
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg mb-6 h-64">
              <img 
                src="https://img.restaurantguru.com/r581-OLe-restaurant-design-2024-09.jpg" 
                alt="Restaurant Atmosphere" 
                className="w-full h-full object-cover "
              />
              <div className="absolute inset-0 bg-opacity-40 transition-opacity duration-300 group-hover:bg-opacity-30"></div>
              <div className="absolute top-4 left-4">
                <div className="w-12 h-12 bg-stone-800  text-stone-200 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-amber-500">Ambiance Chaleureuse</h3>
            <p className="text-amber-200">Idéal pour des dîners intimes et des célébrations en groupe dans notre cadre chaleureux et accueillant inspiré de l'Espagne</p>
          </div>
        </div>
      </div>
    </section>

    {/* About Section */}
    <section className="py-16 bg-stone-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-amber-50 font-['Dancing_Script']">A propos de O'lé Restaurant</h2>
            <p className="text-stone-300 mb-4">
              Des plats généreux, gourmands, à l'accent méditerranéen présentés de manière fine et délicate. 
              Un endroit convivial, cosy et accueillant où nos clients pourront apprécier un cocktail sur notre superbe terrasse ou déguster une sélection de nos tapas dans notre intérieur entièrement rénové. Des vins de la région, une carte de cocktails, de shots, 
              et de coupes de glace gargantuesques.... Tout pour satisfaire toutes les envies.
              Le Restaurant O'lé, un endroit où il fait bon se laisser vivre...
            </p>
            
            <div className="flex items-center space-x-4">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-stone-600 ml-2">4.5/5 de 500+ commentaires</span>
            </div>
          </div>
            <div className="bg-gradient-to-br from-amber-800 to-amber-400 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Horaires</h3>
            <div className="space-y-2">
              {listesHoraires.map(({ jours, ouverture, fermeture }) => (
              <div className="flex justify-between" key={jours}>
                <span>{jours}</span>
                <span>
                {ouverture} - {fermeture}
                </span>
              </div>
              ))}
            </div>
            </div>
        </div>
      </div>
    </section>
  </>
);

export default AccueilPage;