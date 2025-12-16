import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

type NewsItem = {
  name: string;
  url: string;
  description: string;
  date: string;
};

const ActualitesPage = () => {
  const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID as string;
  const API_KEY = import.meta.env.VITE_API_KEY as string;
  const RANGE = import.meta.env.VITE_RANGE_ACTUALITES as string;

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.values) {
          // Skip header row
          const items = data.values.slice(1).map((row: string[]) => ({
            name: row[0]?.trim(),
            url: row[1]?.trim(),
            description: row[2]?.trim(),
            date: row[3]?.trim(),
          }));
          setNewsItems(items);
        }
      })
      .catch(console.error);
  }, []);

  return (
    <section className="py-16 bg-neutral-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-amber-500">Actualités</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Restez informé de toutes les nouveautés d'Olé Restaurant : nouveaux plats, événements spéciaux, et actualités
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {newsItems.map((item, index) => (
            <article
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.url}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-amber-800 text-white px-3 py-1 rounded-lg text-sm">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  {item.date}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-stone-800">{item.name}</h3>
                <p className="text-stone-600 leading-relaxed">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActualitesPage;
