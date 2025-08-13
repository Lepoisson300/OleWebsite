import { useState, useEffect } from "react";

type MenuSection = 'entree' | 'plat' | 'dessert';

type MenuItem = {
  name: string;
  description: string;
};

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;
const RANGE_MENUJOUR = import.meta.env.VITE_RANGE_MENUJOUR as string;

const MenusPage = () => {
  const [menuSections, setMenuSections] = useState<Record<MenuSection, MenuItem[]>>({
    entree: [],
    plat: [],
    dessert: [],
  });
  const [currentMenu] = useState<MenuSection>();

  useEffect(() => {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE_MENUJOUR}?key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.values) {
          // Skip the first row (headers)
          const items = data.values.slice(1).map((row: string[]) => ({
            section: row[0] as MenuSection,
            name: row[1],
            description: row[3],
          })) as Array<{ section: MenuSection; name: string; description: string }>;

          // Group by section
          const grouped: Record<MenuSection, MenuItem[]> = {
            entree: [],
            plat: [],
            dessert: [],
          };
          items.forEach((item: { section: MenuSection; name: string; description: string }) => {
            if (grouped[item.section]) {
              grouped[item.section].push({
                name: item.name,
                description: item.description,
              });
            }
          });
          setMenuSections(grouped);
        }
      })
      .catch(console.error);
  }, []);

  const getSectionIcon = (section: MenuSection) => {
    switch (section) {
      case 'entree': return '🥗';
      case 'plat': return '🍽️';
      case 'dessert': return '🍰';
    }
  };

  const getSectionTitle = (section: MenuSection) => {
    switch (section) {
      case 'entree': return 'Entrées';
      case 'plat': return 'Plats';
      case 'dessert': return 'Desserts';
    }
  };

  return (
    <section className="py-16 bg-neutral-900 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-amber-500">
            Nos Menus
          </h2>
          <p className="text-stone-600 text-lg mb-2 max-w-2xl mx-auto leading-relaxed">
            Découvrez notre sélection de Menu du jour, préparés avec des ingrédients frais et de qualité pour 21.50 -
          </p>
        </div>

        {/* Menu Sections Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-6xl mx-auto">
          {(['entree', 'plat', 'dessert'] as MenuSection[]).map((section) => (
            <div 
              key={section} 
              className="group bg-white rounded-lg shadow-lg p-6 border-t-4 border-amber-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Section Header */}
              <div className="text-center mb-6">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {getSectionIcon(section)}
                </div>
                <h3 className="text-2xl font-bold text-amber-800 mb-2">
                  {getSectionTitle(section)}
                </h3>
              </div>

              {/* Menu Items */}
              <div className="space-y-4">
                {menuSections[section].length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-stone-400">Aucun plat</p>
                  </div>
                ) : (
                  menuSections[section].map((item, idx) => (
                    <div 
                      key={idx} 
                      className="border-b border-stone-100 pb-4 last:border-b-0 last:pb-0 hover:bg-stone-50 -mx-2 px-2 py-2 rounded transition-colors duration-200 text-center"
                    >
                      <h4 className="font-semibold text-stone-800 mb-2 text-base">
                        {item.name}
                      </h4>
                      {item.description && (
                        <p className="text-stone-600 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      )}
                      
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Current Menu Items Display (if needed) */}
        {currentMenu && (
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8 text-amber-500">
              Menu {getSectionTitle(currentMenu)}
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {menuSections[currentMenu].map((item, index) => (
                <div
                  key={index}
                  className="bg-white border-l-4 border-amber-800 p-6 shadow-lg rounded-r-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    <h3 className="text-xl font-bold text-stone-800 mb-3">
                      {item.name}
                    </h3>
                    <p className="text-stone-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenusPage;