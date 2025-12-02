import { useState, useEffect } from "react";

type MenuSection = 'entree' | 'plat' | 'dessert';
type WeekDay = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi';

type MenuItem = {
  name: string;
  description: string;
};

type DailyMenu = Record<MenuSection, MenuItem[]>;

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;
const RANGE_MENUJOUR = import.meta.env.VITE_RANGE_MENUJOUR as string;

const MenusPage = () => {
  const [weeklyMenus, setWeeklyMenus] = useState<Record<WeekDay, DailyMenu>>({
    lundi: { entree: [], plat: [], dessert: [] },
    mardi: { entree: [], plat: [], dessert: [] },
    mercredi: { entree: [], plat: [], dessert: [] },
    jeudi: { entree: [], plat: [], dessert: [] },
    vendredi: { entree: [], plat: [], dessert: [] },
  });
  
  const [currentDay, setCurrentDay] = useState<WeekDay>('lundi');
  const [loading, setLoading] = useState(true);

  const weekDays: WeekDay[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi'];

  useEffect(() => {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE_MENUJOUR}?key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.values) {
          // Skip the first row (headers)
          const items = data.values.slice(1).map((row: string[]) => ({
            day: row[0]?.toLowerCase() as WeekDay, // Assuming day is in the first column
            section: row[1] as MenuSection,        // Section in second column
            name: row[2],                          // Name in third column
            description: row[3],                   // Description in fourth column
          })).filter(item => weekDays.includes(item.day)); // Only include weekdays

          // Group by day and section
          const grouped: Record<WeekDay, DailyMenu> = {
            lundi: { entree: [], plat: [], dessert: [] },
            mardi: { entree: [], plat: [], dessert: [] },
            mercredi: { entree: [], plat: [], dessert: [] },
            jeudi: { entree: [], plat: [], dessert: [] },
            vendredi: { entree: [], plat: [], dessert: [] },
          };

          items.forEach((item) => {
            if (grouped[item.day] && grouped[item.day][item.section]) {
              grouped[item.day][item.section].push({
                name: item.name,
                description: item.description,
              });
            }
          });

          setWeeklyMenus(grouped);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Auto-select current day if it's a weekday
  useEffect(() => {
    const today = new Date();
    const dayIndex = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Map JavaScript day index to our WeekDay type (Monday = 1, Friday = 5)
    if (dayIndex >= 1 && dayIndex <= 5) {
      const currentWeekDay = weekDays[dayIndex - 1];
      setCurrentDay(currentWeekDay);
    }
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

  const getDayTitle = (day: WeekDay) => {
    switch (day) {
      case 'lundi': return 'Lundi';
      case 'mardi': return 'Mardi';
      case 'mercredi': return 'Mercredi';
      case 'jeudi': return 'Jeudi';
      case 'vendredi': return 'Vendredi';
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-neutral-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            <p className="text-white mt-4">Chargement des menus...</p>
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
            Nos Menus de la Semaine
          </h2>
          <p className="text-stone-400 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Découvrez notre sélection de Menu du jour, préparés avec des ingrédients frais et de qualité pour 21.50 .-
          </p>
        </div>

        {/* Day Navigation */}
<div className="flex mb-12">
  <div className="bg-stone-800 rounded-lg p-2 flex w-full sm:flex-nowrap shadow-lg max-w-full">
    {weekDays.map((day) => (
      <button
        key={day}
        onClick={() => setCurrentDay(day)}
        className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all mx-0.5 duration-300 text-sm sm:text-base min-w-0 text-center ${ // <-- AJOUT DE TEXT-CENTER
          currentDay === day
            ? 'bg-amber-600 text-white shadow-lg transform scale-105'
            : 'text-stone-300 hover:text-amber-400 hover:bg-stone-700'
        }`}
      >
        {getDayTitle(day)}
      </button>
    ))}
  </div>
</div>

        {/* Current Day Header */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-white mb-2">
            Menu du {getDayTitle(currentDay)}
          </h3>
          <div className="w-24 h-1 bg-amber-500 mx-auto rounded"></div>
        </div>

        {/* Menu Sections Grid for Selected Day */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {(['entree', 'plat', 'dessert'] as MenuSection[]).map((section) => (
            <div 
              key={section} 
              className="group bg-stone-800 rounded-lg shadow-lg p-6 border-t-4 border-amber-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-stone-700"
            >
              {/* Section Header */}
              <div className="text-center mb-6">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {getSectionIcon(section)}
                </div>
                <h4 className="text-2xl font-bold text-amber-500 mb-2">
                  {getSectionTitle(section)}
                </h4>
                <div className="w-12 h-0.5 bg-amber-500 mx-auto"></div>
              </div>

              {/* Menu Items */}
              <div className="space-y-4">
                {weeklyMenus[currentDay][section].length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-stone-400">Aucun plat disponible</p>
                  </div>
                ) : (
                  weeklyMenus[currentDay][section].map((item, idx) => (
                    <div 
                      key={idx} 
                      className="border-b border-stone-600 pb-4 last:border-b-0 last:pb-0 hover:bg-stone-700 -mx-2 px-2 py-3 rounded transition-all duration-200 text-center group/item"
                    >
                      <h5 className="font-semibold text-white mb-2 text-base group-hover/item:text-amber-400 transition-colors">
                        {item.name}
                      </h5>
                      {item.description && (
                        <p className="text-stone-300 text-sm leading-relaxed">
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

        
      </div>
    </section>
  );
};

export default MenusPage;