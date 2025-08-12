import React from 'react';
import {Star, Utensils, Wine, Users} from 'lucide-react';

// Accueil Page Component
interface AccueilPageProps {
  setCurrentPage: (page: string) => void;
}

const AccueilPage: React.FC<AccueilPageProps> = ({ setCurrentPage }) => (
  <>
    {/* Hero Section */}
    <section className="bg-gradient-to-r from-stone-800 via-amber-900 to-stone-700 text-stone-100 py-20 relative overflow-hidden">
      {/* Background Image */}
      <img
        src='https://cdn.passeports.world/pictures/square/pictures/6363/802db/6363802db7bcf/pg23-60038-ole-1a-compressed.jpg?c=1667465261'
className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-70"
        style={{ pointerEvents: 'none' }}
      />
      <div className="absolute inset-0  bg-opacity-30 z-10"></div>
    <div className="container mx-auto px-4 text-center relative z-20">
      
      <h2 className="text-5xl font-bold mb-6 text-green-900 relative z-10">¡Bienvenidos a Olé!</h2>
      <p className="text-xl mb-8 max-w-2xl mx-auto text-stone-200 relative z-10">
        Situé au bord du lac de Bienne, sur la plus belle plage de la région, 
        ce restaurant lounge propose une carte de mets inspirés des voyages du chef de cuisine, tout en utilisant des produits locaux. 
      </p>
      <div className="flex justify-center space-x-4 relative z-10">
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
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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
            <h2 className="text-4xl font-bold mb-6 text-green-900">A propos de Olé Restaurant</h2>
            <p className="text-stone-300 mb-4">
              Des plats généreux, gourmands, à l'accent méditerranéen présentés de manière fine et délicate. 
              Un endroit convivial, cosy et accueillant où nos clients pourront apprécier un cocktail sur notre superbe terrasse ou déguster une sélection de nos tapas dans notre intérieur entièrement rénové. Des vins de la région, une carte de cocktails, de shots, 
              et de coupes de glace gargantuesques.... Tout pour satisfaire toutes les envies.
              Le Restaurant O'Lé, un endroit où il fait bon se laisser vivre...
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
              <div className="flex justify-between">
                <span>Lundi - Mercredi</span>
                <span>10h00 - 22h00</span>
              </div>
              <div className="flex justify-between">
                <span>Mercredi - Samedi</span>
                <span>9h00 - 00h00</span>
              </div>
              <div className="flex justify-between">
                <span>Dimanche</span>
                <span>10h00 - 17h00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default AccueilPage;