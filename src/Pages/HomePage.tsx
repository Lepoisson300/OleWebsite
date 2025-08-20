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
    <section className="bg-gray-900 text-stone-100 py-16 md:py-24 relative min-h-[600px] flex items-center">
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet"/>
      <img
        src='https://i.imghippo.com/files/pe2725AOo.png'
        className="absolute inset-0 h-[90%] w-full object-cover object-center z-0"
        style={{ pointerEvents: 'none' }}
        alt=""
      />
      <div className="container mx-auto px-4 text-center relative z-20 w-full flex flex-col items-center justify-center h-full">
        {/* Logo/Circle Design */}
        
            {/* Main title inside circle */}
            <h2 className="text-6xl md:text-7xl font-bold text-amber-50 relative z-10 font-['Dancing_Script'] text-center leading-tight">
              ¡Bienvenidos a O'lé!
            </h2>
        
        
        {/* Text and buttons below logo */}
        <div className="max-w-4xl mt-[220px] mx-auto p-2 rounded-lg">
            <div className=' rounded-lg p-4'>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-stone-100 relative z-10 leading-relaxed">
              Situé au bord du lac de Bienne, sur la plus belle plage de la région, 
              ce restaurant lounge propose une carte de mets inspirés des voyages du chef de cuisine, tout en utilisant des produits locaux. 
            </p>
            </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setCurrentPage('menus')}
              className="bg-amber-800 text-stone-100 px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
              Voir le Menu
            </button>
            <button 
              onClick={() => setCurrentPage('contact')}
              className="border-2 border-stone-300 text-stone-100 px-8 py-3 rounded-lg font-semibold hover:bg-stone-100 hover:text-stone-800 transition-colors"
              >
              Réserver une Table
            </button>
          </div>
        </div>
      </div>
    </section>

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
            <div className="bg-gradient-to-br from-amber-800 to-stone-700 rounded-lg p-8 text-white">
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