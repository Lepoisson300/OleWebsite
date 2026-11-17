import React, { useEffect, useRef, useState } from 'react';
import { Star, Utensils, Wine, Users, ChevronDown } from 'lucide-react';
import team from '/team.jpg';
import olebanniere from '/olebanniere.png';
// Enregistrez l'image "OLE RESTAURANT" dans public/ole-cover.jpg
import oleCover from '/ole-cover.png';
import oleBgTexture from '/ole-bg-texture.png';

interface AccueilPageProps {
  setCurrentPage: (page: string) => void;
  listesHoraires: { jours: string; ouverture: string; fermeture: string }[];
}

// Composant utilitaire pour faire apparaître chaque section en douceur au scroll
const RevealSection: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        } ${className}`}
    >
      {children}
    </div>
  );
};

const AccueilPage: React.FC<AccueilPageProps> = ({ setCurrentPage, listesHoraires }) => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Déclenche l'apparition smooth de l'image de couverture au montage
    const timer = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollDown = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-950 text-stone-100 overflow-x-hidden">
      {/* 1. ÉCRAN D'ACCUEIL PLEIN ÉCRAN (COVER) */}

      <section className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-between bg-black px-4 pt-6 pb-8 sm:justify-center sm:p-8">
        {/* 1. Image de fond texturée vert foncé et orange */}
        <img
          src={oleBgTexture}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none"
        />

        {/* 2. Image principale responsive (adaptée mobile & desktop) */}
        <div className="relative z-10 w-full flex-1 flex items-center justify-center min-h-0 my-auto">
          <img
            src={oleCover}
            alt="Ole Restaurant"
            className={`w-[88%] max-w-[340px] sm:max-w-[420px] md:max-w-[480px] max-h-[54dvh] sm:max-h-[72vh] aspect-[3/4] rounded-2xl shadow-2xl object-cover object-center transition-all duration-1000 ease-out transform ${heroLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
          />
        </div>

        {/* 3. Dégradé sombre en bas pour assurer la lisibilité */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-black/20 pointer-events-none" />

        {/* 4. Texte descriptif + Flèche empilés proprement sur mobile */}
        <div className="relative sm:absolute sm:bottom-8 z-20 w-full max-w-4xl mx-auto flex flex-col items-center gap-4 sm:gap-6 mt-4 sm:mt-0">
          <p className="text-base sm:text-2xl md:text-3xl font-['Dancing_Script'] text-white text-center font-bold leading-snug sm:leading-relaxed px-2 drop-shadow-md">
            Situé au bord du lac de Bienne, sur la plus belle plage de la région,
            ce restaurant lounge propose une carte de mets inspirés des voyages du chef de cuisine, tout en utilisant des produits locaux.
          </p>

          {/* Flèche d'invitation au scroll */}
          <button
            onClick={handleScrollDown}
            aria-label="Défiler vers le bas"
            className={`flex flex-col items-center gap-1.5 text-white/90 hover:text-amber-400 transition-all duration-1000 delay-500 cursor-pointer group ${heroLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] font-light">
              Découvrir
            </span>
            <div className="p-2 rounded-full border border-white/30 group-hover:border-amber-400/80 transition-colors animate-bounce">
              <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </button>
        </div>
      </section>

      {/* POINT D'ANCRAGE DES SECTIONS SUIVANTES */}
      <div ref={contentRef} className="pt-6">
        {/* Hero Section existante */}
        <RevealSection>
          <section className="max-w-7xl mx-auto my-12 px-4">
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link
              href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap"
              rel="stylesheet"
            />

            <div className="bg-[#0b0b0b] border border-stone-800/70 rounded-2xl p-6 sm:p-10 md:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

              {/* PARTIE GAUCHE : Texte & Bannière */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left justify-center space-y-5">
                <img
                  src={olebanniere}
                  alt="Bannière O'lé"
                  className="mx-auto w-48 sm:w-56 md:w-64 rounded-xl object-contain"
                />

                <div className="mx-auto space-y-2">
                  <h2 className="text-4xl sm:text-5xl font-bold text-white font-['Dancing_Script'] leading-tight">
                    ¡Bienvenidos a O'lé!
                  </h2>
                  <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-stone-400 font-light">
                    Restaurant &bull; Lounge
                  </p>
                </div>

                <div className="mx-auto w-19 h-[1px] bg-amber-600/70" />


              </div>

              {/* PARTIE DROITE : Image d'arrière-plan en triptyque (3 panneaux verticaux) */}
              <div className="lg:col-span-7 grid grid-cols-3 gap-3 sm:gap-4 h-[260px] sm:h-[340px] md:h-[380px]">
                {['0% center', '50% center', '100% center'].map((position, index) => (
                  <div
                    key={index}
                    role="img"
                    aria-label={`O'lé Restaurant vue ${index + 1}`}
                    className="w-full h-full bg-no-repeat rounded-sm overflow-hidden transition-transform duration-700 hover:scale-[1.02]"
                    style={{
                      backgroundImage: `url(${team})`,
                      backgroundSize: '300% 100%',
                      backgroundPosition: position,
                    }}
                  />
                ))}
              </div>

            </div>
          </section>
        </RevealSection>


        {/* Features */}
        <RevealSection>
          <section className="py-16 bg-gray-950">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-6 h-64">
                    <img
                      src="https://cdn.passeports.world/pictures/square/pictures/6363/802e5/6363802e55b08/pg23-60038-ole-1a-compressed.jpg?c=1667465262"
                      alt="Authentic Spanish Cuisine"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/20"></div>
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-stone-800 text-stone-200 rounded-full flex items-center justify-center">
                        <Utensils className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-amber-500">Cuisine Authentique</h3>
                  <p className="text-amber-200">
                    Recettes espagnoles traditionnelles transmises à travers les générations, élaborées avec passion et ingrédients de premier choix
                  </p>
                </div>

                <div className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-lg mb-6 h-64">
                    <img
                      src="https://le-de.cdn-website.com/63bbc12fb217440382108fff4b533128/dms3rep/multi/opt/OlRestaurantLounge-003+%281%29-432w.jpg"
                      alt="Premium Spanish Wines"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/20"></div>
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
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/20"></div>
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-stone-800 text-stone-200 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-amber-500">Ambiance Chaleureuse</h3>
                  <p className="text-amber-200">
                    Idéal pour des dîners intimes et des célébrations en groupe dans notre cadre chaleureux et accueillant inspiré de l'Espagne
                  </p>
                </div>
              </div>
            </div>
          </section>
        </RevealSection>

        {/* About Section */}
        <RevealSection>
          <section className="py-16 bg-stone-900">
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-6 text-amber-50 font-['Dancing_Script']">
                    A propos de O'lé Restaurant
                  </h2>
                  <p className="text-stone-300 mb-4">
                    Des plats généreux, gourmands, à l'accent méditerranéen présentés de manière fine et délicate.
                    Un endroit convivial, cosy et accueillant où nos clients pourront apprécier un cocktail sur notre superbe terrasse ou déguster une sélection de nos tapas dans notre intérieur entièrement rénové. Des vins de la région, une carte de cocktails, de shots,
                    et de coupes de glace gargantuesques.... Tout pour satisfaire toutes les envies.
                    Le Restaurant O'lé, un endroit où il fait bon se laisser vivre...
                  </p>

                  <div className="flex items-center space-x-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-stone-400 ml-2">4.5/5 de 500+ commentaires</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-800 to-amber-600 rounded-lg p-8 text-white shadow-lg">
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
        </RevealSection>
      </div>
    </div>
  );
};

export default AccueilPage;