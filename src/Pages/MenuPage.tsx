import { useState, useEffect } from "react";

type MenuSection = 'tapas' | 'entree' | 'plat' | 'dessert' | 'boisson';

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
    boisson: [],
  });
  const [currentMenu, setCurrentMenu] = useState<MenuSection>("tapas");

  useEffect(() => {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.values) {
          // Skip the first row (headers)
          const items = data.values.slice(1).map((row: string[]) => ({
            section: row[0] as MenuSection,
            name: row[1],
            price: row[2],
            description: row[3],
          })) as Array<{ section: MenuSection; name: string; price: string; description: string }>;

          // Group by section
          const grouped: Record<MenuSection, MenuItem[]> = {
            tapas: [],
            entree: [],
            plat: [],
            dessert: [],
            boisson: [],
          };
          items.forEach((item: { section: MenuSection; name: string; price: string; description: string }) => {
            if (grouped[item.section]) {
              grouped[item.section].push({
                name: item.name,
                price: item.price,
                description: item.description,
              });
            }
          });
          setMenuSections(grouped);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section className="py-16 bg-neutral-900 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-amber-500">Nos Menus</h2>
        <p className="text-center text-stone-600 mb-12 max-w-2xl mx-auto">
          Découvrez notre sélection de plats authentiques espagnols, préparés avec des ingrédients frais et de qualité
        </p>

        {/* Menu Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 flex shadow-lg">
            {Object.keys(menuSections).map((section) => (
              <button
                key={section}
                onClick={() => setCurrentMenu(section as MenuSection)}
                className={`px-8 py-3 rounded-lg font-semibold transition-colors capitalize ${
                  currentMenu === section
                    ? "bg-amber-800 text-stone-100"
                    : "text-stone-600 hover:text-amber-800"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {menuSections[currentMenu].map((item, index) => (
            <div
              key={index}
              className="bg-white border-l-4 border-amber-800 p-6 shadow-lg rounded-r-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-stone-800">{item.name}</h3>
                <span className="text-amber-800 font-bold text-lg">{item.price}</span>
              </div>
              <p className="text-stone-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenusPage;
