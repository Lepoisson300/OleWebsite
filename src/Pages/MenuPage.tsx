import { useState, useEffect } from "react";

type MenuSection = 'tapas' | 'entree' | 'plat' | 'dessert' | 'enfant' | 'boisson';

type MenuItem = {
  name: string;
  price: string;
  description: string;
};

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;
const RANGE = import.meta.env.VITE_RANGE_MENU as string;

const MenusPage = () => {
  const [menuSections, setMenuSections] = useState<Record<MenuSection, MenuItem[]>>({
    tapas: [],
    entree: [],
    plat: [],
    dessert: [],
    enfant: [],
    boisson: [],
  });
  const [currentMenu, setCurrentMenu] = useState<MenuSection>("tapas");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getSectionTitle = (section: MenuSection) => {
    switch (section) {
      case 'tapas': return 'Tapas';
      case 'entree': return 'Entrées';
      case 'plat': return 'Plats';
      case 'dessert': return 'Desserts';
      case 'enfant': return 'Menu Enfant';
      case 'boisson': return 'Boissons';
      default: return section;
    }
  };

  const getSectionIcon = (section: MenuSection) => {
    switch (section) {
      case 'tapas': return;
      case 'entree': return ;
      case 'plat': return;
      case 'dessert': return;
      case 'enfant': return;
      case 'boisson': return;
      default: return;
    }
  };

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching from:', `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`);
        
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received data:', data);

        if (data.error) {
          throw new Error(data.error.message || 'Google Sheets API error');
        }

        if (data.values && data.values.length > 1) {
          // Skip the first row (headers) and filter out empty rows
          const items = data.values
            .slice(1)
            .filter((row: string[]) => row && row.length >= 2 && row[0] && row[1]) // Only require section and name
            .map((row: string[]) => ({
              section: (row[0]?.toLowerCase().trim()) as MenuSection,
              name: row[1]?.trim() || '',
              price: row[2]?.trim() || '', // Allow empty price
              description: row[3]?.trim() || '', // Allow empty description
            }))
            .filter(item => 
              ['tapas', 'entree', 'plat', 'dessert', 'enfant', 'boisson'].includes(item.section) && item.name
            );

          console.log('Processed items:', items);

          // Group by section
          const grouped: Record<MenuSection, MenuItem[]> = {
            tapas: [],
            entree: [],
            plat: [],
            dessert: [],
            enfant: [],
            boisson: [],
          };

          items.forEach((item) => {
            if (grouped[item.section]) {
              grouped[item.section].push({
                name: item.name,
                price: item.price,
                description: item.description,
              });
            }
          });

          console.log('Grouped sections:', grouped);
          setMenuSections(grouped);
        } else {
          console.warn('No data found or insufficient data');
          setError('Aucune donnée trouvée dans la feuille de calcul');
        }
      } catch (err) {
        console.error('Error fetching menu data:', err);
        setError(err instanceof Error ? err.message : 'Erreur lors du chargement du menu');
      } finally {
        setLoading(false);
      }
    };

    if (SHEET_ID && API_KEY && RANGE) {
      fetchMenuData();
    } else {
      setError('Configuration manquante: vérifiez vos variables d\'environnement');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-neutral-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            <p className="text-white mt-4 text-lg">Chargement du menu...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-neutral-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-red-500 text-xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-white mb-4">Erreur de chargement</h2>
            <p className="text-red-400 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-neutral-900 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4 text-amber-500 font-['Dancing_Script']">
            Nos Menus
          </h2>
          <p className="text-stone-400 text-lg mb-2 max-w-2xl mx-auto leading-relaxed">
            Découvrez notre sélection de plats authentiques espagnols, préparés avec des ingrédients frais et de qualité
          </p>
        </div>

        {/* Menu Navigation */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
            <div className="bg-stone-800 rounded-lg p-2 flex flex-wrap gap-1 shadow-lg w-full sm:w-auto justify-center">
            {Object.keys(menuSections).map((section) => {
              const sectionKey = section as MenuSection;
              const itemCount = menuSections[sectionKey].length;
              
              return (
                <button
                  key={section}
                  onClick={() => setCurrentMenu(sectionKey)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base relative ${
                    currentMenu === section
                      ? "bg-amber-600 text-white shadow-lg transform scale-105"
                      : "text-stone-300 hover:text-amber-400 hover:bg-stone-700"
                  }`}
                >
                  <span className="mr-2">{getSectionIcon(sectionKey)}</span>
                  {getSectionTitle(sectionKey)}
                  
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Section Header */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-white mb-2">
            {getSectionIcon(currentMenu)} {getSectionTitle(currentMenu)}
          </h3>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded"></div>
        </div>

        {/* Menu Items */}
        <div className="max-w-6xl mx-auto">
          {menuSections[currentMenu].length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-stone-400 mb-2">
                Aucun plat disponible
              </h3>
              <p className="text-stone-500">
                Cette section du menu sera bientôt disponible
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {menuSections[currentMenu].map((item, index) => (
                <div
                  key={index}
                  className="bg-stone-800 border-l-4 border-amber-600 p-6 shadow-lg rounded-r-lg hover:shadow-xl hover:bg-stone-700 transition-all duration-300 group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors flex-1 pr-4">
                      {item.name}
                    </h4>
                    {item.price && (
                      <span className="text-white font-bold text-lg bg-amber-500 bg-opacity-20 px-3 py-1 rounded whitespace-nowrap">
                        {item.price}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-stone-300 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                  {!item.description && (
                    <p className="text-stone-500 italic text-sm">
                      Description non disponible
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        
      </div>
    </section>
  );
};

export default MenusPage;